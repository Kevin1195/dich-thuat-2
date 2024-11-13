import { useEffect, useState } from 'react';
import Header from '../../components/Layout/components/Header';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdNoteAlt } from 'react-icons/md';

const axios = require('axios').default;

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
function Withdraw({ title }) {
    document.title = title;
    let navigate = useNavigate();
    let [bank, setBank] = useState();
    let [password, setPassword] = useState();
    let [money, setMoney] = useState();
    let [moneyPending, setMoneyPending] = useState();
    const [level, setLevel] = useState('vip1');
    const { t } = useTranslation();

    useEffect(() => {
        checkToken();
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/user/banking`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.data.recharge.length < 1) {
                    window.location.href = '/my/banking';
                } else if (data.data.recharge[0].name_bank === null) {
                    window.location.href = '/my/banking';
                } else if (data.data.recharge.length > 0) {
                    setBank(data.data.recharge);
                    // setMoneyPending(data.data.pending);
                    setMoneyPending(data.data.recharge[0].dongbangtk);
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
                const vip = response?.data?.data?.[0].roses_user;
                setLevel(vip);
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }, []);

    const upgradeMember = async () => {
        if (!password || !money) return toast.warn(`${t('content.withDraw.thieuThongTin')}`, { theme: 'light' });
        if (level === 'vip1' && (money > 30000000 || money < 100000)) {
            return toast.warn('Số tiền không hợp lệ');
        }
        if (level === 'vip2' && (money > 200000000 || money < 30000000)) {
            return toast.warn('Số tiền không hợp lệ');
        }
        if (money < 100) return toast.warn(`${t('content.withDraw.minRut')} 100$`, { theme: 'light' });
        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/webapi/user/withdraw`,
                { password, money },
                {
                    headers,
                },
            )
            .then(async function (response) {
                let data = response.data.data;
                if (data) {
                    if (data.type === 1) {
                        setTimeout(() => {
                            navigate('/my');
                        }, 1200);
                        return toast.success(`${t('content.withDraw.taoDonThanhCong')}`, { theme: 'light' });
                    }
                    if (data.type === 2) return toast.error(`${t('content.withDraw.saiMk')}`, { theme: 'light' });
                    if (data.type === 3) return toast.error(`${t('content.withDraw.soDuKDu')}`, { theme: 'light' });
                    if (data.type === 5) return toast.error(data.msg, { theme: 'light' });
                    if (data.type === 4)
                        return toast.warn(`${t('content.withDraw.minRut')} ${formatMoney(data.min)} đ`, {
                            theme: 'light',
                        });
                    if (data.type === 100) return toast.error(data.msg, { theme: 'light' });

                    // toast.error('Có lỗi xảy ra !', { theme: 'light' });
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    };

    return (
        <div>
            <div className="withdraw px-[15px] py-[20px] min-h-[805px] bg-[#f2f2f2]">
                <div className="bg-[#fff] p-[15px] rounded-lg">
                    <div className="py-[10px] text-[22px] text-black">
                        {t('content.withDraw.soDuTK')}
                        <span className="text-[#ffaa03] px-[10px]">
                            {Array.isArray(bank) && bank.length > 0 && formatter.format(bank[0].money)}
                        </span>
                    </div>
                    <div className="text-[#000] text-2xl">
                        {t('content.withDraw.soDuDangDongBang')}{' '}
                        {Array.isArray(bank) && bank.length > 0 && formatter.format(moneyPending || 0)}
                    </div>
                </div>
                <div className="text-[12px] p-4 bg-white mt-6 rounded-lg">
                    <div className="flex items-center mb-4">
                        <MdNoteAlt size={24} className="mr-2" color="red" />
                        <span className="text-red-600 text-[14px]">Lưu ý:</span>
                    </div>
                    <p>Hạn mức rút tiền ở Lv1 từ 100.000 VND - 30.000.000 VND</p>
                    <p>Hạn mức rút tiền ở Lv2 từ 30.000.000 VND - 200.000.000 VND</p>
                </div>

                <div className="mt-[20px] p-[15px] rounded-lg bg-[#fff]">
                    <div className="meun-item">
                        <div className="w-full flex justify-between border-b py-[10px]">
                            <span className="text-[#000] text-[16px]">{t('content.withDraw.stk')}</span>
                            <span className="text-[16px] text-[#000]">
                                {Array.isArray(bank) &&
                                    bank.length > 0 &&
                                    bank[0].username.slice(0, 3) + '****' + bank[0].username.slice(-3)}
                            </span>
                        </div>
                        <div className="w-full flex justify-between border-b py-[10px]">
                            <span className="text-[#000] text-[16px]">{t('content.withDraw.tkBank')}</span>
                            <span className="text-[16px] text-[#000]">
                                {Array.isArray(bank) &&
                                    bank.length > 0 &&
                                    String(bank[0].stk_bank).slice(0, 7) + '****'}
                            </span>
                        </div>
                        <div className="w-full flex justify-between border-b py-[10px]">
                            <span className="text-[#000] text-[16px]">{t('content.withDraw.tenBank')}</span>
                            <span className="text-[16px] uppercase text-[#000]">
                                {Array.isArray(bank) && bank.length > 0 && String(bank[0].name_bank)}
                            </span>
                        </div>
                        <div className="w-full flex justify-between border-b py-[10px]">
                            <span className="text-[#000] text-[16px]">{t('content.withDraw.ten')}</span>
                            <span className="text-[16px] text-[#000]">
                                {Array.isArray(bank) && bank.length > 0 && String(bank[0].name_u_bank)}
                            </span>
                        </div>
                        <div className="w-full flex justify-between py-[10px] items-center">
                            <span className="text-[#000] text-[16px]">{t('content.withDraw.nhapSoTien')}</span>
                            <input
                                onChange={(e) => setMoney(e.target.value)}
                                type="text"
                                className="w-[50%] h-[32px] text-right text-[16px] bg-[#fff]"
                                placeholder={t('content.withDraw.inputNhapSoTien')}
                                spellCheck="false"
                                autoComplete="false"
                                style={{
                                    borderRadius: '5px',
                                    paddingRight: '5px',
                                }}
                            />
                        </div>
                        <div className="w-full flex justify-between py-[10px] items-center">
                            <span className="text-[#000] text-[16px]">{t('content.withDraw.mkVon')}</span>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="w-[50%] text-right text-[16px] h-[32px]"
                                placeholder={t('content.withDraw.inputMkVon')}
                                spellCheck="false"
                                autoComplete="false"
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                    paddingRight: '10px',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => upgradeMember()}
                    className="w-[100%] mt-[25px] rounded-full text-center button button-withdraw bg-[#2f3848] cursor-pointer"
                >
                    <div className="py-[10px] text-[#fff] text-3xl ">{t('content.withDraw.rutTienNgay')}</div>
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

export default Withdraw;
