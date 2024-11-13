import connection from '../config/config';
import md5 from 'md5';
// require('dotenv').config();
// let CB_LINK = process.env.URL_CALLBACK;
// let userBANK = process.env.USER_AUTOBANK;
// let request = require('request');

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function formateT(params) {
    let result = params < 10 ? '0' + params : params;
    return result;
}

function timerJoin(params = '') {
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());
    return years + '-' + months + '-' + days;
}

function timerJoinPreDay(params = '') {
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate() - 1);
    return years + '-' + months + '-' + days;
}

function timerJoin2(params = '') {
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());

    let hours = formateT(date.getHours());
    let minutes = formateT(date.getMinutes());
    let seconds = formateT(date.getSeconds());
    return years + '-' + months + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
}

function randomStr(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const findOne = async ({ username, phone }) => {
    // console.log(phone);
    const [user] = await connection.execute('SELECT `id` FROM users WHERE username = ? OR phone = ?', [
        username,
        phone,
    ]);
    return user;
};

const findInvite = async (invite) => {
    const [user] = await connection.execute('SELECT `id` FROM users WHERE id_user = ?', [invite]);
    return user;
};

const checkAcount = async ({ username, password }) => {
    let [user] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [
        username,
        md5(password),
    ]);

    let [user2] = await connection.execute('SELECT * FROM users WHERE phone = ? AND password = ?', [
        username,
        md5(password),
    ]);

    let token = md5(username + password + Date.now());
    if (user.length > 0) {
        await connection.execute('UPDATE users SET token = ? WHERE username = ?', [token, username]);
        return { token, user };
    }
    if (user2.length > 0) {
        await connection.execute('UPDATE users SET token = ? WHERE phone = ?', [token, username]);
        return { token, user: user2 };
    }
};

const findOneToken = async (token) => {
    const [user] = await connection.execute(
        'SELECT u.*, l.name_level, l.price, l.roses, l.amount FROM users AS u LEFT JOIN level AS l ON u.roses_user = l.id_level WHERE token = ?',
        [token],
    );
    return user;
};

const list_mission = async (token) => {
    const [user] = await connection.execute('SELECT * FROM users WHERE token = ?', [token]);
    let { username, money, roses_user, level_nhandon } = user[0];
    let today = timerJoin();
    let [amount] = await connection.execute(
        'SELECT count(mission_done.id) as amount FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = 2',
        [username],
    ); // tổng Số nhiệm vụ
    let amountToday;
    if (level_nhandon) {
        [amountToday] = await connection.execute(
            'SELECT create_at, COUNT(*) AS amountToday FROM mission_done where username = ?  AND create_at = ? AND status = 2 GROUP BY create_at ORDER BY create_at DESC',
            [username, today],
        );
    } else {
        [amountToday] = await connection.execute(
            'SELECT COUNT(*) AS amountToday FROM mission_done WHERE username = ? AND create_at = ? AND status = 2',
            [username, today],
        ); // nhiệm vụ hôm nay
    }

    let [result] = await connection.execute(
        'SELECT SUM(mission.receive) as result FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = ?',
        [username, 2],
    ); // Tổng tiền nhiệm vụ

    let [resultToday] = await connection.execute(
        'SELECT SUM(mission.receive) as resultToday FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = ? AND mission_done.create_at = ?',
        [username, 2, today],
    ); // tổng tiền nv hôm nay

    let [pending] = await connection.execute(
        'SELECT SUM(mission.receive) as pending FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = ?',
        [username, 0],
    ); // Số dư bị đóng băng
    let [pending2] = await connection.execute(
        'SELECT SUM(mission.price) as pending2 FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status != 2',
        [username],
    ); // Số dư bị đóng băng
    let sumpending = parseInt(pending[0].pending) + parseInt(pending2[0].pending2);
    return {
        amount: amount[0].amount || 0,
        amountToday: amountToday[0]?.amountToday || 0,
        result: result[0].result || 0,
        resultToday: resultToday[0].resultToday || 0,
        pending: sumpending || 0,
    };
};

