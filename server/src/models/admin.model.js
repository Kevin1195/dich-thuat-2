import e from 'express';
import md5 from 'md5';
import connection from '../config/config';

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
var getDateX = function (d) {
    let offset = '+7';
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 3600000 * offset);

    // return time as a string
    return nd.toLocaleString();
};

function randomStr(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

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

const Login = async ({ username, password }) => {
    if (!username || !password) {
        return { status: false, msg: 'Nhập đủ thông tin!' };
    }

    const [users] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ? AND level = 1', [
        username,
        md5(password),
    ]);
    if (users.length <= 0) return { type: 2 };
    if (users.length > 0) return { type: 1, auth: users[0].token };
};

const CheckAdmin = async (token) => {
    const [users] = await connection.execute('SELECT * FROM users WHERE token = ? AND level = 1', [token]);
    if (users.length <= 0) return { type: 2 };
    if (users.length > 0) return { type: 1 };
};
const listLevel = async () => {
    const [listMission] = await connection.execute('SELECT * FROM level ORDER BY price ASC');
    return listMission;
};

const listMission = async () => {
    const [listMission] = await connection.execute(
        'SELECT m.*, l.name_level FROM mission AS m LEFT JOIN level AS l ON m.level_mission = l.id_level ORDER BY id DESC',
    );
    const listNew = listMission.map((item) => {
        if (!item.name_level) {
            return { ...item, name_level: 'ĐẶC BIỆT' };
        } else {
            return item;
        }
    });
    return listNew;
};

const listRecharge = async () => {
    const [listMission] = await connection.execute('SELECT * FROM recharge WHERE status = 0 ORDER BY id DESC');
    let list = listMission.map((item) => {
        let dt = new Date(parseInt(item.time));

        item.create_at = getDateX(dt);
        return item;
    });
    let exp = Promise.all(list);
    return exp;
};

const listorder = async (sdt) => {
    if (sdt == 0) {
        var [listMission] = await connection.execute('SELECT * FROM mission_done ORDER BY id DESC');
    } else {
        var [listMission] = await connection.execute('SELECT * FROM mission_done WHERE username = ? ORDER BY id DESC', [
            sdt,
        ]);
    }

    let data = listMission.map(async (item) => {
        let id_mission = item.id_mission;
        var [list_miss] = await connection.execute('SELECT * FROM mission WHERE id_mission = ? ORDER BY id DESC', [
            id_mission,
        ]);
        if (list_miss.length > 0) {
            let sotien = list_miss[0].price + list_miss[0].receive;
            if (item.status == 0) {
                item.trangthai = 'Chưa Duyệt';
            } else {
                item.trangthai = 'Đã duyệt';
            }
            item.id_mission = list_miss[0].name_mission + '-' + list_miss[0].level_mission;
            let date = new Date(parseInt(item.time));
            //item.create_at = item.create_at + ' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            item.create_at = getDateX(date);
            item.sotien = sotien;
            return item;
        }
    });
    let result = Promise.all(data);
    return result;
};
const listorderEdit = async ({ id, username, id_mission, type }) => {
    if (!username || !id || !type) {
        return { status: false, msg: 'Nhập đủ thông tin!' };
    }

    if (type == 'duyet') {
        //duyet don dong bang
        let [mission_done] = await connection.execute('SELECT * FROM mission_done WHERE status = 0 AND id = ?', [id]);
        let reponse = {};
        let mission = mission_done[0];
        if (mission_done.length == 0) {
            reponse.type = 3; // da duoc duyet
            reponse.msg = 'Đơn hàng đã được duyệt hoặc không tồn tại';
            return reponse;
        }
        try {
            let [checkmoney] = await connection.execute('SELECT receive, price FROM mission WHERE id_mission = ?', [
                mission.id_mission,
            ]);
            let { receive, price } = checkmoney[0];
            await connection.execute(
                'INSERT INTO financial_details SET username = ?, type = ?, amount = ?, id_msdone = ?, status = ?, time = ?',
                [username, 'roses', receive + price, mission.id, 'in', Date.now()],
            );
            await connection.execute('UPDATE users SET money = money + ? WHERE username = ?', [
                receive + price,
                username,
            ]);
            await connection.execute('UPDATE mission_done SET status = 1 WHERE id = ? ', [id]);
            reponse.type = 1; // da duoc duyet
            reponse.msg = 'Duyệt thành công';
            return reponse; //duyet thanh cong
        } catch (err) {
            console.log(err);
            reponse.type = 2;
            reponse.msg = 'Đã có lỗi sảy ra!';
            return 2; //co loi say ra
        }
    } else {
        //huy duyet , tru tien tai khoan
        let [mission_done] = await connection.execute('SELECT * FROM mission_done WHERE status = 1 AND id = ?', [id]);
        let [user] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

        let reponse = {};
        let mission = mission_done[0];
        if (mission_done.length == 0) {
            reponse.type = 3;
            reponse.msg = 'Đơn hàng chưa được duyệt trước đó';
            return reponse;
        }
        try {
            let [checkmoney] = await connection.execute('SELECT receive, price FROM mission WHERE id_mission = ?', [
                mission.id_mission,
            ]);
            let { receive, price } = checkmoney[0];
            if (user[0].money < receive + price) {
                reponse.type = 4;
                reponse.msg = 'Tài khoản của thành viên không còn tiền để trừ!';
            }
            await connection.execute('UPDATE users SET money = money - ? WHERE username = ?', [
                receive + price,
                username,
            ]);
            await connection.execute('UPDATE mission_done SET status = 0 WHERE id = ? ', [id]);
            await connection.execute('DELETE FROM financial_details WHERE id_msdone = ? ', [mission.id]);
            reponse.type = 1;
            reponse.msg = 'Duyệt thành công';
            return reponse;
        } catch (err) {
            console.log(err);
            reponse.type = 2;
            reponse.msg = 'Đã xảy ra lỗi';
        }
    }
};

