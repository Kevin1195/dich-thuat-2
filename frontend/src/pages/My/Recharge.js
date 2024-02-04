import { faAnglesRight, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Header from '../../components/Layout/components/Header';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
const axios = require('axios').default;

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

function randomStr(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function Recharge({ title }) {
    document.title = title;
    let [show, setShow] = useState(true);
    let [select, setSelect] = useState('bank');
    let [money, setMoney] = useState(0);
    let [user, setUser] = useState([]);
    let id_txn = randomStr(16);
    const [adminBank, setAdminBank] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
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
                    setUser(data.data[0]);
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/admin/bank`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                setAdminBank(data?.result?.list?.[0]);
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }, []);
    function RechargeHandler() {
        if (!money || money < adminBank?.min_withdraw)
            return toast.warn(`${t('content.recharge.minNap')} ${adminBank?.min_withdraw}$`, { theme: 'light' });
        if (select === 'momo') return toast.warn(`${t('content.recharge.baoTriMomo')}`, { theme: 'light' });

        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/webapi/recharge/add`,
                { money, select, id_txn },
                {
                    headers,
                },
            )
            .then(function (response) {
                let data = response.data;

                if (data.status === 1) {
                    toast.success(data.message, { theme: 'light' });
                    setTimeout(() => {
                        window.location.href = `/`;
                    }, 1500);
                }
                if (data.status === 2) toast.warn(data.message, { theme: 'light' });
                // if (data.status) {
                //     setTimeout(() => {
                //         // window.location.href = `/recharge/${data.id_txn}`;
                //         window.open(
                //             '/support',
                //             '_blank', // <- This is what makes it open in a new window.
                //         );
                //     }, 1500);
                // } else {
                //     localStorage.removeItem('auth');
                //     window.location.href = '/account/login';
                // }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }
    return (
        <div>
            <div className="recharge">
                <div>
                    {/* <p className="my-amount text-[15px] font-semibold text-[#ffa900] bg-[#fff8e9] py-[10px] text-center">
                        Số dư của tôi: {formatMoney(user.money) || '0'}VND
                    </p> */}
                    <div className="text-center my-[25px]">
                        <p className="text-3xl text-[#005652] font-bold">Nạp tiền</p>
                        <div className="form-group p-[15px] mt-[25px] bg-zinc-100 rounded-md">
                            <div className="flex justify-between items-center">
                                <p className="text-2xl">Đơn hàng số: </p>
                                <p className="text-2xl">{id_txn}</p>
                                <div
                                    onClick={() => {
                                        toast.success(`${t('content.formRecharge.saoChepThanhCong')}`, {
                                            theme: 'light',
                                        });
                                        copy(id_txn);
                                    }}
                                    className="flex items-center justify-center bg-cyan-500   rounded-full"
                                >
                                    <p className="text-[#fff] p-2 mb-0">Sao chép</p>
                                </div>
                            </div>
                            <hr />
                            <div className="flex justify-between items-center">
                                <p className="text-2xl">Tên ngân hàng: </p>

                                <p className="text-2xl">{adminBank?.name_bank}</p>
                                <div
                                    onClick={() => {
                                        toast.success(`${t('content.formRecharge.saoChepThanhCong')}`, {
                                            theme: 'light',
                                        });
                                        copy(adminBank?.name_bank);
                                    }}
                                    className="flex items-center justify-center bg-cyan-500   rounded-full"
                                >
                                    <p className="text-[#fff] p-2 mb-0">Sao chép</p>
                                </div>
                            </div>
                            <hr />
                            <div className="flex justify-between items-center">
                                <p className="text-2xl">Tên người nhận: </p>

                                <p className="text-2xl">{adminBank?.name_u_bank}</p>
                                <div
                                    onClick={() => {
                                        toast.success(`${t('content.formRecharge.saoChepThanhCong')}`, {
                                            theme: 'light',
                                        });
                                        copy(adminBank?.name_u_bank);
                                    }}
                                    className="flex items-center justify-center bg-cyan-500   rounded-full"
                                >
                                    <p className="text-[#fff] p-2 mb-0">Sao chép</p>
                                </div>
                            </div>
                            <hr />
                            <div className="flex justify-between items-center">
                                <p className="text-2xl">Số tài khoản: </p>

                                <p className="text-2xl">{adminBank?.stk_bank}</p>
                                <div
                                    onClick={() => {
                                        toast.success(`${t('content.formRecharge.saoChepThanhCong')}`, {
                                            theme: 'light',
                                        });
                                        copy(adminBank?.stk_bank);
                                    }}
                                    className="flex items-center justify-center bg-cyan-500   rounded-full"
                                >
                                    <p className="text-[#fff] p-2 mb-0">Sao chép</p>
                                </div>
                            </div>
                            <hr />
                            <div className="flex justify-between ">
                                <p className=" text-[#2a313c] font-semibold text-2xl">Số tiền:</p>
                                <input
                                    onChange={(e) => setMoney(e.target.value)}
                                    className="text-right pr-[5px] text-[18px]"
                                    type="tel"
                                    placeholder={t('content.recharge.nhapSoTien')}
                                    spellCheck="false"
                                    maxLength="13"
                                    style={{
                                        backgroundColor: '#d8ebfe',
                                        borderRadius: '5px',
                                        marginLeft: '10px',
                                    }}
                                />
                            </div>
                            <hr />
                            <p className="text-xl">
                                Vui lòng tải lên hóa đơn chuyển khoản, nếu không yêu cầu nạp tiền sẽ bị từ chối.
                            </p>
                            <hr />
                            <img src={adminBank?.link_image_qr} alt="" className="rounded-2xl" />
                        </div>

                        <div onClick={() => RechargeHandler()} className="w-[100%] mx-auto px-[15px] mt-[25px] ">
                            <div className="py-[10px] text-[#fff]  font-semibold rounded-md text-3xl bg-[#e9c39f]">
                                Xác nhận
                            </div>
                        </div>
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
        </div>
    );
}

export default Recharge;
