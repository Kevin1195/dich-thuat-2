// import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Layout/components/Header';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ebayIconGuihang from '../../assets/images/central-logo.png';
import comment from '../../assets/images/comment.png';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
const axios = require('axios').default;

function formatMoney(money = 0) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
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

function formateT(params) {
    let result = params < 10 ? '0' + params : params;
    return result;
}

function timerJoin2(params) {
    let date = '';
    if (params) {
        date = new Date(params);
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());

    let hours = formateT(date.getHours());
    let minutes = formateT(date.getMinutes());
    let seconds = formateT(date.getSeconds());
    return days + '-' + months + '-' + years + ' ' + hours + ':' + minutes + ':' + seconds;
}

function ComfirmOrder(state) {
    const { id } = useParams();
    const id_mission = useRef(id);
    let [mission, setMission] = useState();
    const [user, setUser] = useState();
    const [isMatching, setIsMatching] = useState(false);
    const [contentMatching, setContentMatching] = useState('');

    const { t } = useTranslation();

    useEffect(() => {
        checkToken();
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/mission/confirm`, {
                params: {
                    id_mission: id_mission.current,
                },
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.status === 'ok') {
                    setMission(data.data);
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }, []);

    useEffect(() => {
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
                if (data.status === 'ok') {
                    setUser(data);
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }, []);

    let navigate = useNavigate();

    function confirmMission() {
        setIsMatching(true);

        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/webapi/mission/confirm/id`,
                { id_mission: id_mission.current },
                {
                    headers,
                },
            )
            .then(async function (response) {
                let data = response.data;
                if (data.status === 'ok') {
                    if (data.data.type === 1000) {
                        setIsMatching(false);
                        return toast.warn(`${t('content.confirmOrder.daHoanThanh')}`, { theme: 'light' });
                    }

                    if (data.data.type === 2) {
                        setIsMatching(false);
                        return toast.warn(`${t('content.confirmOrder.nvKTonTai')}`, { theme: 'light' });
                    }

                    if (data.data.type === 3) {
                        setIsMatching(false);
                        return toast.warn(`${t('content.confirmOrder.daLamNv')}`, { theme: 'light' });
                    }

                    if (data.data.type === 4) {
                        setIsMatching(false);
                        return toast.warn(`${t('content.confirmOrder.capBacKDu')}`, { theme: 'light' });
                    }
                    if (data.data.type === 5) {
                        setIsMatching(false);
                        return toast.warn(`${t('content.confirmOrder.conNvChuaHT')}`, { theme: 'light' });
                    }

                    if (data.data.type === 0) {
                        setIsMatching(false);
                        return toast.warn(`${t('content.confirmOrder.soDuKDu')}`, { theme: 'light' });
                    }

                    if (data.data.type === 1) {
                        setTimeout(() => {
                            setContentMatching(`${t('content.confirmOrder.donHangDangGui')}`);
                        }, 0);

                        setTimeout(() => {
                            setContentMatching(`${t('content.confirmOrder.doiHeThong')}`);
                        }, 1000);

                        setTimeout(() => {
                            setContentMatching(`${t('content.confirmOrder.doiNguoiBan')}`);
                        }, 2000);

                        setTimeout(() => {
                            setIsMatching(false);
                        }, 2500);

                        setTimeout(() => {
                            toast.success(`${t('content.confirmOrder.xacNhanDonHangThangCong')}`, { theme: 'light' });
                        }, 3000);

                        setTimeout(() => {
                            navigate(`/order/mission/${user.data[0].roses_user}`);
                        }, 4000);
                    }
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }

    if (!Array.isArray(mission) || mission.length <= 0) return false;

    return (
        <div className="confirm-order">
            {isMatching && (
                <div className="matching-animation">
                    <div className="overlay">
                        <div className="textConfirm">{contentMatching}</div>
                        <div className="loader loaderConfirm1"></div>
                        <div className="loader loaderConfirm2"></div>
                        <div className="loader loaderConfirm3"></div>
                    </div>
                </div>
            )}

            <div className="px-[18px] pb-[36px] pt-[20px] mx-auto ">
                <div className="header-confirm-order flex items-center justify-between">
                    <div className="content-confirm-order">
                        <span className="text-3xl">{t('content.confirmOrder.donHang')}</span>
                        <br />
                        <spanc className="text-[#9e9e9e] text-xl">
                            {t('content.confirmOrder.timeNhan')}
                            {timerJoin2(mission.time)}
                        </spanc>
                        <br />
                        <span className="text-[#9e9e9e] text-xl">
                            {t('content.confirmOrder.maDonHang')}
                            {mission[0].time}
                        </span>
                    </div>
                    <img src={comment} alt="" className="w-[20%]" />
                </div>

                <div className="flex bg-[#f2f2f2] rounded-xl px-4 py-4 mt-4">
                    <img src={mission[0].image} alt="" className="w-[30%]" />
                    <div className="flex flex-col justify-between pl-4">
                        <span className="text-xl">{mission[0].name_mission}</span>
                        <div className="flex  justify-between">
                            <span className="text-2xl">{formatMoney(mission[0].price)} đ</span>
                            <span className="text-2xl">x 1</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex pt-4 items-center justify-between">
                        <span className="text-xl">{t('content.confirmOrder.tongSoTienDonHang')}</span>
                        <span className="text-2xl">{formatMoney(mission[0].price)} đ</span>
                    </div>

                    <div className="flex pt-4 items-center justify-between">
                        <span className="text-xl">{t('content.confirmOrder.hoaHong')}</span>
                        <span className="text-2xl">{formatMoney(mission[0].receive)} đ</span>
                    </div>

                    <div className="flex pt-4 items-center justify-between">
                        <span className="text-xl">{t('content.confirmOrder.soTienHoanTra')}</span>
                        <span className="text-4xl text-[#ff9a2c]">
                            {formatMoney(mission[0].price + mission[0].receive)} đ
                        </span>
                    </div>

                    {/* <div
                        className="flex cursor-pointer mt-4 bg-[#ff575c] w-[30%] px-4 py-2 items-center justify-center rounded-xl text-white"
                        onClick={() => confirmMission()}
                    >
                        {t('content.confirmOrder.guiDonHang')}
                    </div> */}
                </div>
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

export default ComfirmOrder;
