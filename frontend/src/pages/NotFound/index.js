import styles from './NotFound.module.scss';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);

function NotFound() {
    const { t } = useTranslation();

    return (
        <div id={cx('all')}>
            <div id={cx('center')}>
                <span id={cx('err-404')}> {t('content.notFound.title')}</span>
                <br />
                <span className={cx('err-msg')}>{t('content.notFound.message')}</span>
            </div>
        </div>
    );
}

export default NotFound;