const listRechargeAll = async () => {
    const [listMission] = await connection.execute('SELECT * FROM recharge ORDER BY id DESC');
    return listMission;
};

const listWithdrawAll = async () => {
    const [listMission] = await connection.execute(
        'SELECT w.*, u.invite FROM withdraw AS w LEFT JOIN users AS u ON w.username = u.username ORDER BY id DESC',
    );
    return listMission;
};

const listWithdraw = async () => {
    const [listMission] = await connection.execute(
        'SELECT w.*, u.invite FROM withdraw AS w LEFT JOIN users AS u ON w.username = u.username WHERE w.status = 0 ORDER BY w.id DESC',
    );
    return listMission;
};

// const listUsers = async () => {
//     const [listMission] = await connection.execute(
//         'SELECT u.*, l.name_level, ub.name_u_bank, ub.name_bank, ub.stk_bank FROM users AS u LEFT JOIN level AS l ON u.roses_user = l.id_level LEFT JOIN users_bank AS ub ON u.username = ub.username ORDER BY id DESC',
//     );

//     const today = timerJoin();
//     //var listUser = []
//     var listUser = listMission.map(async (item) => {
//         let { username, level_nhandon, don_vip_create_at, invite, last_login, money } = item;
//         let [[userInvite]] = await connection.execute(
//             'SELECT ub.name_u_bank FROM users_bank AS ub LEFT JOIN users AS u ON ub.username = u.username WHERE u.id_user = ?',
//             [invite],
//         );
//         let [listMissionVip] = await connection.execute('SELECT * FROM mission_vip WHERE username = ?', [username]);
//         let lastLogin = Date.now() - Number(last_login) < 5 * 60 * 1000 ? 1 : 2;
//         let info_don_vip;
//         if (listMissionVip.length !== 0) {
//             info_don_vip = JSON.parse(listMissionVip[0].info_don_vip);
//             info_don_vip = info_don_vip.map((item) => item.sttDonVip).join(', ');
//         }
//         let [[total_withdraw]] = await connection.execute(
//             'SELECT SUM(amount) AS amount FROM withdraw WHERE status = 1 AND username = ?',
//             [username],
//         );
//         let total;
//         if (level_nhandon && don_vip_create_at !== today) {
//             [total] = await connection.execute(
//                 'SELECT create_at, COUNT(*) AS total FROM mission_done where username = ? GROUP BY create_at ORDER BY create_at DESC',
//                 [username],
//             );
//         } else {
//             [total] = await connection.execute(
//                 'SELECT COUNT(*) AS total FROM mission_done WHERE username = ? AND create_at = ?',
//                 [username, today],
//             );
//         }

