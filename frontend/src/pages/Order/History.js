import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import Header from '../../components/Layout/components/Header';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import successIcon from '../../assets/images/success-icon-style.png';
import pendingIcon from '../../assets/images/pending-icon.png';
import ebayIconGuiHang from '../../assets/images/central-logo.png';
import { useTranslation } from 'react-i18next';
import './History.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
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

function History({ title }) {
    document.title = title;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    let [type_mission, setType] = useState(type || 'all');
    let [mission, setMission] = useState([]);
    const [isMatching, setIsMatching] = useState(false);
    const [contentMatching, setContentMatching] = useState('');
    const [missionSelected, setMissionSelected] = useState({});

    const [modalOne, setModalOne] = useState(false);

    const toggleOne = () => setModalOne(!modalOne);
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/mission/history`, {
                params: {
                    type: type_mission,
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
    }, [type_mission]);

    useEffect(() => {
        checkToken();
    }, []);
    let navigate = useNavigate();

    function confirmMission(id, id_mission) {
        setIsMatching(true);

        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/webapi/mission/confirm/id`,
                { id, id_mission },
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
                            toast.success(`Gửi đơn hàng thành công!`, { theme: 'light' });
                        }, 3000);

                        setTimeout(() => {
                            window.location.reload();
                        }, 4000);
                    }
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }
    return (
        <div className="history-order">
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
            <div className="header-order flex justify-between border-b-2">
                <div
                    onClick={() => setType('all')}
                    className={cx('history-progress', { 'px-[10px] py-[15px] text-[16px] font-medium': true })}
                    style={{ color: `${type_mission === 'all' ? '#ff3c61' : '#C4A6A7'}` }}
                >
                    {t('content.history.tatCa')}
                </div>
                {/* <div
                    onClick={() => setType('pending_send')}
                    className={cx('history-progress', { 'px-[10px] py-[15px] text-[16px] font-medium': true })}
                    style={{ color: `${type_mission === 'pending_send' ? '#ff3c61' : '#C4A6A7'}` }}
                >
                    Chưa gửi
                </div> */}
                <div
                    onClick={() => setType('pending_accept')}
                    className={cx('history-progress', { 'px-[10px] py-[15px] text-[16px] font-medium': true })}
                    style={{ color: `${type_mission === 'pending_accept' ? '#ff3c61' : '#C4A6A7'}` }}
                >
                    Chờ duyệt
                </div>
                <div
                    onClick={() => setType('success')}
                    className={cx('history-progress', { 'px-[10px] py-[15px] text-[16px] font-medium': true })}
                    style={{ color: `${type_mission === 'success' ? '#ff3c61' : '#C4A6A7'}` }}
                >
                    Thành công
                </div>
            </div>
            <div className="content px-[12px] py-[17px]">
                <div className="list-items">
                    {mission.map((data, index) => {
                        return (
                            <div
                                key={index}
                                className="item-data relative p-[15px] mb-[15px]"
                                style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
                            >
                                {data.status !== 0 && (
                                    <img
                                        className="absolute w-[94px] h-[25px] right-[-4px] top-[-4px]"
                                        src={data.status === 2 ? successIcon : pendingIcon}
                                        alt=""
                                    />
                                )}

                                {/* <div className="by flex">
                                    <img className="w-[19px] h-[19px]" src={ebayIconGuiHang} alt="Central Group" />
                                    <span className="text-[#fff] text-xl ml-[5px]">
                                        {t('content.history.tuCentral')}
                                    </span>
                                </div> */}
                                <div className={cx('title', { 'text-[16px] py-[5px] font-semibold text-white': true })}>
                                    {data.name_mission}
                                </div>
                                <div className="box-content">
                                    <div className="flex">
                                        <img className="w-[83px] h-[83px] rounded-lg" src={data.image} alt="" />

                                        <div className="px-[15px] flex-1">
                                            <div className="info flex justify-between flex-col">
                                                <div className="">
                                                    <p className="text-[#fff] text-xl">
                                                        {t('content.history.giaTriDonHang')}
                                                    </p>
                                                    <p className="text-[#0dc253] font-bold text-3xl">
                                                        + {formatMoney(data.price)}đ
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[#fff] text-xl">
                                                        {t('content.history.loiNhuan')}
                                                    </p>
                                                    <p className="text-[#ffa900] font-bold text-3xl">
                                                        + {formatMoney(data.receive)}đ
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="id-order mt-[5px]">
                                                <p className="text-[#fff] text-xl my-[2px]">
                                                    {t('content.history.maDon')} {data.id_mission}
                                                </p>
                                            </div>
                                            <div className="text-[#fff] text-xl my-[2px]">
                                                {t('content.history.time')} {timerJoin2(data.time)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div
                                        className="flex cursor-pointer mt-4 bg-[#0dc253] w-[30%] px-4 py-2 items-center justify-center rounded-xl text-white"
                                        onClick={() => {
                                            setModalOne(true);
                                            setMissionSelected(data);
                                        }}
                                    >
                                        Xem chi tiết
                                    </div>
                                    {data.status === 0 && (
                                        <div
                                            className="flex cursor-pointer mt-4 bg-[#ff575c] w-[30%] px-4 py-2 items-center justify-center rounded-xl text-white"
                                            onClick={() => confirmMission(data.id, data.id_mission)}
                                        >
                                            {t('content.confirmOrder.guiDonHang')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
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
            <Modal isOpen={modalOne} toggle={toggleOne} centered>
                <ModalHeader toggle={toggleOne}>
                    <div className="flex items-center justify-center ">
                        <h2 className="text-center">{missionSelected?.name_mission}</h2>
                    </div>
                </ModalHeader>
                <ModalBody className="text-2xl">
                    <img src={missionSelected?.image} alt="product" className="m-auto" />
                    <p className="text-2xl font-bold bg-[#3e85ff] mt-3 p-3 rounded-xl text-white">Thông tin sản phẩm</p>
                    <div className="flex justify-between">
                        <p>Mã sản phẩm:</p>
                        <p>{missionSelected.id_mission}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Giá trị đơn hàng:</p>
                        <p>{formatMoney(missionSelected?.price)}đ</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Hoa hồng:</p>
                        <p>{formatMoney(missionSelected?.receive)}đ</p>
                    </div>
                    {missionSelected?.description && (
                        <div>
                            <p className="text-2xl font-bold bg-[#3e85ff] mt-3 p-3 rounded-xl text-white">Chi tiết</p>
                            <div dangerouslySetInnerHTML={{ __html: missionSelected?.description }}></div>
                        </div>
                    )}
                </ModalBody>
            </Modal>
        </div>
    );
}

export default History;
