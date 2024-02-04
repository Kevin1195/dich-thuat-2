import React, { useEffect, useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import logo_ebay from '../../../../assets/images/logo_costco.png';
import SETTINGS from '../../../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios').default;

let accessToken = localStorage.getItem('auth');

const checkToken = () => {
    if (!accessToken) {
        localStorage.removeItem('auth');
        window.location.href = '/account/login';
    }
};

function formatMoney(money = 0) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function Header(props) {
    let [nameUserBank, setNameUserBank] = useState('');
    let [money, setMoney] = useState(0);

    useEffect(() => {
        if (accessToken) {
            checkToken();
            axios
                .get(`${SETTINGS.BASE_URL}/api/webapi/userInfo`, {
                    headers: {
                        'x-access-token': localStorage.getItem('auth'),
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then(function (response) {
                    let data = response.data;
                    console.log(data.data[0].roses_user);

                    if (data.status === 'ok') {
                        setMoney(data.data[0].money);
                        if (data.userBank) {
                            let nameBankUser = data.userBank.name_u_bank;
                            if (nameBankUser.split(' ').length > 3) {
                                nameBankUser =
                                    String(nameBankUser.split(' ')[nameBankUser.split(' ').length - 2]) +
                                    ' ' +
                                    String(nameBankUser.split(' ')[nameBankUser.split(' ').length - 1]);
                                setNameUserBank(nameBankUser);
                            } else setNameUserBank(data.userBank.name_u_bank);
                        }
                    }
                })
                .catch(function (error) {
                    toast.error('Có lỗi xảy ra', { theme: 'light' });
                });
        }
    }, []);

    return (
        <div className="header-style">
            <div className="header-style-info">
                <span className="ant-avatar ant-avatar-circle"></span>
                <div className="info-user">
                    <FontAwesomeIcon icon={faWallet} />
                    <div className="info-user-detail">
                        <div className="name-user">{nameUserBank}</div>
                        <div className="money-user">$ {formatMoney(money.toFixed(2))}</div>
                    </div>
                </div>
            </div>
            <div className="image-logo-header">
                <img src={logo_ebay} alt="Logo Ebay" />
            </div>
        </div>
    );
}

export default memo(Header);