//         let [pending] = await connection.execute(
//             'SELECT SUM(mission.receive) as pending FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = ?',
//             [username, 0],
//         ); // Số dư bị đóng băng
//         let [pending2] = await connection.execute(
//             'SELECT SUM(mission.price) as pending2 FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = ?',
//             [username, 0],
//         ); // Số dư bị đóng băng
//         let sumpending = parseInt(pending[0].pending) + parseInt(pending2[0].pending2);
//         item.money = Number(money);
//         item.lastLogin = lastLogin;
//         item.pending = sumpending || 0;
//         item.missionDay = total[0]?.total || 0;
//         item.totalWithdraw = Number(total_withdraw.amount);
//         item.userInvite = userInvite?.name_u_bank || 'admin';
//         item.info_don_vip = info_don_vip || 0;
//         return item;
//     });

//     return Promise.all(listUser);
// };

const listUsers = async ({ page, search }) => {
    let itemPerPage = 5;
    let totalPage = 0;
    let listUser = [];
    let totalUser;
    if (search) {
        [listUser] = await connection.execute(
            'SELECT u.*, l.name_level, ub.name_u_bank, ub.name_bank, ub.stk_bank FROM users AS u LEFT JOIN level AS l ON u.roses_user = l.id_level LEFT JOIN users_bank AS ub ON u.username = ub.username WHERE u.username LIKE ? OR u.id_user LIKE ? OR u.invite LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?',
            [`%${search}%`, `%${search}%`, `%${search}%`, itemPerPage, itemPerPage * page],
        );
        [[{ totalUser }]] = await connection.execute(
            'SELECT COUNT(*) AS totalUser FROM users WHERE username LIKE ? OR id_user LIKE ? OR invite LIKE ?',
            [`%${search}%`, `%${search}%`, `%${search}%`],
        );
    } else {
        [listUser] = await connection.execute(
            'SELECT u.*, l.name_level, ub.name_u_bank, ub.name_bank, ub.stk_bank FROM users AS u LEFT JOIN level AS l ON u.roses_user = l.id_level LEFT JOIN users_bank AS ub ON u.username = ub.username ORDER BY id DESC LIMIT ? OFFSET ?',
            [itemPerPage, itemPerPage * page],
        );
        [[{ totalUser }]] = await connection.execute('SELECT COUNT(*) AS totalUser FROM users');
    }

    totalPage = Math.ceil(totalUser / itemPerPage);

    const today = timerJoin();
    //var listUser = []
    for (let item of listUser) {
        let { username, level_nhandon, don_vip_create_at, invite } = item;
        let total;
        if (level_nhandon && don_vip_create_at !== today) {
            [total] = await connection.execute(
                'SELECT create_at, COUNT(*) AS total FROM mission_done where username = ? GROUP BY create_at ORDER BY create_at DESC',
                [username],
            );
        } else {
            [total] = await connection.execute(
                'SELECT COUNT(*) AS total FROM mission_done WHERE username = ? AND create_at = ?',
                [username, today],
            );
        }

        let [pending] = await connection.execute(
            'SELECT SUM(mission.receive) as pending FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = ?',
            [username, 0],
        ); // Số dư bị đóng băng
        let [pending2] = await connection.execute(
            'SELECT SUM(mission.price) as pending2 FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = ?',
            [username, 0],
        ); // Số dư bị đóng băng
        let sumpending = parseInt(pending[0].pending) + parseInt(pending2[0].pending2);
        item.invite;
        item.pending = sumpending || 0;
        item.missionDay = total[0]?.total || 0;
    }

    return { status: true, data: listUser, totalPage };
};

const listSettings = async () => {
    const [listSettings] = await connection.execute('SELECT * FROM settings');
    return listSettings;
};