const save = async ({ username, password, invite, ip, withdrawPw, name, phone }) => {
    let randomNumber;
    for (let i = 0; i <= 999999; i++) {
        randomNumber = random(0, 999999);
        const [idUser] = await connection.execute('SELECT * FROM users WHERE id_user = ?', [randomNumber]);
        if (idUser.length === 0) break;
    }
    if (invite != 666666) {
        await connection.execute(
            'INSERT INTO users SET id_user = ?, username = ?, phone = ?, password = ?, password_v2 = ? , ip = ?, invite = ?, create_at = ?, time = ?',
            [randomNumber, username, phone, md5(password), md5(withdrawPw), ip, invite, Date.now(), timerJoin()],
        );
    } else {
        await connection.execute(
            'INSERT INTO users SET id_user = ?, username = ?, phone = ?, password = ?, password_v2 = ? , ip = ?, invite = ?, create_at = ?, time = ?, type = ?',
            [
                randomNumber,
                username,
                phone,
                md5(password),
                md5(withdrawPw),
                ip,
                invite,
                Date.now(),
                timerJoin(),
                'Người giả',
            ],
        );
    }
    let token = md5(username + password + Date.now());
    await connection.execute('UPDATE users SET token = ? WHERE username = ?', [token, username]);

    await connection.execute('INSERT INTO users_bank SET username = ?, name_u_bank = ?, phone = ?, time = ?', [
        username,
        name,
        username,
        Date.now(),
    ]);
    return { token };
};

var reqAuto = async (orderid, type, amount) => {
    let sign = md5();
    let formData = {
        userid: userBANK,
        orderid: orderid,
        type: type,
        amount: amount,
        notifyurl: CB_LINK,
        sign: sign,
    };
    request.post({ url: 'https://api.zf77777.org/api/create', formData: formData }, function (err, httpResponse, body) {
        if (err) {
            return false;
        }
        return body;
    });
};

const addRecharge = async ({ money, select, id_txn }, token) => {
    const [user] = await findOneToken(token);
    let username = user.username;
    // let id_txn = randomStr(16);
    let timeEnd = +new Date() + 1000 * (60 * 10 + 0) + 500; // +new Date() + 1000 * (60 * 10 phuts + 0) + 500;
    let now = Date.now();

    let create_at = timerJoin();

    let [recharge] = await connection.execute('SELECT * FROM recharge WHERE username = ? AND status = 0', [username]);
    //bao tri momo
    // console.log('select type recharge: '+select);
    if (select == 'momo') {
        return { type: 3, id: recharge[0].id_txn };
    }

    if (recharge.length <= 0) {
        await connection.execute(
            'INSERT INTO recharge SET username = ?, id_txn = ?, amount = ?, type = ?,status = ?, time = ?, create_at = ?',
            [username, id_txn, money, select, 0, timeEnd, create_at],
        );
        return { type: 1, id: id_txn };
    }
    // }else{
    //     return { type: 0, id: recharge[0].id_txn };
    // }
    if (recharge.length > 0 && Number(recharge[0].time) - now <= 0) {
        await connection.execute('UPDATE recharge SET status = 2 WHERE username = ? AND status = 0', [username]);
        await connection.execute(
            'INSERT INTO recharge SET username = ?, id_txn = ?, amount = ?, type = ?,status = ?, time = ?, create_at = ?',
            [username, id_txn, money, select, 0, timeEnd, create_at],
        );
        return { type: 1, id: id_txn };
    } else {
        return { type: 0, id: recharge[0].id_txn };
    }
};

