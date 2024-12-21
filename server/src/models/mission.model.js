import md5 from 'md5';
import connection from '../config/config';
import { sendMessageToAll } from '../../server';
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

const missionss = async () => {
    const [missions] = await connection.execute('SELECT * FROM `level`');
    return missions;
};
const findOneToken = async (token) => {
    const [user] = await connection.execute(
        'SELECT u.*, l.amount FROM users AS u LEFT JOIN level AS l ON u.roses_user = l.id_level WHERE token = ?',
        [token],
    );
    return user[0];
};

const listMission = async (token) => {
    let missions = await missionss();
    //missions.reverse();
    let { roses_user } = await findOneToken(token);
    return { missions, roses_user };
};

const listBanner = async () => {
    const [banner] = await connection.execute('SELECT * FROM banner ORDER BY id DESC');
    return banner;
};

const myMission = async (token, id_mission) => {
    let { username, money, roses_user } = await findOneToken(token);
    var [missions] = await connection.execute('SELECT * FROM level WHERE id_level = ?', [id_mission]);

    let [name_level_u] = await connection.execute(
        'SELECT level.name_level FROM users INNER JOIN level ON level.id_level = users.roses_user WHERE username = ?',
        [username],
    );
    if (missions.length <= 0) return { type: 4 };

    let [amount] = await connection.execute(
        'SELECT count(mission_done.id) as amount FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND level_mission = ? AND mission_done.status != ?',
        [username, id_mission, 2],
    );

    let pattern = /[0-9]/g;
    let level_client = id_mission.match(pattern);
    let level_user = roses_user.match(pattern);

    let type = '';
    if (Number(level_client[0]) < Number(level_user[0])) {
        type = 1;
    } else {
        type = 2;
    }

    let { name_level } = name_level_u[0];
    missions.reverse();
    return {
        missions,
        roses_user,
        name_level,
        money,
        type,
        amount: amount[0].amount,
    };
};

// const newMission = async (token, level) => {
//     let { username, money, roses_user, level_nhandon, stt_don_vip, don_vip_create_at, amount, status, dongbangtk } =
//         await findOneToken(token);

//     if (status === 2) return { type: 3, mission: [] };

//     let today = timerJoin();

//     const [levels] = await connection.execute('SELECT * FROM level WHERE id_level = ?', [level]);
//     const [[total]] = await connection.execute(
//         'SELECT COUNT(*) FROM mission_done WHERE username = ? AND create_at = ? AND NOT status = 0',
//         [username, today],
//     );
//     const [missionPending] = await connection.execute('SELECT * FROM mission_done WHERE username = ? AND status = 0', [
//         username,
//     ]);
//     if (missionPending.length > 0) return { type: 1001, mission: [] };
//     if (amount === total['COUNT(*)']) {
//         return { type: 1000, mission: [] }; //Hoàn thành đủ đơn hàng trong ngày
//     }

//     if (levels.length <= 0) return { type: 4 };

//     let pattern = /[0-9]/g;
//     let level_client = level.match(pattern); // Client gửi lên id
//     let level_user = roses_user.match(pattern); // level users

//     //let today = timerJoin(); //  VD: 2022-10-04
//     const [missions_done] = await connection.execute(
//         'SELECT * FROM mission_done WHERE username = ? AND create_at = ? AND NOT status = 0',
//         [username, today],
//     );

//     if (level_nhandon && (total['COUNT(*)'] + 1 === stt_don_vip || don_vip_create_at !== today)) {
//         var [missions_list] = await connection.execute(
//             'SELECT * FROM mission WHERE id_mission = ? ORDER BY price ASC',
//             [level_nhandon],
//         );
//         const [mission_vip] = await connection.execute(
//             'SELECT * FROM mission_done WHERE username = ? AND id_mission = ? AND status = 0',
//             [username, missions_list[0]?.id_mission],
//         );

//         if (mission_vip.length === 0) {
//             await connection.execute(
//                 'INSERT INTO mission_done SET username = ?, id_mission = ?, status = ?, create_at = ?, time = ?',
//                 [username, missions_list[0].id_mission, 0, don_vip_create_at, Date.now()],
//             );

//             const dongbang = dongbangtk + money;
//             await connection.execute('UPDATE users SET money = 0, dongbangtk = ? WHERE username = ?', [
//                 dongbang,
//                 username,
//             ]);
//         }
//     } else {
//         var [missions_list] = await connection.execute(
//             'SELECT * FROM mission WHERE level_mission = ? AND price < ?  ORDER BY price ASC',
//             [level, money],
//         );
//     }

