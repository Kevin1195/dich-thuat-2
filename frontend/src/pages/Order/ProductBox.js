import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);

function ProductBox() {
    const { t } = useTranslation();
    return (
        <>
            <div className="w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]"></div>
            <div className="fixed w-[calc(100%-30px)] top-[15%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]">
                <div className="relative van-dialog__content">
                    <img src="https://i.imgur.com/ktEiprH.png" alt="" />
                    <div className="px-[31px] py-[25px]">
                        <div className="mb-[25px]">
                            <img
                                className="w-[100px] h-[100px] mx-auto rounded-lg"
                                src="https://i.imgur.com/zXB1MQd.png"
                                alt=""
                            />
                        </div>
                        <div className={cx('font-microsoft', { 'text-center font-bold': true })}>
                            {t('content.productBox.timDoanhNghiep')}
                        </div>
                        <div className={cx('van-progress')}></div>
                        <div>
                            <div className="flex items-center justify-between my-[15px]">
                                <div className="text-[#0dc253] text-2xl font-bold">
                                    {t('content.productBox.thanhLap')}
                                </div>
                                <FontAwesomeIcon
                                    className="text-[#fff] bg-[#0dc253] border-none text-4xl  rounded-full opacity-80"
                                    icon={faCircleCheck}
                                />
                            </div>
                            <div className="flex items-center justify-between my-[15px]">
                                <div className="text-[#a6c4c3] text-2xl font-bold">
                                    {t('content.productBox.spPhuHop')}
                                </div>
                                <FontAwesomeIcon
                                    className="text-[#fff] border-none text-4xl bg-[#999] rounded-full opacity-80"
                                    icon={faCircleCheck}
                                />
                            </div>
                        </div>
                    </div>
                    <FontAwesomeIcon
                        className="absolute text-[#fff] text-4xl left-[50%] right-[-50%] mt-[10px]"
                        icon={faX}
                    />
                </div>
            </div>
        </>
    );
}

export default ProductBox;
