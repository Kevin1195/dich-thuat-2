import createError from 'http-errors';

import Users from '../models/users.model';

const isNumber = (params) => {
    let pattern = /^[0-9]*\d$/;
    return pattern.test(params);
};

const Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) throw new createError.BadRequest();
        // if (!isNumber(username)) throw new createError.Conflict('Tài khoản không đúng định dạng!');

        let data = await Users.checkAcount(req.body);
        if (data.user.length <= 0) {
            return res.status(200).json({
                status: 'error',
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }
        if (data.user.length > 0 && data.user[0].status == 2) {
            return res.status(200).json({
                status: 'error',
                message: 'Tài khoản đã bị khóa !',
            });
        }
        return res.status(200).json({
            status: 'ok',
            auth: data.token,
            message: 'Đăng nhập thành công',
        });
    } catch (error) {
        next(error);
    }
};

const Register = async (req, res, next) => {
    try {
        const ip = req.socket.remoteAddress;
        const { username, password, invite, phone } = req.body;
        req.body.ip = ip;
        if (!username || !password || !invite || !phone)
            throw new createError.BadRequest('Vui lòng nhập đầy đủ thông tin!');
        // if (!isNumber(username)) throw new createError.Conflict('Tài khoản không đúng định dạng!');

        // console.log(phone);
        let user = await Users.findOne({ username, phone });
        let checkInvite = await Users.findInvite(invite);

        if (checkInvite.length <= 0) {
            return res.status(200).json({
                status: 'error',
                message: 'Mã giới thiệu không tồn tại !',
            });
        }

        if (user.length > 0) {
            return res.status(200).json({
                status: 'error',
                message: 'Tài khoản này đã tồn tại trong hệ thống!',
            });
        }
        let auth = await Users.save(req.body);
        return res.status(200).json({
            status: 'ok',
            auth: auth.token,
            message: 'Đăng ký thành công',
        });
    } catch (error) {
        next(error);
    }
};

const userInfo = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = await Users.findOneToken(token);
        let mission = await Users.list_mission(token);
        let users_bank = await Users.getBankingByUser(token);
        let userBank = users_bank === false ? false : users_bank[0];
        let moneyEarn = await Users.moneyEarn(token);

        let {
            money,
            username,
            money_2,
            id_user,
            roses_user,
            dongbangtk,
            address,
            name_level,
            price,
            amount,
            roses,
            ...other
        } = data[0];
        return res.status(200).json({
            status: 'ok',
            mission,
            userBank: userBank,
            moneyEarn,
            data: [
                {
                    username,
                    money,
                    money_2,
                    id_user,
                    roses_user,
                    dongbangtk,
                    address,
                    name_level,
                    price,
                    amount,
                    roses,
                },
            ],
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const Me = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = await Users.findOneToken(token);

        let { username } = data[0];
        return res.status(200).json({
            status: 'ok',
            data: [{ username }],
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const addRecharge = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = await Users.addRecharge(req.body, token);

        if (data.type == 0) {
            return res.status(200).json({
                status: 2,
                id_txn: data.id,
                message: 'Có đơn nạp chưa duyệt',
            });
        }
        if (data.type == 3) {
            return res.status(200).json({
                status: 3,
                id_txn: data.id,
                message: 'Momo hiện đang bảo trì',
            });
        }

        return res.status(200).json({
            status: 1,
            id_txn: data.id,
            message: 'Tạo đơn nạp thành công',
        });
    } catch (error) {
        next(error);
    }
};
// const callbackNap = async(req, res){

// }

const getRecharge = async (req, res, next) => {
    try {
        let id = req.params.id;
        let token = req.headers['x-access-token'];
        let data = await Users.getRecharge(token, id);
        return res.status(200).json({
            status: 'ok',
            data: data,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        let data = req.body;
        let token = req.headers['x-access-token'];
        let result = await Users.changePassword(data, token);
        return res.status(200).json({
            status: 'ok',
            data: result.type,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const changePasswordTransaction = async (req, res, next) => {
    try {
        let data = req.body;
        let token = req.headers['x-access-token'];
        let result = await Users.changePasswordTransaction(data, token);
        return res.status(200).json({
            status: 'ok',
            data: result.type,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const addBanking = async (req, res, next) => {
    try {
        let data = req.body;
        let token = req.headers['x-access-token'];
        let result = await Users.addBanking(data, token);
        return res.status(200).json({
            status: 'ok',
            data: result.type,
            message: 'Success',
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const checkBanking = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = await Users.checkBanking(token);
        return res.status(200).json({
            status: 'ok',
            data: data,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const withdraw = async (req, res, next) => {
    try {
        let data = req.body;
        let token = req.headers['x-access-token'];
        let result = await Users.withdraw(data, token);
        return res.status(200).json({
            status: 'ok',
            data: result,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const financial = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let result = await Users.financial(token);
        return res.status(200).json({
            status: 'ok',
            data: result,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};
const historyrut = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let result = await Users.historyrut(token);
        return res.status(200).json({
            status: 'ok',
            data: result,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const upgrade = async (req, res, next) => {
    try {
        let data = req.body;
        let token = req.headers['x-access-token'];
        let result = await Users.upgrade(data, token);
        return res.status(200).json({
            status: 'ok',
            data: result,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const listBanner = async (req, res, next) => {
    try {
        let data = await Users.listBanner();
        return res.status(200).json({
            status: 'ok',
            data,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const listSupport = async (req, res, next) => {
    try {
        let data = await Users.listSupport();
        return res.status(200).json({
            status: 'ok',
            data,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const levelList = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = await Users.levelList(token);

        return res.status(200).json({
            status: 'ok',
            data,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const addAddress = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = req.body;
        let result = await Users.addAddress(data, token);

        return res.status(200).json({
            status: 'ok',
            result,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const getListBank = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = req.query;
        let result = await Users.getListBank(data, token);

        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const UserLucky = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = await Users.findOneUserLuckyByToken(token);
        return res.status(200).json({
            status: 'ok',
            data: data,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const UpdateLucky = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        const { winningSegment } = req.body;
        let dataUser = await Users.findOneUserLuckyByToken(token);

        if (dataUser[0].da_quay_may_man === 1) {
            return res.status(500).json({
                status: 500,
                message: 'Lỗi',
            });
        }

        if (dataUser.length > 0 && winningSegment) {
            if (dataUser[0].may_man === winningSegment) {
                const money_lucky = String(dataUser[0].may_man).split('.');
                let data = await Users.updateLuckyByToken(token, Number(money_lucky[0]));
                return res.status(200).json({
                    status: 'ok',
                    data: data,
                    message: 'Success',
                });
            }
        } else
            return res.status(500).json({
                status: 500,
                message: 'Lỗi',
            });
    } catch (error) {
        next(error);
    }
};

const getAdminBank = async (req, res, next) => {
    try {
        let result = await Users.getAdminBank();

        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const getHistoryRecharge = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let result = await Users.getHistoryRecharge(token);
        return res.status(200).json({
            status: 'ok',
            data: result,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const getHistoryWithdraw = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let result = await Users.getHistoryWithdraw(token);
        return res.status(200).json({
            status: 'ok',
            data: result,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    Register,
    Login,
    userInfo,
    addRecharge,
    getRecharge,
    changePassword,
    changePasswordTransaction,
    addBanking,
    checkBanking,
    Me,
    withdraw,
    financial,
    historyrut,
    upgrade,
    listBanner,
    listSupport,
    levelList,
    addAddress,
    getListBank,
    getAdminBank,
    UserLucky,
    UpdateLucky,
    getHistoryRecharge,
    getHistoryWithdraw,
};