//     let list_mission_done = missions_done.map((data) => {
//         return data.id_mission;
//     });
//     let list_mission = [];

//     if (list_mission_done.length > 0) {
//         if (level_nhandon && (total['COUNT(*)'] + 1 === stt_don_vip || don_vip_create_at !== today)) {
//             list_mission = missions_list;
//         } else {
//             list_mission = missions_list.filter((data) => {
//                 return !list_mission_done.includes(data.id_mission);
//             });
//         }
//     } else {
//         list_mission = missions_list;
//     }

//     let index = random(0, list_mission.length - 1);
//     await connection.execute(
//         'INSERT INTO mission_done SET username = ?, id_mission = ?, status = ?, create_at = ?, time = ?',
//         [username, list_mission[index].id_mission, 0, today, Date.now()],
//     );

//     if (list_mission.length > 0) return { type: 1, mission: list_mission[index] };
//     return { type: 2, mission: [] };
// };

// const confirmMissionID = async (token, id_mission) => {
//     let { username, money, roses_user, amount, level_nhandon, dongbangtk } = await findOneToken(token);
//     const [missions] = await connection.execute('SELECT * FROM mission WHERE id_mission = ?', [id_mission]);

//     const [missionVip] = await connection.execute('SELECT * FROM mission_vip WHERE username = ?', [username]);
//     let info_don_vip = [];
//     if (missionVip.length !== 0) {
//         info_don_vip = missionVip[0]?.info_don_vip;
//         info_don_vip = JSON?.parse(info_don_vip);
//     }

//     if (missions.length <= 0) return { type: 2 }; // Nhiệm vụ không tồn tại

//     let today = timerJoin(); //  VD: 2022-10-04
//     const [missions_done] = await connection.execute(
//         'SELECT * FROM mission_done WHERE id_mission = ? AND create_at = ? AND username = ?',
//         [id_mission, today, username],
//     );

//     const [[total]] = await connection.execute(
//         'SELECT COUNT(*) FROM mission_done WHERE username = ? AND status = 1 AND create_at = ?',
//         [username, today],
//     );

//     if (total['COUNT(*)'] === amount) return { type: 1000 };

//     let pattern = /[0-9]/g;
//     let level_client = missions[0].level_mission.match(pattern);
//     let level_user = roses_user.match(pattern);
//     if (info_don_vip.length === 0) {
//         //check nhan don vuot cap
//         if (level_client < level_user) return { type: 4 }; // Cấp bậc của bạn không đủ
//     }

//     if (money - missions[0].price >= 0) {
//         if (level_nhandon && (total['COUNT(*)'] + 1 === stt_don_vip || don_vip_create_at !== today)) {
//             if (level_nhandon && id_mission !== level_nhandon) return { type: 3 };

//             // await connection.execute(
//             //     'INSERT INTO mission_done SET username = ?, id_mission = ?, status = ?, create_at = ?, time = ?',
//             //     [username, id_mission, 1, don_vip_create_at, Date.now()],
//             // );
//             await connection.execute('UPDATE mission_done SET status = 1 WHERE username = ? AND id_mission = ?', [
//                 username,
//                 id_mission,
//             ]);
//         } else {
//             await connection.execute('UPDATE mission_done SET status = 1 WHERE username = ? AND id_mission = ?', [
//                 username,
//                 id_mission,
//             ]);
//         }

//         let [mission_done] = await connection.execute(
//             'SELECT * FROM mission_done WHERE status = 1 AND username = ? ORDER BY time DESC',
//             [username],
//         );
//         let mission = mission_done[0];
//         try {
//             let [checkmoney] = await connection.execute('SELECT receive, price FROM mission WHERE id_mission = ?', [
//                 mission.id_mission,
//             ]);
//             let { receive, price } = checkmoney[0];

