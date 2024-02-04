import SETTINGS from '../../setting.json';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
const axios = require('axios').default;

function OrderRedirect() {
    let [user, setUser] = useState();
    useEffect(() => {
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/userInfo`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                setUser(data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    return (
        <>
            {Array.isArray(user) && user.length > 0 && (
                <Navigate to={'/order/mission/' + user[0].roses_user} replace={true} />
            )}
        </>
    );
}

export default OrderRedirect;
