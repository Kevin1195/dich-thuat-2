import Header from '../../components/Layout/components/Header';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleCheck, faMagnifyingGlass, faX, faXmark, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import ProductBox from './ProductBox';
import { useEffect, useRef, useState } from 'react';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faBuffer } from '@fortawesome/free-brands-svg-icons';
import cocoShop from '../../assets/images/logo.png';
import banner3 from '../../assets/images/donquijote-shibuya.jpg';
import bacDoan from '../../assets/images/tvbac.png';
import vangDoan from '../../assets/images/tvvang.png';
import bachKim from '../../assets/images/tvbachkim.jpg';
import kimCuong from '../../assets/images/tvKimcuong.jpg';
import centralOrder from '../../assets/images/anhnhandon.png';
import ListHome from '../Home/ListHome';
import startOrder from '../../assets/images/new/start.png';
import { useTranslation } from 'react-i18next';
import './Order.css';

import audio from '../../assets/audio/hongbao.mp3';
const axios = require('axios').default;

const cx = classNames.bind(styles);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatMoney(money = 0) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
});

const normalFormatter = new Intl.NumberFormat();

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

function Order() {
    const { id_mission } = useParams();

    let [box, setBox] = useState(false);
    let [update, setUpdate] = useState(false);
    let [go1, setGo1] = useState(false);
    let [go2, setGo2] = useState(false);
    let [width, setWidth] = useState(0);
    let [myMission, setMyMission] = useState([{}]);

    const { t } = useTranslation();

    // const [isDisableButton, setIsDisableButton] = useState(true);

    // const currentTime = new Date().getHours();

    // useEffect(() => {
    //     if (currentTime >= 9 && currentTime <= 22) {
    //         setIsDisableButton(false);
    //     }
    // }, [currentTime]);

    const [listMission, setListMission] = useState([
        {
            icon: bacDoan,
            rose: 20,
            content: '2 đơn hàng',
            status: 1,
        },
        {
            icon: vangDoan,
            rose: 25,
            content: '3 đơn hàng',
            status: 1,
        },
        {
            icon: bachKim,
            rose: 30,
            content: '5 đơn hàng',
            status: 0,
        },
        {
            icon: kimCuong,
            rose: 35,
            content: '7 đơn hàng',
            status: 0,
        },
        {
            icon: kimCuong,
            rose: 30,
            content: '8 đơn hàng',
            status: 0,
        },
        {
            icon: kimCuong,
            rose: 30,
            content: '10 đơn hàng',
            status: 0,
        },
    ]);

    const [myLevel, setmyLevel] = useState();

    const [progress, setProgress] = useState(0);
    const [user, setUser] = useState({
        data: [{ money: 0, dongbangtk: 0, roses: 0 }],
        moneyEarn: { moneyEarnPreDay: 0, moneyEarnToday: 0 },
        mission: {
            amount: 0,
            result: 0,
            amountToday: 0,
        },
    });

    const navigate = useNavigate();

    const [isMatching, setIsMatching] = useState(false);

    const mucVonDauTu = [
        { title: 'Thành Viên Bạc', von: 100, loi_nhuan: 0.5 },
        { title: 'Thành Viên Vàng', von: 1000, loi_nhuan: 0.6 },
        { title: 'Thành Viên Bạch Kim', von: 3000, loi_nhuan: 0.7 },
        { title: 'Thành Viên Kim Cương', von: 5000, loi_nhuan: 0.8 },
    ];

    const playAudio = () => {
        new Audio(audio).play();
    };

    const handAnimateMission = async () => {
        await sleep(100);
        setWidth(10);
        await sleep(200);
        setWidth(30);
        await sleep(200);
        setWidth(80);
        await sleep(200);
        setWidth(100);
        await sleep(200);
        setGo1(true);
        await sleep(100);
        setGo2(true);
        await sleep(100);
        handSendMission();
    };

    const handSendMission = async () => {
        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/webapi/mission/new`,
                { level: id_mission },
                {
                    headers,
                },
            )
            .then(async function (response) {
                let data = response.data;
                if (data.status === 'ok') {
                    setBox(false);
                    setGo1(false);
                    setGo2(false);
                    setWidth(0);
                    setIsMatching(false);
                    if (data.data.type === 1) {
                        toast.success(`${t('content.order.timThay1DonHang')}`, { theme: 'light' });
                        await sleep(1000);
                        setTimeout(() => {
                            navigate(`/order/index`);
                        }, 1000);
                        return;
                    }
                    if (data.data.type === 2) {
                        toast.warn(`Hiện tại hệ thống chưa có đơn hàng phân phối, vui lòng thử lại sau!`, {
                            theme: 'light',
                        });
                        return;
                    }
                    if (data.data.type === 3) {
                        toast.warn(`${t('content.order.tkBiKhoa')}`, { theme: 'light' });
                        return;
                    }
                    if (data.data.type === 1000) {
                        toast.success(`${t('content.order.daHTDuDon')}`, { theme: 'light' });
                        return;
                    }
                    if (data.data.type === 1001) {
                        toast.warn(`Bạn có đơn chưa hoàn thành`, { theme: 'light' });
                        return;
                    }
                }
            })
            .catch(function (error) {
                setIsMatching(false);
                if (error.response.status === 403) return toast.warn(error.response.data, { theme: 'light' });
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    };

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
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (progress < 100) {
                setProgress(progress + 1);
            }
        }, 30);

        return () => clearInterval(intervalId);
    }, [progress]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

   
    return (
        <div className="main-container">
            {isMatching && (
                <div className="matching-animation">
                    <div className="overlay">
                        <div className="text flex">{t('content.order.khopTuDong')}</div>
                        <div className="loader loader1"></div>
                        <div className="loader loader2"></div>
                        <div className="loader loader3"></div>
                    </div>
                </div>
            )}
            <div className="task_hall_sheet">
                <div className="task_hall_sheet_box w-[100%] bg-[#f5f5f5] mt-24 rounded-3xl relative flex flex-col items-center justify-center">
                    {/* <div className="flex justify-evenly mt-3 w-[100%]">
                            <div className="hoa-hong  text-lg font-bold bg-[#2690f3] p-3 rounded-lg text-white">
                                {t('content.order.hoaHong')} {myLevel.rose}%
                            </div>
                            <div className="content-mylevel  pl-4 text-lg font-bold bg-[#2690f3] p-3 rounded-lg text-white">
                                {myLevel.content}
                            </div>
                        </div> */}
                    <img src={centralOrder} alt="" className="w-[90%] pt-3" />
                    <ListHome amount={1} type="order" />
                    <img
                        src={startOrder}
                        alt=""
                        className="w-[50%] cursor-pointer"
                        onClick={() => {
                            // if (isDisableButton) {
                            //     toast.warn(`${t('content.order.timeLayDonHang')}`, { theme: 'light' });
                            //     return;
                            // } else {
                            setIsMatching(true);
                            handAnimateMission();
                            // }
                        }}
                    />
                </div>
            </div>
            <div className="text-3xl font-bold text-center py-4 text-[#434343]">
                {t('content.order.thanhQuaHomNay')}
            </div>
            <div className="bg-[#f5f5f5] rounded-xl">
                <div className="ant-row ant-row-space-between">
                    <div className="ant-col">
                        <div className="sc-ikJyIC gNkWet">
                            <div className="sc-jJoQJp hzrkvO text-black text-xl">{t('content.order.soDuTK')}</div>
                            <div className="sc-hiCibw iYoREV text-[#fc0303] text-3xl py-2">
                                {formatMoney(Number(user?.data[0].money))} đ
                            </div>
                            <div className="sc-jJoQJp hzrkvO text-black text-xl pt-8">
                                {t('content.order.hoaHongHomNay')}
                            </div>
                            <div className="sc-hiCibw iYoREV text-[#fc0303] text-3xl py-2">
                                {formatMoney(Number(user?.moneyEarn.moneyEarnToday))} đ
                            </div>
                        </div>
                    </div>

                    <div className="ant-col">
                        <div className="sc-ikJyIC gNkWet">
                            <div className="sc-jJoQJp hzrkvO text-black text-xl">
                                {t('content.order.soDonHoanThanh')}
                            </div>
                            <div className="sc-hiCibw iYoREV text-[#fc0303] text-3xl py-2">
                                {user?.mission?.amountToday}
                            </div>
                            <div className="sc-jJoQJp hzrkvO text-black text-xl pt-8">
                                {t('content.order.soTienDongBang')}
                            </div>
                            <div className="sc-hiCibw iYoREV text-[#fc0303] text-3xl py-2">
                                {formatMoney(Number(user?.data[0].dongbangtk))} đ
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="luu-y-order bg-[#f5f5f5] mt-8 flex flex-col items-center justify-center rounded-xl">
                <br />
                <span className="bg-[#2f3848] px-4 py-2 rounded-xl text-[#f2d8be] text-xl w-[30%] flex items-center justify-center mb-4">
                    {t('content.order.giaiMa')}
                </span>
            </div>
            <div className="relative bg-[#f5f5f5] mt-8 flex flex-col items-center justify-center rounded-xl">
                <div className="huong-dan py-2 px-4 rounded-xl">
                    <span className="text-white text-xl text-center">Mô tả</span>
                </div>
                <div className="content-huong-dan py-4 px-4">
                    <span className="text-black text-xl px-4 pb-2 text-center leading-10">
                        1. Mỗi tài khoản có thể được phân bổ ngẫu nhiên đơn đặt hàng mỗi ngày.
                    </span>
                    <br />
                    <span className="text-black text-xl px-4 pb-2 text-center leading-10">
                        2. Lợi nhuận mỗi đơn đặt hàng cao nhất là 50% số tiền đặt hàng.
                    </span>
                    <br />
                    <span className="text-black text-xl px-4 pb-2 text-center leading-10">
                        3. Hệ thống dựa trên công nghệ LBS và tự động duyệt các sản phẩm thông qua đám mây.
                    </span>
                    <br />
                    <span className="text-black text-xl px-4 pb-2 text-center leading-10">
                        4. Để ngăn chặn sự giám sát của nền tảng,nếu đơn hàng không được xác nhận và gửi trong vòng 120
                        phút, hệ thống sẽ đóng băng số tiền đơn hàng.
                    </span>
                </div>
                <span className="text-black text-xl px-4 pb-2 text-center leading-10">
                    <strong>Lưu ý: </strong>
                    Khi nền tảng duyệt đơn đặt hàng,nền tảng này sẽ gửi thông tin của đơn hàng đến trung tâm thương mại.
                    Nếu người tiêu dùng không gửi đơn hàng trong vòng 120 phút, số tiền đơn hàng sẽ bị hệ thống đóng
                    băng. Để lách hệ thống giám sát, tài khoản tiêu người dùng sẽ bị trừ điểm, ảnh hưởng trực tiếp đến
                    thời gian và đơn hàng của lần tiếp theo của người tiêu dùng.
                </span>
            </div>
            {/* <div className="sc-AjmGg kRrDOZ">
                <div className="sc-hUpaCq fvrbNa">
                    <img src={banner3} alt="Banner" />
                </div>
                <div className="textAnimate">
                    <FontAwesomeIcon className="fa-arrow-left" icon={faBullhorn} />
                    <div className="wrapper">
                        <p className="target">
                            Thông báo tới khách hàng: Hệ thống đang có chương trình khuyến mại dành cho cặp đôi và hội
                            viên sẽ được nhận thưởng ngay trong lần nạp đầu tiên, kèm theo những chương trình khuyến mại
                            nâng cấp bậc thành viên. Khách hàng nạp tiền để nâng cấp bậc sẽ nhận được tiền thưởng theo
                            mỗi cấp bậc, cùng với các đơn thưởng ngẫu nhiên từ hệ thống. Chi tiết vui lòng liên hệ bộ
                            phận chăm sóc khách hàng để được hỗ trợ tư vấn.!
                        </p>
                    </div>
                </div>
                <div
                    className="search-order"
                    onClick={() => {
                        if (myMission.type === 2) {
                            setBox(true);
                            handAnimateMission();
                        } else {
                            setUpdate(true);
                        }
                    }}
                >
                    {!box ? (
                        <button type="button" className="ant-btn ant-btn-primary ant-btn-lg sc-lcepkR hJmUWK">
                            <span className="text-white">Bắt đầu nhận đơn hàng</span>{' '}
                        </button>
                    ) : (
                        <div
                            className="ant-btn ant-btn-primary ant-btn-lg sc-lcepkR hJmUWK progress-bar-div"
                            style={{ backgroundColor: '#373b38' }}
                        >
                            <button type="button" disabled>
                                <div>
                                    <span style={{ opacity: '1' }} className="text-white">
                                        Đang nhận đơn hàng...
                                    </span>
                                </div>
                            </button>
                            <div className="progress-bar">
                                <div className="progress-bar-text">{`${progress}%`}</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="ant-row ant-row-space-between">
                    <div className="ant-col">
                        <div className="sc-ikJyIC gNkWet">
                            <div className="sc-jJoQJp hzrkvO text-white text-xl font-bold">Số dư tài khoản</div>
                            <div className="sc-hiCibw iYoREV text-white text-xl py-2">
                                {formatter.format(user?.data[0].money)}
                            </div>
                            <div className="sc-jJoQJp hzrkvO text-white text-xl font-bold">Thu nhập hôm nay</div>
                            <div className="sc-hiCibw iYoREV text-white text-xl py-2">
                                {formatter.format(user?.moneyEarn.moneyEarnToday)}
                            </div>
                        </div>
                    </div>

                    <div className="ant-col">
                        <div className="sc-ikJyIC gNkWet">
                            <div className="sc-jJoQJp hzrkvO text-white text-xl font-bold">Số dư đang xử lý</div>
                            <div className="sc-hiCibw iYoREV text-white text-xl py-2">
                                {formatter.format(user?.data[0].dongbangtk)}
                            </div>
                            <div className="sc-jJoQJp hzrkvO text-white text-xl font-bold">Thu nhập hôm qua</div>
                            <div className="sc-hiCibw iYoREV text-white text-xl py-2">
                                {formatter.format(user?.moneyEarn.moneyEarnPreDay)}
                            </div>
                        </div>
                    </div>

                    <div className="ant-col">
                        <div className="sc-ikJyIC gNkWet">
                            <div className="sc-jJoQJp hzrkvO text-white text-xl font-bold">Gian hàng của bạn</div>
                            <div className="sc-hiCibw iYoREV text-white text-xl py-2">{user?.data[0].name_level}</div>
                            <div className="sc-jJoQJp hzrkvO text-white text-xl font-bold">Mức vốn đầu tư</div>
                            <div className="sc-hiCibw iYoREV text-white text-xl py-2">
                                {formatter.format(Number(user?.data[0].price))}
                            </div>
                        </div>
                    </div>

                    <div className="ant-col">
                        <div className="sc-ikJyIC gNkWet">
                            <div className="sc-jJoQJp hzrkvO text-white text-xl font-bold">Số đơn hoàn thành</div>
                            <div className="sc-hiCibw iYoREV text-white text-xl py-2">
                                {user?.mission?.amountToday}/{user.data[0].amount}
                            </div>
                            <div className="sc-jJoQJp hzrkvO text-white text-xl font-bold">Lợi nhuận mỗi đơn</div>
                            <div className="sc-hiCibw iYoREV text-white text-xl py-2">
                                {Number((user?.data[0].roses).toFixed(1))}%
                            </div>
                        </div>
                    </div>
                </div>
                <div className="money-trade text-white">MỨC VỐN ĐẦU TƯ</div>
                <div className="sc-clIzBv kHnHbZ">
                    {mucVonDauTu.map((item, i) => {
                        return (
                            <div className="sc-cxpSdN dNsaPg" key={i}>
                                <div className="dNsaPg-detail flex items-center justify-center">
                                    <span className="text-white">{item.title}: </span>
                                    <span className="text-white pl-2">$ {normalFormatter.format(item.von)}</span>
                                </div>
                                <div className="dNsaPg-detail flex items-center justify-center">
                                    <span className="text-white">Lợi nhuận: </span>
                                    <span className="text-white pl-2">{item.loi_nhuan}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
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

export default Order;