//             await connection.execute(
//                 'INSERT INTO financial_details SET username = ?, type = ?, amount = ?, id_msdone = ?, status = ?, time = ?',
//                 [username, 'roses', receive.toFixed(2), mission.id, 'in', Date.now()],
//             );
//             if (level_nhandon && (total['COUNT(*)'] + 1 === stt_don_vip || don_vip_create_at !== today)) {
//                 // await connection.execute(
//                 //     'UPDATE users SET money = money + ?, level_nhandon = NULL, stt_don_vip = NULL, don_vip_create_at = NULL WHERE username = ?',
//                 //     [receive.toFixed(2), username],
//                 // );
//                 const newMoney = dongbangtk + money + receive;
//                 await connection.execute('UPDATE users SET money = ?, dongbangtk = 0 WHERE username = ?', [
//                     newMoney.toFixed(2),
//                     username,
//                 ]);
//             } else {
//                 await connection.execute('UPDATE users SET money = money + ? WHERE username = ?', [
//                     receive.toFixed(2),
//                     username,
//                 ]);
//             }
//         } catch (err) {
//             console.log(err);
//         }

//         return { type: 1 }; // Thành công
//     } else {
//         return { type: 0 }; // Số dư không đủ để làm nhiệm vụ
//     }
// };

const historyMission = async (token, type_history) => {
    let arr = ['all', 'pending_send', 'pending_accept', 'success']; // Đại diện status all 0 1 2
    let checkType = arr.includes(type_history);
    if (!checkType) return { type: 4 };
    let { username, roses_user } = await findOneToken(token);
    if (type_history == 'all') {
        var [missions] = await connection.execute(
            'SELECT mission.*, mission_done.* FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? ORDER BY mission_done.id DESC',
            [username],
        );
    } else if (type_history == 'pending_send') {
        var [missions] = await connection.execute(
            'SELECT mission.*, mission_done.* FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = ? ORDER BY mission_done.id DESC',
            [username, 0],
        );
    } else if (type_history == 'pending_accept') {
        var [missions] = await connection.execute(
            'SELECT mission.*, mission_done.* FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = ? ORDER BY mission_done.id DESC',
            [username, 1],
        );
    } else if (type_history == 'success') {
        var [missions] = await connection.execute(
            'SELECT mission.*, mission_done.* FROM mission INNER JOIN mission_done ON mission.id_mission = mission_done.id_mission WHERE mission_done.username = ? AND mission_done.status = ? ORDER BY mission_done.id DESC',
            [username, 2],
        );
    }
    return missions; // Thanhf coong
};

const newMission = async (token) => {
    const { username, money, roses_user, level_nhandon, stt_don_vip, don_vip_create_at, amount, status, dongbangtk } =
        await findOneToken(token);

    if (status === 2) return { type: 3, mission: [] };
    let today = timerJoin();
    const [missionPendingAccept] = await connection.execute(
        'SELECT * FROM mission_done WHERE username = ? AND status = 1 ',
        [username],
    );
    if (missionPendingAccept.length > 0) return { type: 1001, mission: [] };

    const [missionPendingSend] = await connection.execute(
        'SELECT * FROM mission_done WHERE username = ? AND status = 0 ',
        [username],
    );
    if (missionPendingSend.length > 0) {
        const [mission] = await connection.execute('SELECT * FROM mission WHERE id_mission = ?', [
            missionPendingSend?.[0]?.id_mission,
        ]);
        return { type: 1, mission: mission };
    }

    if (level_nhandon) {
        const [mission] = await connection.execute('SELECT * FROM mission WHERE id_mission = ?', [level_nhandon]);
        await connection.execute(
            'INSERT INTO mission_done SET username = ?, id_mission = ?, status = ?, create_at = ?, time = ?',
            [username, mission[0].id_mission, 0, today, Date.now()],
        );
        sendMessageToAll('newMission', 'notice', { username });
        return { type: 1, mission: mission[0] };
    } else {
        return { type: 2, mission: [] };
    }
};

const confirmMissionID = async (token, id, id_mission, rate) => {
    const { username, money } = await findOneToken(token);
    const [mission] = await connection.execute('SELECT * FROM mission WHERE id_mission = ?', [id_mission]);
    if (money < mission?.[0]?.price) {
        return { type: 0 };
    }
    const newMoney = money - mission?.[0]?.price;

    await connection.execute('UPDATE users SET money = ?, dongbangtk = ? WHERE username = ?', [
        newMoney,
        mission?.[0]?.price,
        username,
    ]);
    let today = timerJoin();
    await connection.execute(
        'UPDATE mission_done SET status = 1, create_at = ?, time = ?, rate = ? WHERE username = ? AND id = ?',
        [today, Date.now(), rate, username, id],
    );
    sendMessageToAll('newConfirm');
    return { type: 1 };
};

module.exports = {
    listMission,
    myMission,
    newMission,
    confirmMissionID,
    historyMission,
    listBanner,
};
