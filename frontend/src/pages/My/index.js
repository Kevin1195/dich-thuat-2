import styles from './My.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bankAccount from '../../assets/images/bank-account.png';
import homeAddress from '../../assets/images/home-address.png';
import history from '../../assets/images/history.png';
import key from '../../assets/images/key.png';
import supportIcon from '../../assets/images/cskhicon.png';
import napNhanh from '../../assets/images/nap-tien.png';
import rutNhanh from '../../assets/images/rut-tien.png';
import lienketnganhang from '../../assets/images/lien-ket-ngan hang.png';
import oto from '../../assets/images/o-to.png';
import qr from '../../assets/images/qr-code-76.png';
import biendongsodu from '../../assets/images/lucky-money.png';
import baocaonhom from '../../assets/images/lich.png';
import thontincongty from '../../assets/images/thongtincongty.png';
import hosocongty from '../../assets/images/congty.png';
import motaquytac from '../../assets/images/motaquytac.png';
import hoptacdaily from '../../assets/images/hoptacdaily.png';
import avtIcon from '../../assets/images/avatar.png';
import lichsudonhang from '../../assets/images/lichsudonhang.png';
import batdausandonhang from '../../assets/images/batdausandonhang.png';
import nhomcuatoi from '../../assets/images/nhomcuatoi.png';
import lichsunaptien from '../../assets/images/lichsunaptien.png';
import lichsuruttien from '../../assets/images/lichsuruttien.png';
import chitietthuchi from '../../assets/images/chitietthuchi.png';
import matkhauvon from '../../assets/images/matkhauvon.png';
import capbachoivien from '../../assets/images/capbachoivien.png';
import diachinhanhang from '../../assets/images/diachinhanhang.png';
import tinnhantuhethong from '../../assets/images/tinnhantuhethong.png';
import dichvuchamsockh from '../../assets/images/dichvuchamsockh.png';
import ykienphanhoi from '../../assets/images/ykienphanhoi.png';
import thenganhang from '../../assets/images/thenganhang.png';
import mybg from '../../assets/images/my_bg.png';
import mybg2 from '../../assets/images/my-bg-2.png';
import bacDoan from '../../assets/images/tvbac.png';
import vangDoan from '../../assets/images/tvvang.png';
import bachKim from '../../assets/images/tvbachkim.jpg';
import kimCuong from '../../assets/images/tvKimcuong.jpg';
import iconNext from '../../assets/images/icon-next.png';
import vietnam from '../../assets/images/vietnam.png';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import './My.css';
import { AiOutlineDownload, AiOutlineCrown } from 'react-icons/ai';
import { RiFileList2Line, RiMoneyCnyCircleLine, RiBankCardLine } from 'react-icons/ri';
import { BsHandbag } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FaMoneyBillWave } from 'react-icons/fa';
import { BiDetail, BiSupport } from 'react-icons/bi';
import { MdPassword, MdOutlineEditLocationAlt, MdOutlineNotificationsActive } from 'react-icons/md';
import { FcFeedback } from 'react-icons/fc';
const axios = require('axios').default;

const cx = classNames.bind(styles);

const listChucNang = [
    { title: 'Liên kết ngân hàng', icon: lienketnganhang, link: '/my/banking' },
    { title: 'Địa chỉ nhận hàng', icon: oto, link: '/my/address' },
    { title: 'Quét mã QR', icon: qr, link: '/qr-code' },
    { title: 'Lịch sử đơn hàng', icon: lichsudonhang, link: '/order/index' },
    { title: 'Biến động số dư', icon: biendongsodu, link: '/my/history-recharge-withdraw' },
    // { title: 'Báo cáo nhóm', icon: baocaonhom, link: '' },
    { title: 'Thông tin công ty', icon: thontincongty, link: '/thong-tin-cong-ty' },
    { title: 'Hồ sơ công ty', icon: hosocongty, link: '/ho-so-cong-ty' },
    { title: 'Mô tả quy tắc', icon: motaquytac, link: '/mo-ta-quy-tac' },
    { title: 'Hợp tác đại lý', icon: hoptacdaily, link: '/hop-tac-dai-ly' },
];

function formatMoney(money = 0) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
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