const getRecharge = async (token, id) => {
    const [user] = await findOneToken(token);
    let username = user.username;
    let [recharge] = await connection.execute(
        'SELECT * FROM recharge WHERE username = ? AND status = 0 AND id_txn = ?',
        [username, id],
    );
    let [settings] = await connection.execute(
        'SELECT `stk_bank`, `name_bank`, `name_u_bank`, `stk_momo`, `name_momo`, `name_u_momo` FROM settings',
    );
    return { recharge, settings };
};

const changePassword = async ({ passwordOld, newPassword }, token) => {
    const [user] = await findOneToken(token);
    let { username, password } = user;
    if (md5(passwordOld) != password) return { type: 2 };
    await connection.execute('UPDATE users SET password = ? WHERE username = ?', [md5(newPassword), username]);
    return { type: 1 };
};

const changePasswordTransaction = async ({ passwordOld, newPassword }, token) => {
    const [user] = await findOneToken(token);
    let { username, password } = user;
    if (md5(passwordOld) != password) return { type: 2 };
    await connection.execute('UPDATE users SET password_v2 = ? WHERE username = ?', [md5(newPassword), username]);
    return { type: 1 };
};

const addBanking = async ({ nameuser, stk, nameBank, sdt }, token) => {
    try {
        const [user] = await findOneToken(token);
        let username = user.username;
        let [users_bank] = await connection.execute('SELECT * FROM users_bank WHERE username = ?', [username]);
        if (users_bank.length > 0) {
            await connection.execute(
                'UPDATE users_bank SET name_bank = ?, name_u_bank = ?, stk_bank = ?, phone = ?, time = ? WHERE username = ?',
                [nameBank, nameuser, stk, sdt, Date.now(), username],
            );
            return { type: 2 };
        } else {
            await connection.execute(
                'INSERT INTO users_bank SET username = ?, name_bank = ?, name_u_bank = ?, stk_bank = ?, phone = ?, time = ?',
                [username, nameBank, nameuser, stk, sdt, Date.now()],
            );
            return { type: 1 };
        }
    } catch (err) {
        console.log(err);
    }
};

const checkBanking = async (token) => {
    const [user] = await findOneToken(token);
    let username = user.username;
    let [recharge] = await connection.execute(
        `SELECT users.money,users.money_2, users.dongbangtk, users_bank.* FROM users INNER JOIN users_bank ON users.username = users_bank.username WHERE users.username = ? `,
        [username],
    );
    if (recharge[0].stk_bank) {
        let stk_bank = recharge[0].stk_bank;
        stk_bank = `*******${stk_bank?.slice(-3)}`;
        recharge[0].stk_bank = stk_bank;
    }
    let [pending] = await connection.execute(
        'SELECT SUM(mission.receive) as pending FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = ?',
        [username, 0],
    ); // Số dư bị đóng băng
    return { recharge, pending: pending[0].pending || '0' };
};

