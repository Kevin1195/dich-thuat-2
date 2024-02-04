import Header from '../../components/Layout/components/Header';
import styles from './My.module.scss';
import classNames from 'classnames/bind';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
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
function EditPwTransaction({ title }) {
    document.title = title;
    let [passwordOld, setpassword] = useState();
    let [newPassword, setNewPassword] = useState();
    let [RePassword, setrePassword] = useState();
    const [Lock1, setLock1] = useState(false);
    const [Lock2, setLock2] = useState(false);
    const [Lock3, setLock3] = useState(false);

    const { t } = useTranslation();

    const checkLock1 = () => {
        setLock1(!Lock1);
    };

    const checkLock2 = () => {
        setLock2(!Lock2);
    };

    const checkLock3 = () => {
        setLock3(!Lock3);
    };

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function EditPassword() {
        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        if (!passwordOld || !newPassword || !RePassword)
            return toast.warn(`${t('content.login.thieuThongTin')}`, { theme: 'light' });
        if (newPassword !== RePassword)
            return toast.warn(`${t('content.editPwTransaction.mkXacNhan')}`, { theme: 'light' });
        axios
            .put(
                `${SETTINGS.BASE_URL}/api/webapi/edit-password-transaction`,
                { passwordOld, newPassword },
                {
                    headers,
                },
            )
            .then(function (response) {
                let data = response.data;
                if (data.data === 1) {
                    toast.success(`${t('content.editPwTransaction.doiMkThanhCong')}`, { theme: 'light' });
                    setTimeout(() => {
                        window.location.href = '/my';
                    }, 1500);
                }
                if (data.data === 2) toast.error(`${t('content.editPwTransaction.saiMk')}`, { theme: 'light' });
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }
    return (
        <div className="withdraw px-[15px] py-[20px] h-[1000px] bg-[#f2f2f2]">
            <div className={cx('edit-password', { 'edit-password-style': true })}>
                <div className="form-edit-password p-[20px]">
                    <div className="text-2xl">{t('content.editPwTransaction.doiMk')}</div>
                    <div className={cx('form-group', { '': true })}>
                        <input
                            type={Lock1 ? 'text' : 'password'}
                            onChange={(e) => setpassword(e.target.value)}
                            className="w-[100%]"
                            placeholder={t('content.editPwTransaction.inputMk')}
                        />
                        <FontAwesomeIcon
                            onClick={checkLock1}
                            className="svg-pass"
                            icon={Lock1 ? faLockOpen : faLock}
                            style={{ position: 'absolute', right: '20px', top: '30px' }}
                        />
                    </div>
                    <div className={cx('form-group', { '': true })}>
                        <input
                            type={Lock1 ? 'text' : 'password'}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-[100%]"
                            placeholder={t('content.editPwTransaction.inputMkGd')}
                        />
                        <FontAwesomeIcon
                            onClick={checkLock1}
                            className="svg-pass"
                            icon={Lock1 ? faLockOpen : faLock}
                            style={{ position: 'absolute', right: '20px', top: '30px' }}
                        />
                    </div>
                    <div className={cx('form-group', { '': true })}>
                        <input
                            type={Lock1 ? 'text' : 'password'}
                            onChange={(e) => setrePassword(e.target.value)}
                            className="w-[100%]"
                            placeholder={t('content.editPwTransaction.inputMkGdXacNhan')}
                        />
                        <FontAwesomeIcon
                            onClick={checkLock1}
                            className="svg-pass"
                            icon={Lock1 ? faLockOpen : faLock}
                            style={{ position: 'absolute', right: '20px', top: '30px' }}
                        />
                    </div>
                    <div onClick={() => EditPassword()} className={cx('form-group', { 'text-center': true })}>
                        <div className={cx('btn-submit', { 'text-[#fff] text-2xl': true })}>
                            {t('content.editPwTransaction.xacNhan')}
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

export default EditPwTransaction;