const listAnalytics = async () => {
    const [total_users] = await connection.execute('SELECT COUNT(id) as total FROM users');
    const [total_recharge] = await connection.execute('SELECT SUM(amount) as total FROM recharge WHERE status = 1');
    const [total_withdraw] = await connection.execute('SELECT SUM(amount) as total FROM withdraw WHERE status = 1');
    let today = timerJoin();
    const [today_withdraw] = await connection.execute(
        'SELECT SUM(amount) as total FROM withdraw WHERE status = 1 AND create_at = ?',
        [today],
    );
    const [today_recharge] = await connection.execute(
        'SELECT SUM(amount) as total FROM recharge WHERE status = 1 AND create_at = ?',
        [today],
    );
    const [today_users] = await connection.execute('SELECT COUNT(id) as total FROM users WHERE time = ?', [today]);

    let data = {
        total_users: total_users[0].total || 0,
        total_recharge: total_recharge[0].total || 0,
        total_withdraw: total_withdraw[0].total || 0,

        today_recharge: today_recharge[0].total || 0,
        today_withdraw: today_withdraw[0].total || 0,
        today_users: today_users[0].total || 0,
    };

    return data;
};

const editMission = async ({ id_mission, name_new, roses_new, price_new, vip_new, img_new, type, description }) => {
    if (type == 'edit') {
        if (!id_mission || !name_new || !roses_new || !price_new || !vip_new || !img_new || !type) {
            return { status: false, msg: 'Nhập đủ thông tin!' };
        }
        await connection.execute(
            'UPDATE mission SET  name_mission = ?, price = ?, receive = ?, level_mission = ?, image = ?, description = ? WHERE id_mission = ?',
            [name_new, price_new, roses_new, vip_new, img_new, description, id_mission],
        );

        return { type: 1 };
    } else {
        await connection.execute('DELETE FROM mission WHERE id_mission = ?', [id_mission]);
        return { type: 0 };
    }
};

const editRecharge = async ({ id_txn, type }) => {
    if (type == 'edit') {
        const [recharge] = await connection.execute('SELECT * FROM recharge WHERE id_txn = ?', [id_txn]);
        let { amount, username, status } = recharge[0];
        if (status == 0) {
            await connection.execute('UPDATE recharge SET status = 1 WHERE id_txn = ?', [id_txn]);
            await connection.execute('UPDATE users SET money = money + ? WHERE username = ?', [amount, username]);
            await connection.execute(
                'INSERT INTO financial_details SET username = ?, type = ?, amount = ?, status = ?, time = ?',
                [username, 'recharge', amount, 'in', Date.now()],
            );
            const [[totalRecharge]] = await connection.execute(
                'SELECT SUM(amount) FROM recharge WHERE username = ? AND status = 1',
                [username],
            );

            // const [level] = await connection.execute('SELECT * FROM level WHERE price <= ? ORDER BY price DESC', [
            //     totalRecharge['SUM(amount)'],
            // ]);
            // await connection.execute('UPDATE users SET roses_user = ? WHERE username = ?', [
            //     level[0].id_level,
            //     username,
            // ]);
            return { type: 1 };
        } else {
            return { type: 2 };
        }
    } else {
        await connection.execute('UPDATE recharge SET status = 2 WHERE id_txn = ?', [id_txn]);
        return { type: 0 };
    }
};

const editWithdraw = async ({ id_txn, type }) => {
    const [withdraw] = await connection.execute('SELECT * FROM withdraw WHERE id_txn = ?', [id_txn]);
    let { amount, fee, username, status } = withdraw[0];
    if (type == 'edit') {
        if (status == 0) {
            let ld = 'Thành Công';
            await connection.execute('UPDATE withdraw SET status = 1, comment = ? WHERE id_txn = ?', [ld, id_txn]);
            return { type: 1 };
        } else {
            return { type: 2 };
        }
    } else {
        await connection.execute('UPDATE withdraw SET status = 2 WHERE id_txn = ?', [id_txn]);
        await connection.execute('UPDATE users SET money = money + ? WHERE username = ?', [amount + fee, username]);
        return { type: 0 };
    }
};

