import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import i18n from 'i18next';
const cx = classNames.bind(styles);

function Account(props) {
    const changeLanguage = (e) => {
        const languageValue = e.target.value;
        // i18n.changeLanguage(languageValue);
    };
    return (
        <div id="account relative">
            {/* <div className={cx('select-language')}>
                <select name="language" id="language" onChange={changeLanguage}>
                    <option value="vi">Việt Nam</option>
                    <option value="en">English</option>
                    <option value="jp">Nhật Bản</option>
                    <option value="ko">Hàn Quốc</option>
                </select>
            </div> */}
            <main className={`${cx('container')} bg-register`}>
                <div className={cx('main-content')}>{props.children}</div>
            </main>
        </div>
    );
}

export default Account;
