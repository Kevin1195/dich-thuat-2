import usersController from '../controllers/users.controller';
import middlewareController from '../controllers/middlewareController';

import express from 'express';
const router = express.Router();

const userRoute = (app) => {
    router.post('/register', usersController.Register);
    router.post('/login', usersController.Login);
    router.get('/userInfo', middlewareController, usersController.userInfo);
    router.get('/user-lucky', middlewareController, usersController.UserLucky);
    router.post('/user-lucky', middlewareController, usersController.UpdateLucky);
    router.get('/me', middlewareController, usersController.Me);
    router.get('/list/banners', usersController.listBanner);
    router.post('/recharge/add', middlewareController, usersController.addRecharge);
    router.get('/recharge/:id', middlewareController, usersController.getRecharge);
    router.put('/change_password', middlewareController, usersController.changePassword);
    router.put('/edit-password-transaction', middlewareController, usersController.changePasswordTransaction);
    router.post('/user/addbanking', middlewareController, usersController.addBanking);
    router.get('/user/banking', middlewareController, usersController.checkBanking);
    router.post('/user/withdraw', middlewareController, usersController.withdraw);
    router.get('/user/financial-details', middlewareController, usersController.financial);
    router.get('/historyrut', middlewareController, usersController.historyrut);
    router.post('/user/upgrade', middlewareController, usersController.upgrade);
    router.post('/user/addaddress', middlewareController, usersController.addAddress);
    router.get('/support', middlewareController, usersController.listSupport);
    router.get('/level/list', middlewareController, usersController.levelList);
    router.get('/list/bank', middlewareController, usersController.getListBank);
    router.get('/admin/bank', middlewareController, usersController.getAdminBank);
    router.get('/history-recharge', usersController.getHistoryRecharge);
    router.get('/history-withdraw', usersController.getHistoryWithdraw);
    // router.post('/callback_KJASHJKFASJDKJAS', )

    return app.use('/api/webapi', router);
};

export default userRoute;