const editUser = async ({
    username,
    money_new,
    password_new,
    vip_new,
    level_new,
    type,
    delete_bank,
    vip_NhanDonNew,
    passbank,
    dongbang,
    sttDonVip,
    mayman,
    thuemayman,
    daquaymayman,
    nameBank,
    nameubank,
    stkBank,
}) => {
    let today = timerJoin();
    if (type == 'edit') {
        if (!passbank && !password_new) {
            await connection.execute(
                'UPDATE users SET money = ?, roses_user = ?, level = ?, level_nhandon = ?, dongbangtk = ?, may_man = ?, thue_may_man = ?, da_quay_may_man = ? WHERE username = ?',
                [money_new, vip_new, level_new, vip_NhanDonNew, dongbang, mayman, thuemayman, daquaymayman, username],
            );
        } else if (!!password_new && !passbank) {
            await connection.execute(
                'UPDATE users SET money = ?, roses_user = ?, level = ?, level_nhandon = ?, password = ?, dongbangtk = ? WHERE username = ?',
                [money_new, vip_new, level_new, vip_NhanDonNew, md5(password_new), dongbang, username],
            );
        } else if (!password_new && !!passbank) {
            await connection.execute(
                'UPDATE users SET money = ?, roses_user = ?, level = ?, level_nhandon = ?, password_v2 = ?, dongbangtk = ? WHERE username = ?',
                [money_new, vip_new, level_new, vip_NhanDonNew, md5(passbank), dongbang, username],
            );
        } else {
            await connection.execute(
                'UPDATE users SET money = ?, password = ?, password_v2 = ?,  roses_user = ?, level = ?, level_nhandon = ?, dongbangtk = ? WHERE username = ?',
                [money_new, md5(password_new), md5(passbank), vip_new, level_new, vip_NhanDonNew, dongbang, username],
            );
        }

        if (delete_bank == '1') {
            await connection.execute(
                'UPDATE users_bank SET name_bank = NULL, name_u_bank = NULL, stk_bank = NULL, phone = NULL WHERE username = ?',
                [username],
            );
        } else {
            if (nameBank) {
                await connection.execute('UPDATE users_bank SET name_bank = ? WHERE username = ?', [
                    nameBank,
                    username,
                ]);
            }
            if (nameubank) {
                await connection.execute('UPDATE users_bank SET name_u_bank = ? WHERE username = ?', [
                    nameubank,
                    username,
                ]);
            }
            if (stkBank) {
                await connection.execute('UPDATE users_bank SET stk_bank = ? WHERE username = ?', [stkBank, username]);
            }
        }

        if (sttDonVip) {
            await connection.execute('UPDATE users SET stt_don_vip = ?, don_vip_create_at = ? WHERE username = ?', [
                sttDonVip,
                today,
                username,
            ]);
        } else {
            await connection.execute('UPDATE users SET stt_don_vip = NULL, don_vip_create_at = ? WHERE username = ?', [
                today,
                username,
            ]);
        }
        return { type: 1 };
    }
    if (type == 'banned') {
        await connection.execute('UPDATE users SET status = ? WHERE username = ?', ['2', username]);
        return { type: 2 };
    }
    if (type == 'open') {
        await connection.execute('UPDATE users SET status = ? WHERE username = ?', ['1', username]);
        return { type: 3 };
    }
};

const duyettien = async ({ username }) => {
    let [mission_done] = await connection.execute('SELECT * FROM mission_done WHERE status = 0 AND username = ?', [
        username,
    ]);
    let type;
    if (mission_done.length > 0) {
        Promise.all(
            mission_done.map(async (info_mission) => {
                let [mission] = await connection.execute('SELECT receive, price FROM mission WHERE id_mission = ?', [
                    info_mission.id_mission,
                ]);

                let { receive, price } = mission[0];
                await connection.execute(
                    'INSERT INTO financial_details SET username = ?, type = ?, amount = ?, status = ?, time = ?',
                    [username, 'roses', receive + price, 'in', Date.now()],
                );
                await connection.execute('UPDATE users SET money = money + ? WHERE username = ?', [
                    receive + price,
                    username,
                ]);
                await connection.execute('UPDATE mission_done SET status = 1 WHERE id_mission = ? AND username = ?', [
                    info_mission.id_mission,
                    username,
                ]);
            }),
        );
        type = 1;
    } else {
        type = 2;
    }
    return { type };
};

