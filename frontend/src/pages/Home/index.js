import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Slider from '../../components/Slider';
import { Link } from 'react-router-dom';
import ListHome from './ListHome';
import { useEffect, useState, useRef } from 'react';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import avtIcon from '../../assets/images/avatar.png';
import viLoiNhuan from '../../assets/images/vi-loi-nhuan.png';
import napNhanh from '../../assets/images/naptien.png';
import rutNhanh from '../../assets/images/rut-nhanh.png';
import hopQua from '../../assets/images/vong-quay-may-man.png';
import crocs from '../../assets/images/new/1.CROCS.PNG';
import supersport from '../../assets/images/new/2.SUPPERSPORTS.png';
import fila from '../../assets/images/new/3.FILA.jpg';
import skechers from '../../assets/images/new/4.SKECHERS.jpeg';
import columbia from '../../assets/images/new/5.COLUMBIA.jpeg';
import dyson from '../../assets/images/new/6.DYSON.jpg';

import congchung from '../../assets/images/new/congchung.jpg';
import locknlocklv2 from '../../assets/images/new/LOCKNLOCKLV2.jpg';
import shiseido from '../../assets/images/new/SHISEIDO.jpg';
import thebodyshop from '../../assets/images/new/TheBodyShop.jpg';
import doji from '../../assets/images/new/DOJI.jpg';
import locknlocklv6 from '../../assets/images/new/LocknLocklv6.jpg';

import UNIQLO from '../../assets/images/new/LV1 TÊN ( UNIQLO ).webp';
import ABCMART from '../../assets/images/new/LV2 TÊN ( ABCMART ).webp';
import CARTERSVN from '../../assets/images/new/LV3 TÊN ( Cartersvn ).webp';
import VIINRIICGALERIES from '../../assets/images/new/LV4 TÊN ( ViinRiicGaleries ).webp';
import VALENTINO from '../../assets/images/new/LV5 ( VALENTINO ).webp';
import GLAMOURISTA from '../../assets/images/new/LV6 ( GLAMOURISTA ).webp';

import khoa from '../../assets/images/khoa.png';
import vechungta from '../../assets/images/vechungta.png';
import mota from '../../assets/images/mota.png';
import taichinh from '../../assets/images/taichinh.png';
import vanhoadoanhnghiep from '../../assets/images/vanhoadoanhnghiep.png';
import dieukien from '../../assets/images/dieukien.png';
import mauthuthap from '../../assets/images/mauthuthap.png';
import phanchianhom from '../../assets/images/phanchianhom.png';
import chinhsachcanhan from '../../assets/images/chinhsachcanhan.png';
import { useTranslation } from 'react-i18next';

const axios = require('axios').default;

const cx = classNames.bind(styles);

function formatMoney(money = 0) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
});

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

