import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/logo_lagi_8_resize.jfif';
import styles from './System.module.scss';
const cx = classNames.bind(styles);

function Support() {
    const { t } = useTranslation();
    return (
        <div className={cx('support')}>
            <div className={cx('support-item')}>
                <div className={cx('support-header')}>
                    <div className={cx('support-icon')}>
                        <svg
                            className={cx('support-svg')}
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ fontSize: '35px' }}
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62z"></path>
                            <circle cx="9" cy="13" r="1"></circle>
                            <circle cx="15" cy="13" r="1"></circle>
                            <path d="M18 11.03A6.04 6.04 0 0012.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.075 8.075 0 004.86-5.89c1.31 2.63 4 4.44 7.12 4.47z"></path>
                        </svg>
                    </div>
                    <h3 className={cx('support-title')}>{t('content.support.gioiThieu')}</h3>
                </div>
                <p className={cx('support-content')}>{t('content.support.1')}</p>
            </div>
            {/* <div className={cx('support-item')}>
                <div className={cx('support-header')}>
                    <div className={cx('support-icon')}>
                        <svg
                            className={cx('support-svg')}
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ fontSize: '35px' }}
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62z"></path>
                            <circle cx="9" cy="13" r="1"></circle>
                            <circle cx="15" cy="13" r="1"></circle>
                            <path d="M18 11.03A6.04 6.04 0 0012.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.075 8.075 0 004.86-5.89c1.31 2.63 4 4.44 7.12 4.47z"></path>
                        </svg>
                    </div>
                    <h3 className={cx('support-title')}>Tìm hiểu về hệ thống COSTCO</h3>
                </div>
                <p className={cx('support-content')}>
                    COSTCO được thành lập từ năm 1997, Là nền tảng thương mại điện tử B2C hàng đầu. Từ lúc bắt đầu chỉ
                    kinh doanh sách vở, đến ngày hôm nay đã phát triển thành một thị trường trực tuyến với các mặt hàng
                    đa dạng hóa . Những mặt hàng tiêu thụ bao gồm đồ chơi, thiết bị kỹ thuật số, sách vở, vật dụng cuộc
                    sống, các mỹ phẩm làm đẹp và nhiều mặt hàng khác .. Hiện tại nền tảng đã có hơn 300.000 mặt hàng
                    khác nhau . Gía trị tiêu thụ hàng hóa mỗi năm đều đạt tới 240.000.000USD. Sau 7 năm trôi qua, COSTCO
                    vẫn luôn duy trì được mức độ tăng cao 3 con số mỗi năm , tốc độ tăng trưởng gấp 3 lần so với cùng
                    ngành. Công ty trước đây cũng đã nhận được chiến lược đầu tư của nhiều tổ chức đầu tư quốc tế!
                </p>
            </div> */}
            <div className={cx('support-item')}>
                <div className={cx('support-header')}>
                    <div className={cx('support-icon')}>
                        <svg
                            className={cx('support-svg')}
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ fontSize: '35px' }}
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62z"></path>
                            <circle cx="9" cy="13" r="1"></circle>
                            <circle cx="15" cy="13" r="1"></circle>
                            <path d="M18 11.03A6.04 6.04 0 0012.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.075 8.075 0 004.86-5.89c1.31 2.63 4 4.44 7.12 4.47z"></path>
                        </svg>
                    </div>
                    <h3 className={cx('support-title')}>{t('content.support.quyTac')}</h3>
                </div>
                <p className={cx('support-content')}>{t('content.support.2')}</p>
                <p className={cx('support-content')}>① {t('content.support.dkiTk')}</p>
                <p className={cx('support-content')}>② {t('content.support.napTienOnl')}</p>
                <p className={cx('support-content')}>③ {t('content.support.nhanDonHang')}</p>
                <p className={cx('support-content')}>④ {t('content.support.hoanThanhDonHang')}</p>
                <p className={cx('support-content')}>⑤ {t('content.support.rutTienGoc')}</p>
            </div>
        </div>
    );
}

export default Support;