const editBanner = async ({ status, id }) => {
    await connection.execute('UPDATE banner SET status = ? WHERE id = ?', [status, id]);
    return { type: 1 };
};

const editSettings = async ({
    stk_bank,
    name_bank,
    name_u_bank,
    stk_momo,
    name_momo,
    name_u_momo,
    fee,
    min_withdraw,
    zalo,
    telegram,
    linkImageQR,
}) => {
    await connection.execute(
        'UPDATE settings SET stk_bank = ?, name_bank = ?, name_u_bank = ?, stk_momo = ?, name_momo = ?, name_u_momo = ?, fee = ?, min_withdraw = ?, zalo = ?, telegram = ?, link_image_qr = ?',
        [
            stk_bank,
            name_bank,
            name_u_bank,
            stk_momo,
            name_momo,
            name_u_momo,
            fee,
            min_withdraw,
            zalo,
            telegram,
            linkImageQR,
        ],
    );
    return { type: 1 };
};

const addProduct = async ({ name, price, rosess, vip, imgsss, description = '' }, token) => {
    if (!name || !price || !rosess || !vip || !imgsss) {
        return { status: false, msg: 'Nhập đủ thông tin!' };
    }

    let id_mission = randomStr(16);
    await connection.execute(
        'INSERT INTO mission SET id_mission = ?, name_mission = ?, price = ?, receive = ?, level_mission = ?, image = ?, description = ?, time = ?',
        [id_mission, name, price, rosess, vip, imgsss, description, Date.now()],
    );
    return { type: 1 };
};

const addBanner = async ({ link }, token) => {
    if (!!link) {
        await connection.execute('INSERT INTO banner SET link = ?, time = ?', [link, Date.now()]);
        return { type: 1 };
    } else {
        return { type: 0 };
    }
};

const editLevel = async (
    { id_level, name_level_new, price_new, roses_new, amount_new, withdraw_per_day_new, type, id_level_new },
    token,
) => {
    if (
        !id_level ||
        !name_level_new ||
        !price_new ||
        !roses_new ||
        !amount_new ||
        !withdraw_per_day_new ||
        !type ||
        !id_level_new
    ) {
        return { status: false, msg: 'Nhập đủ thông tin!' };
    }

    if (type === 'edit') {
        await connection.execute(
            'UPDATE level SET name_level = ?, price = ?, roses = ?, amount = ?, withdraw_per_day = ? WHERE id_level = ?',
            [name_level_new, price_new, roses_new, amount_new, withdraw_per_day_new, id_level],
        );
    }
    if (type === 'add') {
        await connection.execute(
            'INSERT INTO level SET name_level = ?, price = ?, roses = ?, amount = ?, withdraw_per_day = ?, id_level = ?, time = ?',
            [name_level_new, price_new, roses_new, amount_new, withdraw_per_day_new, id_level_new, Date.now()],
        );
    }
    if (type === 'delete') {
        await connection.execute('DELETE FROM level WHERE id_level = ?', [id_level]);
    }
    return { type: 1 };
};

const editListVip = async ({ username, listVip }) => {
    if (!username || !listVip) {
        return { status: false, msg: 'Nhập đủ thông tin!' };
    }

    let today = timerJoin();
    let infoDonVip = listVip.filter((item) => item.sttDonVip !== '');
    infoDonVip = infoDonVip.filter((item) => item.minPrice !== '');
    infoDonVip = infoDonVip.filter((item) => item.maxPrice !== '');
    infoDonVip = infoDonVip.sort((item, item2) => item.sttDonVip - item2.sttDonVip);
    infoDonVip = JSON.stringify(infoDonVip);
    let [infoListVip] = await connection.execute('SELECT * FROM mission_vip WHERE username = ?', [username]);
    if (infoListVip.length === 0) {
        await connection.execute('INSERT INTO mission_vip SET username = ?, info_don_vip = ?, create_at = ?', [
            username,
            infoDonVip,
            today,
        ]);
        return { status: true, msg: 'Cập nhật thành công' };
    } else {
        await connection.execute('UPDATE mission_vip SET info_don_vip = ?, create_at = ? WHERE username = ?', [
            infoDonVip,
            today,
            username,
        ]);
        return { status: true, msg: 'Cập nhật thành công' };
    }
};

