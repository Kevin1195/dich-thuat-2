import styles from '../Order/Order.module.scss';
import classNames from 'classnames/bind';
import Header from '../../components/Layout/components/Header';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import './History.css';
import imageEmail from '../../assets/images/image-email.png';
import { useTranslation } from 'react-i18next';

const axios = require('axios').default;
const cx = classNames.bind(styles);

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
function formatMoney(money = 0) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

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

function HistoryRechargeWithdraw({ title }) {
    const [activeTab, setActiveTab] = useState('1');
    const [activeTabPane, setActiveTabPane] = useState('1');
    const [activeTab2, setActiveTab2] = useState('pending');
    const [data, setData] = useState('');
    const [username, setUsername] = useState('');

    document.title = title;
    let [type_mission, setType] = useState('all');
    let [recharge, setRecharge] = useState([]);
    let [withdraw, setWithdraw] = useState([]);

    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/history-recharge`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.status === 'ok') {
                    setRecharge(data.data.recharge);
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/history-withdraw`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.status === 'ok') {
                    setWithdraw(data.data.withdraw);
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }, []);

    // useEffect(() => {
    //     checkToken();
    //     axios
    //         .get(`${SETTINGS.BASE_URL}/api/webapi/userInfo`, {
    //             headers: {
    //                 'x-access-token': localStorage.getItem('auth'),
    //                 'Access-Control-Allow-Origin': '*',
    //             },
    //         })
    //         .then(function (response) {
    //             let data = response.data;
    //             if (data.status === 'ok') {
    //                 setUsername(() => data.data[0].username);
    //                 axios
    //                     .get(
    //                         `${SETTINGS.BASE_URL}/api/webapi/history/${activeTab2}`,
    //                         { params: { username: data.data[0].username } },
    //                         {
    //                             headers: {
    //                                 'x-access-token': localStorage.getItem('auth'),
    //                                 'Access-Control-Allow-Origin': '*',
    //                             },
    //                         },
    //                     )
    //                     .then(function (response) {
    //                         let data = response.data;
    //                         if (data.result.length > 0) {
    //                             setData(() => data.result);
    //                         }
    //                     })
    //                     .catch(function (error) {
    //                         toast.error('Có lỗi xảy ra', { theme: 'light' });
    //                     });
    //             }
    //         })
    //         .catch(function (error) {
    //             toast.error('Có lỗi xảy ra', { theme: 'light' });
    //         });
    // }, []);

    useEffect(() => {
        checkToken();
    }, []);
    if (!Array.isArray(recharge)) return false;

    return (
        <div className="history-order">
            <div className="history-body">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={activeTab === '1' ? 'active' : ''}
                            onClick={() => {
                                setActiveTabPane('1');
                                setActiveTab('1');
                            }}
                        >
                            {t('content.historyRecharge.napTien')}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === '2' ? 'active' : ''}
                            onClick={() => {
                                setActiveTabPane('2');
                                setActiveTab('2');
                            }}
                        >
                            {t('content.historyRecharge.rutTien')}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTabPane}>
                    <TabPane tabId="1">
                        <div className="tab-pane">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="col"> {t('content.historyRecharge.thoiGian')}</th>
                                        <th className="col">{t('content.historyRecharge.bienDong')}</th>
                                        <th className="col">{t('content.historyRecharge.trangThai')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recharge &&
                                        recharge.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{timerJoin2(item.time)}</td>
                                                    <td>
                                                        <span className="badge badge-success">
                                                            {' '}
                                                            + {formatMoney(item.amount)} VND
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {item.status == '2' && (
                                                            <span className="badge badge-fail">
                                                                {t('content.historyRecharge.thatBai')}
                                                            </span>
                                                        )}
                                                        {item.status == '1' && (
                                                            <span className="badge badge-success">
                                                                {t('content.historyRecharge.thanhCong')}
                                                            </span>
                                                        )}
                                                        {item.status == '0' && (
                                                            <span className="badge badge-pending">
                                                                {t('content.historyRecharge.choXuLy')}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>

                        {!activeTab && (
                            <div className="empty">
                                <div className="empty-image">
                                    <img src={imageEmail} alt="Email-Empty" width="120px" height="120px" />
                                </div>
                                <div className="empty-description">{t('content.historyRecharge.chuaCoLS')}</div>
                            </div>
                        )}
                    </TabPane>
                    <TabPane tabId="2">
                        <div className="tab-pane">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="col">{t('content.historyRecharge.thoiGian')}</th>
                                        <th className="col">{t('content.historyRecharge.bienDong')}</th>
                                        <th className="col">{t('content.historyRecharge.trangThai')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {withdraw &&
                                        withdraw.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{timerJoin2(item.time)}</td>
                                                    <td>
                                                        <span className="badge withdraw-success">
                                                            {' '}
                                                            - {formatMoney(item.amount)} VND
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {item.status == '2' && (
                                                            <span className="badge badge-fail">
                                                                {t('content.historyRecharge.thatBai')}
                                                            </span>
                                                        )}
                                                        {item.status == '1' && (
                                                            <span className="badge badge-success">
                                                                {t('content.historyRecharge.thanhCong')}
                                                            </span>
                                                        )}
                                                        {item.status == '0' && (
                                                            <span className="badge badge-pending">
                                                                {t('content.historyRecharge.choXuLy')}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </TabPane>
                </TabContent>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default HistoryRechargeWithdraw;
