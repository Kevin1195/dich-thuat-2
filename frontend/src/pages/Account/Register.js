import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import SETTINGS from '../../setting.json';
import gg_fb from '../../assets/images/logo_gg_fbs.png';
import logoTitle from '../../assets/images/logo_osaka.png';
import Account from './index';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const axios = require('axios').default;

const cx = classNames.bind(styles);

function Register(props) {
    const [Lock1, setLock1] = useState(false);
    const [Lock2, setLock2] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [withdrawPw, setWithdrawPw] = useState('');
    const [invite, setInvite] = useState('');
    const [isAgreeTerm, setIsAgreeTerm] = useState(false);
    const location = useLocation();

    const { t } = useTranslation();

    const searchParams = new URLSearchParams(location.search);
    const invitation_code = searchParams.get('invitation_code');

    useEffect(() => {
        if (invitation_code) setInvite(invitation_code);
    }, [invitation_code]);

    document.title = props.title;

    const checkLock = (data) => {
        if (data === 'password') {
            setLock1(!Lock1);
            return false;
        } else {
            setLock2(!Lock2);
            return false;
        }
    };

    const handleRegister = async (datas) => {
        let { phone, password, withdrawPw, invite } = datas;
        let pattern = /^[0-9]*\d$/;
        if (!phone || !password || !withdrawPw || !invite)
            return toast.warn(`${t('content.login.thieuThongTin')}`, { theme: 'light' });
        // if (!pattern.test(username)) return toast.warn(`${t('content.login.saiDinhDang')}`, { theme: 'light' });
        // if (password !== repassword) return toast.warn('Mật khẩu xác nhận không chính xác!', { theme: 'light' });

        axios
            .post(`${SETTINGS.BASE_URL}/api/webapi/register`, {
                username: phone,
                password: password,
                invite: invite,
                name: name,
                withdrawPw: withdrawPw,
                phone: phone,
            })
            .then(function (response) {
                let status = response.data.status;
                if (status === 'ok') {
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1500);
                    localStorage.setItem('auth', response.data.auth);
                    return toast.success(response.data.message, { theme: 'light' });
                }
                return toast.error(response.data.message, { theme: 'light' });
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    };

    return (
        <Account type="Đăng ký">
            <div className={cx('side-content')}>
                {/* <h3 className={cx('title')}>{t('content.login.dangKy')}</h3> */}
                <div className="img-logo flex items-center justify-center pb-8 mt-32">
                    <img src={logoTitle} alt="" className={cx('banner-img')} />
                </div>
                <label htmlFor="Label" className="text-xl text-center pb-4 leading-10 text-black">
                    {t('content.register.luuY')}
                </label>
                <div className={cx('form-group')}>
                    <input
                        className={cx('form-input')}
                        onInput={(e) => {
                            setName(e.target.value);
                        }}
                        type="text"
                        name="name"
                        autoComplete="off"
                        maxLength="128"
                        spellCheck="false"
                        placeholder={t('content.register.inputName')}
                    />
                </div>

                <div className={cx('form-group')}>
                    <input
                        className={cx('form-input')}
                        onInput={(e) => {
                            setPhone(e.target.value);
                        }}
                        type="number"
                        name="phoneNumber"
                        placeholder={t('content.register.inputPhone')}
                        autoComplete="off"
                        maxLength="18"
                        spellCheck="false"
                    />
                </div>
                <div className={cx('form-group')}>
                    <input
                        className={cx('form-input')}
                        onInput={(e) => setPassword(e.target.value)}
                        type={Lock1 ? 'text' : 'password'}
                        autoComplete="new-password"
                        maxLength="18"
                        placeholder={t('content.register.inputPw')}
                    />
                </div>
                <div className={cx('form-group')}>
                    <input
                        name="withdrawpw"
                        className={cx('form-input')}
                        onInput={(e) => setWithdrawPw(e.target.value)}
                        type={Lock1 ? 'text' : 'password'}
                        autoComplete=""
                        maxLength="18"
                        placeholder={t('content.register.inputPw1')}
                    />
                </div>
                <div className={cx('form-group')}>
                    <input
                        className={cx('form-input')}
                        onInput={(e) => setInvite(e.target.value)}
                        type="number"
                        autoComplete="codeInvite"
                        maxLength="18"
                        spellCheck="false"
                        defaultValue={`${invite ? invite : ''}`}
                        placeholder={t('content.register.inputCode')}
                    />
                </div>
                <div
                    className={cx('btn-submit')}
                    style={{
                        background: '#ec0022',
                        color: '#f2d8be',
                        borderRadius: '50px',
                        marginBottom: '10px',
                    }}
                >
                    <button
                        type="button"
                        style={{ color: 'white', fontSize: '16px' }}
                        className={cx('block-events')}
                        onClick={() => handleRegister({ name, phone, phone, password, withdrawPw, invite })}
                    >
                        {t('content.login.dangKy')}
                    </button>
                </div>
                <div className={`${cx('footer')}`}>
                    <span className={cx('desc-footer')}>{t('content.register.daCoTaiKhoan')}</span>
                    <Link className={cx('login-btn')} to="/account/login">
                        {' '}
                        {t('content.login.dangNhap')}
                    </Link>
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
        </Account>
    );
}

export default Register;
