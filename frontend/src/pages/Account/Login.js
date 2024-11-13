import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import banner from '../../assets/images/banner33.png';
import logoTitle from '../../assets/images/logo_osaka.png';
import gg_fb from '../../assets/images/logo_gg_fbs.png';
import Account from './index';
import iconUser from '../../assets/images/icon-user.png';
import iconPass from '../../assets/images/icon-pass.png';
import iconShowPass from '../../assets/images/icon-show-pass.png';
import SETTINGS from '../../setting.json';
import Central from '../../assets/images/central.jpg';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
const axios = require('axios').default;

const cx = classNames.bind(styles);

function Login(props) {
    const [Lock, setLock] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { t } = useTranslation();

    useEffect(() => {
        document.title = props.title;
    }, [props.title]);

    const checkLock = () => {
        setLock(!Lock);
    };

    const handleLogin = (datas) => {
        let { username, password } = datas;
        let pattern = /^[0-9]*\d$/;
        if (!username || !password) return toast.warn(`${t('content.login.thieuThongTin')}`, { theme: 'light' });
        // if (!pattern.test(username)) return toast.warn(`${t('content.login.saiDinhDang')}`, { theme: 'light' });

        axios
            .post(`${SETTINGS.BASE_URL}/api/webapi/login`, {
                username: username,
                password: password,
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
                return toast.error('Sai số điện thoại hoặc mật khẩu !', { theme: 'light' });
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    };

    const changeLanguage = (e) => {
        const languageValue = e.target.value;
        // i18n.changeLanguage(languageValue);
    };

    return (
        <div className="bg-login px-[15px] pt-[100px] h-[100vh]">
            <div className={cx('side-content')}>
                {/* <div className={cx('select-language')}>
                    <select name="language" id="language" onChange={changeLanguage}>
                        <option value="vi">Việt Nam</option>
                        <option value="en">English</option>
                        <option value="jp">Nhật Bản</option>
                        <option value="ko">Hàn Quốc</option>
                    </select>
                </div> */}
                <div className="flex items-center justify-center pb-0 img-logo">
                    <img src="/logo2.png" alt="" className="w-[200px]" />
                </div>
                <div className={cx('form-group')}>
                    <img src={iconUser} alt="Icon User" className={cx('icon-left')} />
                    <input
                        className={cx('form-input')}
                        onInput={(e) => {
                            setUsername(e.target.value);
                        }}
                        type="number"
                        name="phoneNumber"
                        placeholder="Số điện thoại đăng nhập"
                        autoComplete="off"
                        maxLength="128"
                        spellCheck="false"
                    />
                </div>
                <div className={cx('form-group')}>
                    <img src={iconPass} alt="Icon User" className={cx('icon-left')} />
                    <input
                        className={cx('form-input')}
                        onInput={(e) => {
                            setPassword(e.target.value);
                        }}
                        name="password"
                        type={Lock ? 'text' : 'password'}
                        placeholder="Mật khẩu đăng nhập"
                        autoComplete="new-password"
                        maxLength="128"
                    />
                    <img src={iconShowPass} alt="Icon User" className={cx('icon-right')} onClick={checkLock} />
                </div>
                <div className={cx('btn-submit')}>
                    <button
                        type="button"
                        style={{
                            background: '#2f3848',
                            marginTop: '30px',
                            color: '#f2d8be',
                        }}
                        className={cx('block-events')}
                        onClick={() => handleLogin({ username, password })}
                    >
                        {t('content.login.dangNhap')}
                    </button>
                </div>

                <div className={cx('btn-register')}>
                    <Link
                        className={cx('register')}
                        to="/account/register"
                        style={{
                            background: '#2f3848',
                            color: '#f2d8be',
                        }}
                    >
                        {t('content.login.dangKy')}
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
        </div>
    );
}

export default Login;