const getListVip = async ({ username }) => {
    if (!username) {
        return { status: false, msg: 'Nhập đủ thông tin!' };
    }

    const [listVip] = await connection.execute('SELECT * FROM mission_vip WHERE username = ?', [username]);

    if (listVip.length === 0) {
        return { status: false, list: [] };
    } else {
        let list = JSON.parse(listVip[0].info_don_vip);
        return { status: true, list };
    }
};

const getListBank = async ({ username }) => {
    const [list] = await connection.execute('SELECT * FROM list_bank');

    return { status: true, list };
};

const editBank = async ({ name, type, id }) => {
    if (!name || !type || !id) {
        return { status: false, msg: 'Nhập đủ thông tin!' };
    }

    if (type === 'add') {
        await connection.execute('INSERT INTO list_bank SET name = ?', [name]);
        return { status: true, msg: 'Tạo mới thành công' };
    }

    if (type === 'edit') {
        await connection.execute('UPDATE list_bank SET name = ? WHERE id = ?', [name, id]);
        return { status: true, msg: 'Cập nhật thành công' };
    }

    if (type === 'delete') {
        await connection.execute('DELETE FROM list_bank WHERE id = ?', [id]);
        return { status: true, msg: 'Xoá thành công' };
    }
};

const confirmMissionId = async (id_mission_done, id_mission, username) => {
    let [checkmoney] = await connection.execute('SELECT receive FROM mission WHERE id_mission = ?', [id_mission]);
    let { receive } = checkmoney[0];

    const [user] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
    const { money, dongbangtk } = user[0];
    await connection.execute('UPDATE mission_done SET status = 2 WHERE id = ?', [id_mission_done]);
    await connection.execute(
        'INSERT INTO financial_details SET username = ?, type = ?, amount = ?, id_msdone = ?, status = ?, time = ?',
        [username, 'roses', receive.toFixed(2), id_mission_done, 'in', Date.now()],
    );

    const newMoney = Number(money) + Number(dongbangtk) + Number(receive);
    await connection.execute('UPDATE users SET money = ?, dongbangtk = 0, level_nhandon = NULL WHERE username = ?', [
        newMoney.toFixed(2),
        username,
    ]);

    return { status: true };
};

const deleteMissionId = async (id_mission_done) => {
    const result = await connection.execute('DELETE FROM mission_done WHERE id = ?', [id_mission_done]);
    return result;
};

const getMissionsPending = async () => {
    const [listPending] = await connection.execute(
        'SELECT *, ms.id AS id_mission_done FROM mission_done AS ms JOIN mission AS m ON ms.id_mission = m.id_mission WHERE ms.status = 1 ORDER BY create_at DESC',
    );
    return { status: true, listPending };
};

const getAllMission = async () => {
    const [missions] = await connection.execute(
        'SELECT *, ms.id AS id_mission_done FROM mission_done AS ms JOIN mission AS m ON ms.id_mission = m.id_mission WHERE NOT status = 0 ORDER BY ms.time DESC',
    );

    return missions;
};

module.exports = {
    Login,
    CheckAdmin,
    listLevel,
    listMission,
    listorder,
    listorderEdit,
    editMission,
    listRecharge,
    editRecharge,
    listWithdraw,
    editWithdraw,
    listRechargeAll,
    listWithdrawAll,
    addProduct,
    listUsers,
    editUser,
    duyettien,
    editBanner,
    addBanner,
    listSettings,
    editSettings,
    listAnalytics,
    editLevel,
    editListVip,
    getListVip,
    getListBank,
    editBank,
    getMissionsPending,
    confirmMissionId,
    deleteMissionId,
    getAllMission,
};