const withdraw = async ({ money, password }, token) => {
    const [user] = await findOneToken(token);

    money = Number(money);
    let username = user.username;
    let invite = user.invite;
    let money_user = user.money; // SỐ tiền của user
    let password_user = user.password_v2; // SỐ tiền của user
    const level = user.roses_user;

    if (level == 'vip1' && (money < 100_000 || money > 30_000_000)) {
        return {
            type: 100,
            msg: `Giới hạn rút tiền vip 1 từ: ${Number(100000)?.toLocaleString()} đến ${Number(
                30000000,
            )?.toLocaleString()} `,
        };
    }
    if (level == 'vip2' && (money < 30_000_000 || money < 200_000_000)) {
        return {
            type: 100,
            msg: `Giới hạn rút tiền vip 1 từ: ${Number(30000000)?.toLocaleString()} đến ${Number(
                200000000,
            )?.toLocaleString()} `,
        };
    }
    // let tongsodu = Number(money_user) - Number(user.dongbangtk);
    let today = timerJoin();

    const [[withdrawPerDay]] = await connection.execute(
        'SELECT l.* FROM level AS l LEFT JOIN users AS u ON l.id_level = u.roses_user WHERE u.username = ?',
        [user.username],
    );
    const [[withdrawInfo]] = await connection.execute(
        'SELECT COUNT(*) AS total FROM withdraw WHERE username = ? AND create_at = ?',
        [user.username, today],
    );

    if (withdrawPerDay.withdraw_per_day <= withdrawInfo.total) return { type: 6 }; //Giới hạn số lượt rút trong ngày

    // check don
    // const [[totalMission]] = await connection.execute(
    //     'SELECT COUNT(*) FROM mission_done WHERE username = ? AND create_at = ?',
    //     [username, today],
    // );

    // if (totalMission['COUNT(*)'] < user.amount) {
    //     return { type: 100, msg: 'Chưa hoàn thành đơn hàng' };
    // }
    //check dong bang

    let [settings] = await connection.execute('SELECT * FROM settings');
    let [myBank] = await connection.execute('SELECT * FROM users_bank WHERE username = ?', [username]);
    if (myBank.length <= 0) return { type: 'error' }; // Chưa liên kết ngân hàng

    let fee = settings[0].fee; //Phí rút tiền
    let min_withdraw = settings[0].min_withdraw; // Min rút
    let { name_bank, stk_bank, name_u_bank } = myBank[0];

    let total = Number(money) + fee;
    if (password_user != md5(password)) return { type: 2 }; // Sai mật khẩu rút tiền
    if (Number(total) < min_withdraw) return { type: 4, min: min_withdraw }; // Min rút tối thiểu là
    if (Number(money_user) - Number(total) < 0) return { type: 3 }; // SỐ dư không đủ
    // if (tongsodu < money) {
    //     return { type: 5, msg: 'Tài khoản của bạn đang bị đóng băng ' + user.dongbangtk + ' đ' };
    // }

    let id_txn = randomStr(16);
    let create_at = timerJoin();

    await connection.execute(
        'INSERT INTO withdraw SET id_txn = ?, username = ?, name_bank = ?, name_u_bank = ?, stk = ?, amount = ?, fee = ?, status = ?, time = ?, create_at = ?',
        [id_txn, username, name_bank, name_u_bank, stk_bank, money, fee, 0, Date.now(), create_at],
    );

    await connection.execute(
        'INSERT INTO financial_details SET username = ?, type = ?, amount = ?, status = ?, time = ?',
        [username, 'withdraw', total, 'out', Date.now()],
    );

    await connection.execute('UPDATE users SET money = money - ? WHERE username = ?', [total, username]);
    return { type: 1, money: money_user - total, username, invite };
};

const financial = async (token) => {
    const [user] = await findOneToken(token);
    let username = user.username;
    let [financial] = await connection.execute(
        'SELECT * FROM financial_details WHERE username = ? ORDER BY id DESC LIMIT 100',
        [username],
    );
    return financial;
};
const historyrut = async (token) => {
    const [user] = await findOneToken(token);
    let username = user.username;
    let [financial] = await connection.execute('SELECT * FROM withdraw WHERE username = ? ORDER BY id DESC LIMIT 100', [
        username,
    ]);
    return financial;
};

const upgrade = async ({ level }, token) => {
    const [user] = await findOneToken(token);
    let username = user.username;
    let money = user.money;
    let [levels] = await connection.execute('SELECT * FROM level WHERE id_level = ?', [level]);
    if (levels.length <= 0) return { type: 'error' };

    let { price } = levels[0];
    if (money - price < 0) return { type: 2 };

    await connection.execute(
        'INSERT INTO financial_details SET username = ?, type = ?, amount = ?, status = ?, time = ?',
        [username, 'upgrade', price, 'out', Date.now()],
    );

    await connection.execute('UPDATE users SET money = money - ?, roses_user = ? WHERE username = ?', [
        price,
        level,
        username,
    ]);
    return { type: 1 };
};

const listBanner = async () => {
    const [banner] = await connection.execute('SELECT * FROM banner WHERE status = 1 ORDER BY id DESC');
    return banner;
};

