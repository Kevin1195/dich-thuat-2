import Header from '../../components/Layout/components/Header';
import styles from './My.module.scss';
import classNames from 'classnames/bind';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
const axios = require('axios').default;

const cx = classNames.bind(styles);
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
function MyBank({ title }) {
    document.title = title;
    const { t } = useTranslation();
    let [nameOnwerBank, setNameOnwerBank] = useState('');
    let [stk, setStk] = useState('');
    let [nameBank, setNameBank] = useState('');
    let [sdt, setSdt] = useState('');
    let [check, setCheck] = useState('');
    const [address, setAddress] = useState('');
    const [isBankConnected, setIsBankConnected] = useState(false);
    const [isAdress, setIsAdress] = useState(false);
    const [user, setUser] = useState('');

    const handleAddAddress = () => {
        if (!address) return toast.error(`${t('content.login.thieuThongTin')}`, { theme: 'light' });
        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/webapi/user/addaddress`,
                { address },
                {
                    headers,
                },
            )
            .then(function (response) {
                let data = response.data;
                if (data.data === 1) toast.success(`${t('content.address.themDCThanhCong')}`, { theme: 'light' });
                if (data.data === 2) toast.success(`${t('content.address.suaNganHangThanhCong')}`, { theme: 'light' });
                if (data.status) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    };

    useEffect(() => {
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
                    if (data.data[0].address) {
                        setIsAdress(true);
                        setUser(data.data[0]);
                    }
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }, []);

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
                if (data.data.recharge.length > 0) {
                    setCheck(data.data);
                    setIsBankConnected(true);
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }, []);

    return (
        <div className="withdraw px-[15px] py-[20px] h-[1000px] bg-[#f2f2f2]">
            <div className={cx('edit-password', { '': true })}>
                <div className="form-edit-password p-[20px]">
                    <div className={cx('bank-header')}>{t('content.address.diaChiCuTru')}</div>
                    <div className={cx('form-group', { '': true })}>
                        <label className={cx('bank-title')}>{t('content.address.hoTenChuKhoan')}</label>
                        <input
                            disabled={isBankConnected}
                            value={
                                Array.isArray(check.recharge) && check.recharge.length > 0
                                    ? check.recharge[0].name_u_bank
                                    : nameOnwerBank
                            }
                            onChange={(e) => setNameOnwerBank(e.target.value)}
                            className="w-[100%]"
                            placeholder={t('content.address.hoTenChuKhoan')}
                        />
                    </div>

                    <div className={cx('form-group', { '': true })}>
                        <label className={cx('bank-title')}>{t('content.address.taiKhoan')}</label>
                        <input
                            disabled={isBankConnected}
                            value={
                                Array.isArray(check.recharge) && check.recharge.length > 0
                                    ? check.recharge[0].phone
                                    : sdt
                            }
                            onChange={(e) => setSdt(e.target.value)}
                            className="w-[100%]"
                            placeholder={t('content.address.taiKhoan')}
                        />
                    </div>
                    <div className={cx('form-group', { '': true })}>
                        <label className={cx('bank-title')}>{t('content.address.diaChiCuTruHienTai')}</label>
                        <input
                            disabled={isAdress}
                            defaultValue={user.address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-[100%]"
                            placeholder={t('content.address.inputDiaChi')}
                        />
                    </div>

                    {/* {Array.isArray(check.recharge) && check.recharge.length === 0 && ( */}
                    {!isAdress && (
                        <div onClick={() => handleAddAddress()} className={cx('form-group', { 'text-center': true })}>
                            <div className={cx('btn-submit', { 'text-[#fff] text-xl': true })}>
                                {t('content.address.xacNhan')}
                            </div>
                        </div>
                    )}
                    {/* )} */}
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

export default MyBank;
