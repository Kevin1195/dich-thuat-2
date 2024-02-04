import classNames from 'classnames/bind';

import logo from '../../assets/images/logo_lagi_8_resize.jfif';
import logoEbay from '../../assets/images/ebay_logo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './System.module.scss';
const cx = classNames.bind(styles);

function System() {
    const { t } = useTranslation();
    return (
        <div className={cx('system')}>
            <h3 className={cx('title')}>{t('content.system.heThong')}</h3>
            <h3 className={cx('sub-title')}>{t('content.system.timHieuHeThong')}</h3>
            <div className={cx('banner')}>
                <div className={cx('banner-item')}>
                    <div className={cx('banner-inner')}>
                        <div className={cx('banner-inner-logo')}>
                            <img src={logoEbay} className={cx('banner-logo')} alt="" />
                        </div>
                        <div className={cx('banner-content')}>
                            <div className={cx('banner-title')}>{t('content.system.gioiThieu')}</div>
                            <h3 className={cx('banner-company')}>{t('content.system.costco')}</h3>
                        </div>
                    </div>
                </div>
                <div className={cx('banner-item')}>
                    <div className={cx('banner-inner')}>
                        <div className={cx('banner-inner-logo')}>
                            <img src={logoEbay} className={cx('banner-logo')} alt="" />
                        </div>
                        <div className={cx('banner-content')}>
                            <div className={cx('banner-title')}>{t('content.system.thanhVienThanThiet')}</div>
                            <h3 className={cx('banner-company')}>{t('content.system.costco')}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('infomation')}>
                <Link to="/system/support" className={cx('infomation-item')}>
                    {t('content.system.hoSoCongTy')}
                </Link>
                <Link to="/system/support" className={cx('infomation-item')}>
                    {t('content.system.hopTacDaiLy')}
                </Link>
                <Link to="/system/support" className={cx('infomation-item')}>
                    {t('content.system.thanhVienCo')}
                </Link>
                <Link to="/system/support" className={cx('infomation-item')}>
                    {t('content.system.dauTu')}
                </Link>
                <Link to="/system/support" className={cx('infomation-item')}>
                    {t('content.system.hoatDong')}
                </Link>
                <Link to="/system/support" className={cx('infomation-item')}>
                    {t('content.system.moTk')}
                </Link>
                <Link to="/system/support" className={cx('infomation-item')}>
                    {t('content.system.dieuKhoan')}
                </Link>
                <Link to="/system/support" className={cx('infomation-item')}>
                    {t('content.system.baoMat')}
                </Link>
            </div>
        </div>
    );
}

export default System;