function My() {
    let [user, setUser] = useState([]);
    let [mission, setMission] = useState([]);
    let [nameUserBank, setNameUserBank] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { t } = useTranslation();

    const [listMission, setListMission] = useState([
        {
            icon: bacDoan,
            rose: 0.5,
            content: `${t('content.my.bacDoan')}`,
            status: 1,
        },
        {
            icon: vangDoan,
            rose: 0.6,
            content: `${t('content.my.vangDoan')}`,
            status: 1,
        },
        {
            icon: bachKim,
            rose: 0.7,
            content: `${t('content.my.backKim')}`,
            status: 0,
        },
        {
            icon: kimCuong,
            rose: 0.8,
            content: `${t('content.my.kimCuong')}`,
            status: 0,
        },
    ]);

    const [myLevel, setmyLevel] = useState();

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
                    setUser(data.data[0]);

                    if (data.data[0].name_level === 'Thành Viên Bạc' || data.data[0].name_level === 'Thành viên mới')
                        setmyLevel(listMission[0]);
                    if (data.data[0].name_level === 'Thành Viên Vàng') setmyLevel(listMission[1]);
                    if (data.data[0].name_level === 'Thành Viên Bạch Kim') setmyLevel(listMission[2]);
                    if (data.data[0].name_level === 'Thành Viên Kim Cương') setmyLevel(listMission[3]);

                    setMission(data.mission);
                    if (data.userBank) {
                        setNameUserBank(data.userBank.name_u_bank);
                    } else setNameUserBank(data.data[0].username);
                }
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }, []);

    const changeLanguage = (e) => {
        const languageValue = e.target.value;
        // i18n.changeLanguage(languageValue);
    };

    return (
        <div className="account relative">
            <div className="withdraw px-[15px] py-[20px] min-h-[920px] bg-[#f2f2f2]">
                <div className="bg-header-my"></div>
                <div className="flex items-center justify-center">
                    <div className="my-header flex items-center justify-around py-2 w-[95%]">
                        <img src={avtIcon} alt="" className="w-[15%]" />
                        <div className="name-and-mamoi flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold">{nameUserBank}</span>
                            <span className="pt-2 text-lg">
                                {t('content.my.maMoi')} {user?.id_user}
                            </span>
                        </div>
                        <img src={myLevel?.icon} alt="" className="w-[25%] pb-[8px]" />

                        <div className="nap-rut flex flex-col items-center justify-center">
                            <Link
                                to="/recharge"
                                className="bg-[#F7D439] text-black text-xl w-[60px] text-center px-2 py-1 rounded-lg"
                            >
                                {t('content.my.napTien')}
                            </Link>
                            <Link
                                to="/withdraw"
                                className="bg-[#F7D439] text-black text-xl w-[60px] text-center px-2 py-1 rounded-lg mt-2"
                            >
                                {t('content.my.rutTien')}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="yh"></div>

                <div className="content-my">
                    <div className="bg-[#fff] py-4">
                        <span className="text-2xl font-bold pl-4">{t('content.my.lsDonHang')}</span>
                        <hr />
                        <div className="flex flex-wrap">
                            <Link to="/order/index" className="flex items-center justify-center w-[50%] text-black">
                                <img src={lichsudonhang} alt="" className="w-[24px] h-[24px]" />
                                {/* <RiFileList2Line color="blue" size={25} /> */}
                                <span className="text-lg font-bold pl-2">{t('content.my.lsSanDonHang')}</span>
                            </Link>

                            <Link to="/order/mission" className="flex items-center justify-center w-[50%] text-black">
                                <img src={batdausandonhang} alt="" className="w-[24px] h-[24px]" />
                                {/* <BsHandbag size={20} color="blue" /> */}
                                <span className="text-lg font-bold pl-2">{t('content.my.batDauSanDonHang')}</span>
                            </Link>

                            {/* <Link to="/my/members" className="flex items-center justify-center w-[50%] text-black mt-4">
                                <img src={nhomcuatoi} alt="" className="w-[24px] h-[24px]" />
                                <span className="text-lg font-bold pl-2">{t('content.my.nhomCuaToi')}</span>
                            </Link> */}
                        </div>
                    </div>

                    <div className="bg-[#fff] mt-4">
                        <div className="pt-4">
                            <span className="text-2xl font-bold pl-4">
                                {t('content.my.soDuTK')} {formatter.format(user.money)}
                            </span>
                        </div>
                        <hr />
                        <div className="flex flex-wrap">
                            <Link
                                to="/my/history-recharge-withdraw"
                                className="flex flex-col py-2 items-center justify-center w-[50%] text-black"
                            >
                                <img src={lichsunaptien} alt="" className="w-[24px] h-[24px]" />
                                {/* <RiMoneyCnyCircleLine color="blue" size="25" /> */}
                                <span className="text-lg font-bold pl-2 pt-2">{t('content.my.lsNapTien')}</span>
                            </Link>

                            <Link
                                to="/my/history-recharge-withdraw"
                                className="flex flex-col py-2 items-center justify-center w-[50%] text-black"
                            >
                                <img src={lichsuruttien} alt="" className="w-[24px] h-[24px]" />
                                {/* <FaMoneyBillWave color="blue" size={25} /> */}
                                <span className="text-lg font-bold pl-2 pt-2">{t('content.my.lsRutTien')}</span>
                            </Link>

                            <Link
                                to="/my/history-recharge-withdraw"
                                className="flex flex-col py-2 items-center justify-center w-[50%] text-black pt-4"
                            >
                                <img src={chitietthuchi} alt="" className="w-[24px] h-[24px]" />
                                {/* <BiDetail color="blue" size="25" /> */}
                                <span className="text-lg font-bold pl-2 pt-2">{t('content.my.chiTietThuChi')}</span>
                            </Link>

                            <Link
                                to="/my/edit-password-transaction"
                                className="flex flex-col py-2 items-center justify-center w-[50%] pt-4 text-black"
                            >
                                <img src={matkhauvon} alt="" className="w-[24px] h-[24px]" />
                                {/* <MdPassword color="blue" size={25} /> */}
                                <span className="text-lg font-bold pl-2 pt-2">{t('content.my.mkVon')}</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-[#fff] mt-4 ">
                        <div className="pt-4">
                            <span className="text-2xl font-bold pl-4">{t('content.my.ttCaNhan')}</span>
                        </div>
                        <hr />
                        <div className="flex flex-wrap">
                            <Link
                                to="/my/banking"
                                className="flex flex-col py-2 items-center justify-center w-[50%] text-black"
                            >
                                <img src={thenganhang} alt="" className="w-[24px] h-[24px]" />
                                {/* <RiBankCardLine color="blue" size={25} /> */}
                                <span className="text-lg font-bold pl-2 pt-2">{t('content.my.theNganHang')}</span>
                            </Link>

                            {/* <Link
                                to="/my/nang-cap-hoi-vien"
                                className="flex flex-col py-2 items-center justify-center w-[50%] text-black"
                            >
                                <img src={capbachoivien} alt="" className="w-[24px] h-[24px]" />
                                <span className="text-lg font-bold pl-2 pt-2">{t('content.my.capBac')}</span>
                            </Link> */}

                            {/* <Link
                                to="/my/address"
                                className="flex flex-col py-2 items-center justify-center w-[50%] pt-4 text-black"
                            >
                                <img src={diachinhanhang} alt="" className="w-[24px] h-[24px]" />
                                <span className="text-lg font-bold pl-2 pt-2">{t('content.my.diaChiNhanHang')}</span>
                            </Link> */}

                            <Link
                                to="/my/mail"
                                className="flex flex-col py-2 items-center justify-center w-[50%] pt-4 text-black"
                            >
                                <img src={tinnhantuhethong} alt="" className="w-[24px] h-[24px]" />
                                {/* <MdOutlineNotificationsActive color="blue" size={25} /> */}
                                <span className="text-lg font-bold pl-2 pt-2">{t('content.my.tinNhanHeThong')}</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-[#fff] mt-4 pb-4">
                        <div className="pt-4">
                            <span className="text-2xl font-bold pl-4">{t('content.my.lhCSKH')}</span>
                        </div>
                        <hr />
                        <div className="flex flex-wrap">
                            <Link
                                to="https://support.biendich68.com"
                                className="flex items-center justify-center w-[50%] text-black"
                            >
                                <img src={dichvuchamsockh} alt="" className="w-[24px] h-[24px]" />
                                {/* <BiSupport color="blue" size={25} /> */}
                                <span className="text-lg font-bold pl-2 text-center">
                                    {t('content.my.dvcs')} <br /> {t('content.my.kh')}
                                </span>
                            </Link>

                            <Link to="/my/y-kien" className="flex items-center justify-center w-[50%] text-black">
                                <img src={ykienphanhoi} alt="" className="w-[24px] h-[24px]" />
                                {/* <FcFeedback color="blue" size={25} /> */}
                                <span className="text-lg font-bold pl-2">{t('content.my.yKienPH')}</span>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-[#fff] mt-4">
                        <div className="py-4 flex items-center justify-between">
                            <Link to="/my/edit-password" className="text-2xl font-bold pl-4 text-black">
                                {t('content.my.mkLogin')}
                            </Link>
                            <div
                                className="flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                    localStorage.removeItem('auth');
                                    window.location.href = '/account/login';
                                }}
                            >
                                <span className="text-2xl font-bold pl-4">{t('content.my.dangXuat')}</span>
                                <img src={iconNext} alt="" className="w-[20px] h-[20px]" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#fff] mt-4">
                        <div className="py-4 flex items-center justify-between">
                            <span className="text-2xl font-bold pl-4">{t('content.my.khuVuc')}</span>
                            <div className="flex items-center justify-center">
                                <select onChange={changeLanguage} className="text-2xl font-bold pl-4">
                                    <option value="vi">Việt Nam</option>
                                    <option value="en">English</option>
                                    <option value="jp">Nhật Bản</option>
                                    <option value="ko">Hàn Quốc</option>
                                </select>
                                {/* <img src={vietnam} alt="" className="w-[34px] h-[22px]" /> */}
                                <img src={iconNext} alt="" className="w-[20px] h-[20px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* {user && (
                <div className={cx('account-header')}>
                    <div className="flex items-center justify-center w-24">
                        <img src={avtIcon} alt="Avatar" />
                    </div>
                    <div
                        className={`${cx(
                            'account-username',
                        )} flex flex-col items-center justify-center text-white font-bold text-3xl`}
                    >
                        {nameUserBank}
                        <span className="text-xl mt-4">Mã mời: {user.id_user}</span>
                    </div>
                    <div className={`${cx('account-level')} text-xl flex flex-col items-center justify-center`}>
                        {user.name_level}
                        <div className={cx('account-id')}>
                            <span className={`${cx('accout-id-number')} mt-4`}>{user.username}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="zc-user flex flex-col h-64 rounded-3xl">
                <span className="text-white text-3xl font-bold px-8 pt-3">Số dư tài khoản</span>
                <span className="text-white text-5xl font-bold px-8 py-3">$ {Number(user.money).toFixed(2) || 0}</span>
                <div className="imlist pt-1">
                    <Link to="/recharge" className="listub">
                        <div className="button button-recharge w-48 h-24 flex flex-col items-center justify-center">
                            <img src={napNhanh} alt="Nạp nhanh" className="w-12" />
                            <span className="text-2xl  text-white text-center">Nạp tiền</span>
                        </div>
                    </Link>
                    <Link to="/withdraw" className="listub">
                        <div className="button button-withdraw w-48 h-24 flex flex-col items-center justify-center">
                            <img src={rutNhanh} alt="Rút nhanh" className="w-12" />
                            <span className="text-2xl  text-white text-center">Rút tiền</span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className={cx('session')}>
                {listChucNang.map((item, i) => {
                    return (
                        <Link to={item.link} className={cx('session-item')} key={i}>
                            <div className={cx('session-icon')}>
                                <img src={item.icon} className={`${cx('session-icon-item')}`} alt="Icon" />
                            </div>
                            <div className={`${cx('session-desc')} font-bold`}>{item.title}</div>
                        </Link>
                    );
                })}
            </div>

            <button
                className={cx('account-footer')}
                onClick={() => {
                    localStorage.removeItem('auth');
                    window.location.href = '/account/login';
                }}
            >
                <div className={cx('footer-desc')}>Đăng xuất</div>
            </button> */}
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

export default My;
