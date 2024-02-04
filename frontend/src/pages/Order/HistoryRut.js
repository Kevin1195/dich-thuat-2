import { useEffect, useState } from 'react';
import Header from '../../components/Layout/components/Header';
import SETTINGS from '../../setting.json';
const axios = require('axios').default;
const checkToken = () => {
    let accessToken = localStorage.getItem('auth');
    if (!accessToken) {
        localStorage.removeItem('auth');
        window.location.href = '/account/login';
    } else {
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/me`, {
                headers: {
                    'x-access-token': accessToken,
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.status === 'error') {
                    localStorage.removeItem('auth');
                    window.location.href = '/account/login';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};

function formateT(params) {
    let result = params < 10 ? '0' + params : params;
    return result;
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

function HistoryRut(props) {
    document.title = props.title;
    let [financial, setFinancial] = useState([]);
    useEffect(() => {
        checkToken();
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/user/historyrut`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data.data;
                setFinancial(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    if (!Array.isArray(financial)) return false;
    return (
        <div className="FinancialDetails">
            <div className="list-datas p-[12px] min-h-[800px] bg-[#0c131d]">
                {financial.map((item, index) => {
                    return (
                        <div key={index} className="flex items-center data-item py-[5px] bg-[#303845]">
                            <div className="w-[100%] flex justify-between items-center border-b-2">
                                <p className="type text-[#ffa900] text-[16px] capitalize">{item.comment}</p>
                                <p
                                    style={{ color: `${item.status === 1 ? '#0dc253' : '#e74c3c'}` }}
                                    className=" price text-[16px]"
                                >
                                    {item.amount}
                                </p>
                                <div className="text-[#a6c4c3] text-xl mb-[4px]">{timerJoin2(item.time)}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HistoryRut;
