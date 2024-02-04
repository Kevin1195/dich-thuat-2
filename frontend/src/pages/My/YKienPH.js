import React, { useEffect } from 'react';
import mail from '../../assets/images/mail.png';
import chuong from '../../assets/images/chuong.png';
import iconNext from '../../assets/images/icon-next.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiMailSendLine } from 'react-icons/ri';
function YKienPH() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { t } = useTranslation();
    return (
        <div>
            <img src={mail} alt="" className="w-[390px] h-[260px]" />
            <div className="Notice_ul h-[200px] rounded-3xl flex flex-col">
                <div className="flex bg-[#fff] rounded-xl py-3 px-4 items-center justify-between mt-4 mx-4">
                    {/* <img src={chuong} alt="" className="w-[20px] h-[20px]" /> */}
                    <RiMailSendLine size="20" color="green" />
                    <span className="text-xl">{t('content.yKienPH.yKienPH')}</span>
                    <img src={iconNext} alt="" className="w-[16px] h-[16px]" />
                </div>

                <span className="text-2xl text-center pt-8 leading-10">{t('content.yKienPH.hayDongGop')}</span>

                <span className="text-2xl text-center pt-8 leading-10">
                    {t('content.yKienPH.lienHe')}
                    <Link to="https://mail.google.com/"> Gmail </Link>
                </span>
            </div>
        </div>
    );
}

export default YKienPH;
