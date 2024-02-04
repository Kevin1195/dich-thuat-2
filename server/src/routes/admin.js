import adminController from '../controllers/admin.controller';
import middlewareAdminController from '../controllers/middlewareAdminController';

import express from 'express';
const router = express.Router();

const userRoute = (app) => {
    router.post('/login', adminController.Login);
    router.get('/level/list', middlewareAdminController, adminController.listLevel);
    router.get('/mission/list', middlewareAdminController, adminController.listMission);
    router.get('/recharge/list', middlewareAdminController, adminController.listRecharge);
    // router.get('/dongbang/list', middlewareAdminController, adminController.listDongbang);
    router.get('/recharge/list/all', middlewareAdminController, adminController.listRechargeAll);
    router.get('/withdraw/list', middlewareAdminController, adminController.listWithdraw);
    router.get('/list/users/all', middlewareAdminController, adminController.listUsers);
    router.get('/list/settings', middlewareAdminController, adminController.listSettings);
    router.get('/list/analytics', middlewareAdminController, adminController.listAnalytics);
    router.get('/withdraw/list/all', middlewareAdminController, adminController.listWithdrawAll);
    router.get('/check', adminController.CheckAdmin);
    router.post('/edit/mission', middlewareAdminController, adminController.editMission);
    router.post('/edit/recharge', middlewareAdminController, adminController.editRecharge);
    router.post('/edit/withdraw', middlewareAdminController, adminController.editWithdraw);
    router.post('/edit/level', middlewareAdminController, adminController.editLevel);
    router.post('/listorder', middlewareAdminController, adminController.listorder);
    router.post('/listorder/edit', middlewareAdminController, adminController.listorderEdit);
    router.post('/edit/user', middlewareAdminController, adminController.editUser);
    router.post('/edit/duyettien', middlewareAdminController, adminController.duyettien);
    router.post('/edit/banner', middlewareAdminController, adminController.editBanner);
    router.post('/edit/settings', middlewareAdminController, adminController.editSettings);
    router.post('/add/product', middlewareAdminController, adminController.addProduct);
    router.post('/add/banner', middlewareAdminController, adminController.addBanner);
    router.post('/missionvip/edit', middlewareAdminController, adminController.editMissionVip);
    router.get('/missionvip/list', middlewareAdminController, adminController.getMissionVip);
    router.get('/list/bank', middlewareAdminController, adminController.getListBank);
    router.post('/edit/bank', middlewareAdminController, adminController.editBank);
    router.get('/list/mission_pending', middlewareAdminController, adminController.getMissionsPending);
    router.post('/mission/delete', middlewareAdminController, adminController.deleteMissionId);
    router.post('/mission/confirm', middlewareAdminController, adminController.confirmMissionId);
    router.get('/missions/all', middlewareAdminController, adminController.getAllMission);

    return app.use('/api/portal', router);
};

export default userRoute;
