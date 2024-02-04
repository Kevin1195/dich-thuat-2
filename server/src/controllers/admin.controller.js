import createError from 'http-errors';
import Admin from '../models/admin.model';

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Login = async (req, res, next) => {
    try {
        const data = req.body;
        let result = await Admin.Login(data);
        return res.status(200).json({
            status: 'ok',
            data: result,
            message: 'Đăng nhập thành công',
        });
    } catch (error) {
        next(error);
    }
};

const CheckAdmin = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let result = await Admin.CheckAdmin(token);
        return res.status(200).json({
            status: 'ok',
            type: result.type,
        });
    } catch (error) {
        next(error);
    }
};

const listLevel = async (req, res, next) => {
    try {
        let result = await Admin.listLevel();
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const listMission = async (req, res, next) => {
    try {
        let result = await Admin.listMission();
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const listRecharge = async (req, res, next) => {
    try {
        let result = await Admin.listRecharge();
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};
const listorder = async (req, res, next) => {
    try {
        let sdt = req.body.sdt;
        let result = await Admin.listorder(sdt);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
const listorderEdit = async (req, res, next) => {
    try {
        let data = req.body;
        let result = await Admin.listorderEdit(data);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const listRechargeAll = async (req, res, next) => {
    try {
        let result = await Admin.listRechargeAll();
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const listWithdrawAll = async (req, res, next) => {
    try {
        let result = await Admin.listWithdrawAll();
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const listWithdraw = async (req, res, next) => {
    try {
        let result = await Admin.listWithdraw();
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const listUsers = async (req, res, next) => {
    try {
        let result = await Admin.listUsers(req.query);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const listSettings = async (req, res, next) => {
    try {
        let result = await Admin.listSettings();
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const listAnalytics = async (req, res, next) => {
    try {
        let result = await Admin.listAnalytics();
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const editMission = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = req.body;

        let result = await Admin.editMission(data, token);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const editRecharge = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = req.body;
        let result = await Admin.editRecharge(data, token);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const editWithdraw = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = req.body;
        let result = await Admin.editWithdraw(data, token);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const editUser = async (req, res, next) => {
    try {
        let data = req.body;
        let result = await Admin.editUser(data);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};
const duyettien = async (req, res, next) => {
    try {
        let data = req.body;
        let result = await Admin.duyettien(data);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const editBanner = async (req, res, next) => {
    try {
        let data = req.body;
        let result = await Admin.editBanner(data);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const editSettings = async (req, res, next) => {
    try {
        let data = req.body;
        let result = await Admin.editSettings(data);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = req.body;
        let { name, price, rosess, vip, imgsss, description } = data;
        if (!name || !price || !rosess || !vip || !imgsss) {
            return res.status(403).json({ status: false, msg: 'Vui lòng nhập đầy đủ thông tin' });
        }
        let result = await Admin.addProduct(data, token);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const addBanner = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = req.body;
        let result = await Admin.addBanner(data, token);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const editLevel = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = req.body;
        let result = await Admin.editLevel(data, token);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const editMissionVip = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = req.body;
        let result = await Admin.editListVip(data, token);
        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const getMissionVip = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = req.query;
        let result = await Admin.getListVip(data, token);

        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const getListBank = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let data = req.query;
        let result = await Admin.getListBank(data, token);

        return res.status(200).json({
            status: 'ok',
            result,
        });
    } catch (error) {
        next(error);
    }
};

const editBank = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        let result = await Admin.editBank(req.body, token);

        return res.status(200).json({
            result,
        });
    } catch (error) {
        next(error);
    }
};

const getMissionsPending = async (req, res, next) => {
    try {
        let result = await Admin.getMissionsPending();

        return res.status(200).json({
            result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteMissionId = async (req, res, next) => {
    try {
        let { id_mission_done } = req.body;
        let data = await Admin.deleteMissionId(id_mission_done);
        return res.status(200).json({
            status: 'ok',
            data,
            message: 'Success',
        });
    } catch (err) {
        next(err);
    }
};

const confirmMissionId = async (req, res, next) => {
    try {
        let { id_mission_done, id_mission, username } = req.body;
        let data = await Admin.confirmMissionId(id_mission_done, id_mission, username);
        return res.status(200).json({
            status: 'ok',
            data,
            message: 'Success',
        });
    } catch (err) {
        next(err);
    }
};

const getAllMission = async (req, res, next) => {
    try {
        let data = await Admin.getAllMission();
        return res.status(200).json({
            status: 'ok',
            data,
            message: 'Success',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    Login,
    CheckAdmin,
    listLevel,
    listMission,
    listRecharge,
    listorder,
    listorderEdit,
    editMission,
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
    editMissionVip,
    getMissionVip,
    getListBank,
    editBank,
    getListBank,
    getMissionsPending,
    deleteMissionId,
    confirmMissionId,
    getAllMission,
};
