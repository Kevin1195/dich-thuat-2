import connection from '../config/config';
import Users from '../models/users.model';

const middlewareController = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (token) {
        let data = await Users.findOneToken(token);
        if (data.length <= 0) {
            return res.json({
                status: 'error',
                message: 'Invalid token',
            });
        } else {
            let [data] = await Users.findOneToken(token);
            let { username } = data;
            await connection.execute('UPDATE users SET last_login = ? WHERE username = ?', [Date.now(), username]);
            next();
        }
    } else {
        return res.json({
            status: 'error',
            message: 'Access denied!',
        });
    }
};

export default middlewareController;