const listSupport = async () => {
    const [support] = await connection.execute('SELECT `zalo`, `telegram` FROM settings');
    let { telegram, zalo } = support[0];
    return { telegram, zalo };
};

const levelList = async (token) => {
    const [user] = await findOneToken(token);
    const [levelList] = await connection.execute('SELECT * FROM level ORDER BY price ASC');
    return { levelList, user };
};
const getBankingByUser = async (token) => {
    const [user] = await findOneToken(token);
    let username = user.username;
    let [users_bank] = await connection.execute('SELECT * FROM users_bank WHERE username = ?', [username]);
    if (users_bank.length > 0) return users_bank;
    else return false;
};

const addAddress = async ({ address }, token) => {
    await connection.execute('UPDATE users SET address = ? WHERE token = ?', [address, token]);
    return { type: 1 };
};

const moneyEarn = async (token) => {
    const [user] = await findOneToken(token);
    const today = timerJoin();
    const preDay = timerJoinPreDay();
    let [moneyEarnToday] = await connection.execute(
        'SELECT SUM(m.receive) FROM mission_done AS md LEFT JOIN mission AS m ON md.id_mission = m.id_mission WHERE username = ? AND create_at = ? AND status = 2',
        [user.username, today],
    );

    moneyEarnToday = Number(moneyEarnToday[0]['SUM(m.receive)']);

    let [moneyEarnPreDay] = await connection.execute(
        'SELECT SUM(m.receive) FROM mission_done AS md LEFT JOIN mission AS m ON md.id_mission = m.id_mission WHERE username = ? AND create_at = ?',
        [user.username, preDay],
    );

    moneyEarnPreDay = Number(moneyEarnPreDay[0]['SUM(m.receive)']);
    return { moneyEarnToday, moneyEarnPreDay };
};

const getListBank = async ({ username }) => {
    const [list] = await connection.execute('SELECT * FROM list_bank ORDER BY name ASC');
    return { status: true, list };
};

const getAdminBank = async () => {
    const [list] = await connection.execute('SELECT * FROM settings');
    return { status: true, list };
};

const findOneUserLuckyByToken = async (token) => {
    const [user] = await connection.execute(
        'SELECT username, may_man, money, da_quay_may_man FROM users WHERE token = ?',
        [token],
    );
    return user;
};

const updateLuckyByToken = async (token, moneyLucky) => {
    const [user] = await connection.execute('UPDATE users SET money = money + ?, da_quay_may_man = 1 WHERE token = ?', [
        moneyLucky,
        token,
    ]);
    return user;
};

const getHistoryRecharge = async (token) => {
    const [user] = await findOneToken(token);
    let username = user.username;
    let [recharge] = await connection.execute('SELECT * FROM recharge WHERE username = ? ORDER BY time DESC', [
        username,
    ]);
    await recharge.map((item) => {
        item.time = item.time - 1000 * 60 * 10;
        return item;
    });
    return { recharge };
};

const getHistoryWithdraw = async (token) => {
    const [user] = await findOneToken(token);
    let username = user.username;
    let [withdraw] = await connection.execute('SELECT * FROM withdraw WHERE username = ? ORDER BY time DESC', [
        username,
    ]);
    return { withdraw };
};
module.exports = {
    findOne,
    save,
    findOneToken,
    checkAcount,
    addRecharge,
    getRecharge,
    changePassword,
    changePasswordTransaction,
    addBanking,
    checkBanking,
    list_mission,
    withdraw,
    financial,
    historyrut,
    upgrade,
    listBanner,
    findInvite,
    listSupport,
    levelList,
    getBankingByUser,
    addAddress,
    moneyEarn,
    getListBank,
    getAdminBank,
    findOneUserLuckyByToken,
    updateLuckyByToken,
    getHistoryRecharge,
    getHistoryWithdraw,
};
