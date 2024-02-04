import Header from '../../components/Layout/components/Header';
import styles from './My.module.scss';
import classNames from 'classnames/bind';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
const axios = require('axios').default;

let listBank = [
    'EXIMBANK',
    'MARITIME BANK',
    'AGRIBANK',
    'VIETINBANK',
    'BAC A BANK',
    'BAO VIET BANK',
    'BIDV BANK',
    'GP BANK',
    'HD BANK',
    'HONGLEONG BANK',
    'INDOVINA BANK',
    'KIENLONGBANK',
    'MBBANK',
    'NAMA BANK',
    'NGAN HANG A CHAU',
    'Ngân hàng TMCP Đông Á',
    'Ngân hàng TMCP Việt Á',
    'NH LD VIET NGA',
    'CIMB',
    'NH TMCP QUOC DAN',
    'OCEANBANK',
    'PGBANK',
    'PHUONGDONG BANK',
    'SACOMBANK',
    'SCB',
    'SEABANK',
    'SHB BANK',
    'SHINHAN BANK VN',
    'TECHCOMBANK',
    'TIENPHONG BANK',
    'UNITED OVERSEAS BANK',
    'VIB BANK',
    'VIDPublic Bank',
    'VIETBANK',
    'VIETCOMBANK',
    'VPBANK',
    'WOORI BANK',
    'NEWBANK',
];

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
    let [nameOnwerBank, setNameOnwerBank] = useState('');
    let [stk, setStk] = useState('');
    let [nameBank, setNameBank] = useState('EXIMBANK');
    let [sdt, setSdt] = useState('');
    let [check, setCheck] = useState('');
    const [isBankConnected, setIsBankConnected] = useState(false);

    const { t } = useTranslation();

    const handleAddBanking = () => {
        // console.log(nameOnwerBank, stk, nameBank, sdt);
        if (!nameOnwerBank || !stk || !nameBank || !sdt)
            return toast.error('Vui lòng nhập đầy đủ thông tin !', { theme: 'light' });

        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/webapi/user/addbanking`,
                { nameuser: nameOnwerBank, stk, nameBank, sdt, type: 'add' },
                {
                    headers,
                },
            )
            .then(function (response) {
                let data = response.data;
                if (data.data === 1) toast.success(`${t('content.myBank.themNganHang')}`, { theme: 'light' });
                if (data.data === 2) toast.success(`${t('content.myBank.suaNganHang')}`, { theme: 'light' });

                if (data.data === 3) {
                    toast.error(`${t('content.myBank.stkTonTai')}`, {
                        theme: 'light',
                    });
                    return;
                }

                if (data.status) {
                    setTimeout(() => {
                        window.location.href = `/my`;
                    }, 1500);
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    };

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
                    setNameOnwerBank(data.data.recharge[0].name_u_bank);
                    setSdt(data.data.recharge[0].username);
                    setStk(data.data.recharge[0].stk_bank);
                    if (data.data.recharge[0].name_bank) {
                        setNameBank(data.data.recharge[0].name_bank);
                    }
                    if (data.data.recharge[0].stk_bank) {
                        setIsBankConnected(true);
                    }
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }, []);

    return (
        <div className="withdraw px-[15px] py-[20px] min-h-[920px] bg-[#f2f2f2]">
            <div className={cx('edit-password', { '': true })}>
                {check && (
                    <div className="form-edit-password p-[20px]">
                        <div className={cx('bank-header')}>{t('content.myBank.lienKetTkBank')}</div>
                        <div className={cx('form-group', { '': true })}>
                            <label className={cx('bank-title')}>{t('content.myBank.hoten')}</label>
                            <input
                                disabled={check.recharge[0].name_u_bank}
                                // value={
                                //     Array.isArray(check.recharge) && check.recharge.length > 0
                                //         ? check.recharge[0].name_u_bank
                                //         : nameOnwerBank
                                // }
                                onChange={(e) => setNameOnwerBank(e.target.value)}
                                className="w-[100%]"
                                placeholder={t('content.myBank.hoten')}
                                defaultValue={check.recharge[0].name_u_bank || ''}
                            />
                        </div>

                        <div className={cx('form-group', { '': true })}>
                            <label className={cx('bank-title')}>{t('content.myBank.taiKhoan')}</label>
                            <input
                                disabled={check.recharge[0].username}
                                // value={
                                //     Array.isArray(check.recharge) && check.recharge.length > 0
                                //         ? check.recharge[0].username
                                //         : sdt
                                // }
                                onChange={(e) => setSdt(e.target.value)}
                                className="w-[100%]"
                                placeholder={t('content.myBank.taiKhoan')}
                                defaultValue={check.recharge[0].username || ''}
                            />
                        </div>
                        <div className={cx('form-group', { '': true })}>
                            <label className={cx('bank-title')}>{t('content.myBank.stk')}</label>
                            <input
                                disabled={check.recharge[0].stk_bank}
                                // value={
                                //     Array.isArray(check.recharge) && check.recharge.length > 0
                                //         ? check.recharge[0].stk_bank
                                //         : stk
                                // }
                                onChange={(e) => setStk(e.target.value)}
                                className="w-[100%]"
                                placeholder={t('content.myBank.inputStk')}
                                defaultValue={`${
                                    check.recharge[0].stk_bank
                                        ? '*******' + String(check.recharge[0].stk_bank).slice(-3)
                                        : ''
                                }`}
                            />
                        </div>

                        <div className={`${cx('form-group', { '': true })} mb-12`}>
                            <label className={cx('bank-title')}>{t('content.myBank.tenBank')}</label>
                            <input
                                disabled={check.recharge[0].name_bank}
                                // value={
                                //     Array.isArray(check.recharge) && check.recharge.length > 0
                                //         ? check.recharge[0].stk_bank
                                //         : stk
                                // }
                                onChange={(e) => setNameBank(e.target.value)}
                                className="w-[100%]"
                                placeholder={t('content.myBank.inputTenBank')}
                                defaultValue={check.recharge[0].name_bank || ''}
                            />
                        </div>

                        {/* <div className={cx('form-group', { '': true })}>
                        <label className={cx('bank-title')}>Tên ngân hàng</label>
                        <select
                            disabled={isBankConnected}
                            onChange={(e) => setNameBank(e.target.value)}
                            className={cx('select-banking')}
                            value={
                                nameBank ||
                                (Array.isArray(check.recharge) && check.recharge.length > 0
                                    ? check.recharge[0].name_bank
                                    : 'EXIMBANK')
                            }
                        >
                            {listBank.map((item, index) => {
                                return (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div> */}
                        <span className={cx('bank-alert')}>{t('content.myBank.luuY')} </span>

                        {/* {Array.isArray(check.recharge) && check.recharge.length === 0 && ( */}
                        {(!check.recharge[0].name_u_bank || !check.recharge[0].stk_bank) && (
                            <div
                                onClick={() => handleAddBanking()}
                                className={cx('form-group', { 'text-center': true })}
                            >
                                <div className={cx('btn-submit', { 'text-[#fff]': true })}>
                                    {t('content.myBank.xacNhanLK')}
                                </div>
                            </div>
                        )}
                        {/* )} */}
                    </div>
                )}

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