function Home(args) {
    let [user, setUser] = useState({
        data: [{ money: 0, dongbangtk: 0 }],
        moneyEarn: { moneyEarnToday: 0, moneyEarnPreDay: 0 },
    });

    const [modalOne, setModalOne] = useState(true);

    const toggleOne = () => setModalOne(!modalOne);
    const { t } = useTranslation();
    const [listMission, setListMission] = useState([
        {
            title: 'UNIQLO',
            icon: UNIQLO,
            rose: 20,
            content: 2,
            status: 0,
        },
        {
            title: 'ABCMART',
            icon: ABCMART,
            rose: 25,
            content: 3,
            status: 0,
        },
        {
            title: 'CARTERSVN',
            icon: CARTERSVN,
            rose: 30,
            content: 5,
            status: 0,
        },
        {
            title: 'VIINRIICGALERIES',
            icon: VIINRIICGALERIES,
            rose: 35,
            content: 7,
            status: 0,
        },
        {
            title: 'VALENTINO',
            icon: VALENTINO,
            rose: 30,
            content: 8,
            status: 0,
        },
        {
            title: 'GLAMOURISTA',
            icon: GLAMOURISTA,
            rose: 30,
            content: 10,
            status: 0,
        },
    ]);

    const [gioithieu, setgioithieu] = useState([
        {
            image: vechungta,
            link: '/ve-chung-toi',
        },
        {
            image: mota,
            link: '/mo-ta-thanh-vien',
        },
        {
            image: taichinh,
            link: '/nguyen-tac-tai-chinh',
        },
        {
            image: vanhoadoanhnghiep,
            link: '/van-hoa-cong-ty',
        },
        {
            image: dieukien,
            link: '/dieu-khoan-su-dung',
        },
        {
            image: mauthuthap,
            link: '/mo-phong-doanh-thu',
        },
        {
            image: phanchianhom,
            link: '/phan-phoi-doi',
        },
        {
            image: chinhsachcanhan,
            link: '/chinh-sach-bao-mat',
        },
    ]);

    const [isHopQua, setIsHopQua] = useState(false);

    const modalRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalOne(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);

    const clickKhongDuocQuay = () => {
        toast.error(`${t('content.home.chuaCoLuotQuay')}`, { theme: 'light' });
    };

    const chucNangDangPT = () => {
        toast.error(`${t('content.home.dangPhatTrien')}`, { theme: 'light' });
    };

    useEffect(() => {
        checkToken();
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/user-lucky`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.status === 'ok') {
                    if (data.data[0].may_man && data.data[0].may_man !== '0' && data.data[0].da_quay_may_man === 0) {
                        setIsHopQua(true);
                    } else if (
                        data.data[0].may_man === '0' ||
                        !data.data[0].may_man ||
                        data.data[0].da_quay_may_man === 1
                    ) {
                        setIsHopQua(false);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
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
                    const updateStatus = (name_level) => {
                        let updatedList = [];
                        switch (name_level) {
                            case 'UNIQLO':
                                updatedList = listMission.map((mission) =>
                                    mission.title === name_level
                                        ? { ...mission, status: 1 }
                                        : { ...mission, status: 0 },
                                );
                                break;
                            case 'ABCMART':
                                updatedList = listMission.map((mission) =>
                                    ['UNIQLO', 'ABCMART'].includes(mission.title)
                                        ? { ...mission, status: 1 }
                                        : { ...mission, status: 0 },
                                );
                                break;
                            case 'CARTERSVN':
                                updatedList = listMission.map((mission) =>
                                    ['UNIQLO', 'ABCMART', 'CARTERSVN'].includes(mission.title)
                                        ? { ...mission, status: 1 }
                                        : { ...mission, status: 0 },
                                );
                                break;
                            case 'VIINRIICGALERIES':
                                // updatedList = listMission.map((mission) => ({ ...mission, status: 1 }));
                                updatedList = listMission.map((mission) =>
                                    ['UNIQLO', 'ABCMART', 'CARTERSVN', 'VIINRIICGALERIES'].includes(mission.title)
                                        ? { ...mission, status: 1 }
                                        : { ...mission, status: 0 },
                                );
                                break;
                            case 'VALENTINO':
                                // updatedList = listMission.map((mission) => ({ ...mission, status: 1 }));
                                updatedList = listMission.map((mission) =>
                                    ['UNIQLO', 'ABCMART', 'CARTERSVN', 'VIINRIICGALERIES', 'VALENTINO'].includes(
                                        mission.title,
                                    )
                                        ? { ...mission, status: 1 }
                                        : { ...mission, status: 0 },
                                );
                                break;
                            case 'GLAMOURISTA':
                                updatedList = listMission.map((mission) => ({ ...mission, status: 1 }));
                                break;
                            default:
                                updatedList = listMission;
                        }
                        setListMission(updatedList);
                    };

                    updateStatus(data.data[0].name_level);
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }, []);

    return (
        <div id="Home">
            <div className="top-header-content">
                <div className="lt-header-content">
                    <div className="text-5xl text-black font-bold pb-3">Dịch thuật</div>
                    <span className="text-lg text-black">
                        Đa chuyên ngành, hỗ trợ 24/7, đội ngũ nhân viên nhiều năm kinh nghiệm
                    </span>
                </div>
                <div className="title-name-user text-2xl">
                    <div className="name-user-home font-bold">{user.userBank?.name_u_bank}</div>
                    <div className="name-user-home font-bold pb-6">{user.userBank?.username}</div>
                    <div
                        className="money-total"
                        style={{ backgroundColor: '#ff5f3e', borderRadius: '10px', padding: '0px 10px' }}
                    >
                        {formatMoney(Number(user.data[0].money))} đ
                    </div>
                </div>
                <div className="rt-header-content">
                    <img src={avtIcon} alt="" />
                </div>
            </div>

            <section>
                <Slider />
            </section>

            <div className="imlist mt-2">
                {isHopQua ? (
                    <Link to="/vong-quay-may-man" className="listub w-[72px] pt-[16px]">
                        <img src={hopQua} alt="Hộp quà may mắn" className="w-24" />
                        <span className="text-xl mt-3 text-black text-center">{t('content.home.vongQuayMayMan')}</span>
                    </Link>
                ) : (
                    <div className="listub w-[72px] pt-[16px]" onClick={clickKhongDuocQuay}>
                        <img src={hopQua} alt="Hộp quà may mắn" className="w-24" />
                        <span className="text-xl mt-3 text-black text-center">{t('content.home.vongQuayMayMan')}</span>
                    </div>
                )}

                <div className="listub" onClick={chucNangDangPT}>
                    <img src={viLoiNhuan} alt={t('content.home.viLoiNhuan')} className="w-24" />
                    <span className="text-xl mt-3 text-black text-center">{t('content.home.viLoiNhuan')}</span>
                </div>

                <Link to="/recharge" className="listub">
                    <img src={napNhanh} alt="Nạp nhanh" className="w-24" />
                    <span className="text-xl mt-3 text-black text-center">{t('content.home.napNhanh')} </span>
                </Link>

                <Link to="/withdraw" className="listub">
                    <img src={rutNhanh} alt="Rút nhanh" className="w-24" />
                    <span className="text-xl mt-3 text-black text-center">{t('content.home.rutNhanh')} </span>
                </Link>
            </div>

            <h2 className="text-3xl mt-16 text-black font-bold">Hệ thống đối tác</h2>
            <div className="goodcats">
                {listMission.map((item, i) => {
                    return (
                        <div className="cats" key={i}>
                            <div className="z-10">
                                <h4 className="text-center text-[#2391f4] text-2xl font-bold mt-2">{item.title}</h4>
                            </div>

                            {item.status === 1 ? (
                                <Link
                                    to="/order/mission"
                                    className="central-group-img z-10 w-[90%] h-[100%]"
                                    style={{ height: '105px' }}
                                >
                                    <img src={item.icon} alt="" className="m-auto h-[100%]" width={'200px'} />
                                </Link>
                            ) : (
                                <div
                                    className="central-group-img z-10 w-[90%] h-[100%]  relative "
                                    style={{ height: '105px' }}
                                >
                                    <img src={item.icon} alt="" width={'200px'} className="h-[100%]" />
                                    <div className="bg-khoa w-[100%] h-[100%] flex flex-col items-center justify-center">
                                        <img src={khoa} alt="" />
                                        <span className="text-white text-2xl font-bold">
                                            {t('content.home.choNangCap')}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-row items-center gap-2">
                                <p
                                    className="text-xl font-bold bg-[#2391f4] mt-3  mb-0 ml-[-4px] text-white"
                                    style={{
                                        padding: '10px 5px 10px 5px',
                                        borderRadius: '0px 50px 50px 10px',
                                    }}
                                >
                                    {t('content.home.hoaHong')}
                                    {item.rose}%
                                </p>
                                <p className="text-xl mt-4 ">{item.content} đơn dịch</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="ve-chung-ta flex flex-wrap pt-2">
                {gioithieu.map((item, i) => {
                    return (
                        <Link key={i} to={item.link} className="w-[25%] pl-2 pt-3 cursor-pointer">
                            <img src={item.image} alt="" key={i} />
                        </Link>
                    );
                })}
            </div>

            <div className="rounded-[.16rem] my-4">
                <div className="thu-thap-dai-ly">
                    <span>Thu nhập từ dịch thuật</span>
                    <span>{t('content.home.them')}</span>
                </div>
                <div className="">
                    <ListHome amount={5} />
                </div>
            </div>

            {modalOne && (
                <div className="bg-modal-home">
                    <div className="flex items-center justify-center w-[100%] h-[100%]">
                        <div className="modal-home-style" ref={modalRef}>
                            <span>{t('content.home.kinhChao')}</span>
                            <br />
                            <br />
                            <span className="leading-10">
                                <span style={{ color: '#3498db' }}>{t('content.home.nangCapDocQuyen')}</span>
                                {t('content.home.nangCapDocQuyen1')}
                            </span>
                            <br />
                            <br />
                            <span className="leading-10">
                                <span style={{ color: '#3498db' }}>{t('content.home.loiIchKhiMoi')}</span>{' '}
                                {t('content.home.loiIch1')}
                            </span>
                            <br />
                            <br />
                            <span className="leading-10">
                                <span style={{ color: '#3498db' }}>{t('content.home.nhacNho')}</span>{' '}
                                {t('content.home.loiIch2')}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* <div className="bg-modal-home">
                <Modal isOpen={modalOne} toggle={toggleOne} {...args} centered>
                    <div className="modal-home-style">
                        <ModalHeader toggle={toggleOne}>
                            <div className="image-title flex items-center justify-center pl-[30%]">
                                <img src={modalTitleLeft} alt="" className="w-[35px] h-[15px]" />
                                <img src={thongbaodacbiet} alt="" className="w-[177px] h-[30px] px-4" />
                                <img src={modalTitleRight} alt="" className="w-[35px] h-[15px]" />
                            </div>
                        </ModalHeader>
                        <ModalBody className="text-2xl">
                            <span>{t('content.home.kinhChao')}</span>
                            <br />
                            <br />
                            <span className="leading-10">
                                <span style={{ color: '#3498db' }}>{t('content.home.nangCapDocQuyen')}</span>
                                {t('content.home.nangCapDocQuyen1')}
                            </span>
                            <br />
                            <br />
                            <span className="leading-10">
                                <span style={{ color: '#3498db' }}>{t('content.home.loiIchKhiMoi')}</span>{' '}
                                {t('content.home.loiIch1')}
                            </span>
                            <br />
                            <br />
                            <span className="leading-10">
                                <span style={{ color: '#3498db' }}>{t('content.home.nhacNho')}</span>{' '}
                                {t('content.home.loiIch2')}
                            </span>
                        </ModalBody>
                    </div>
                </Modal>
            </div> */}

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

export default Home;
