import React from 'react';
import mail from '../../assets/images/mail.png';
import chuong from '../../assets/images/chuong.png';
import iconNext from '../../assets/images/icon-next.png';
import { useTranslation } from 'react-i18next';
function TinNhanHT() {
    const { t } = useTranslation();
    return (
        <div>
            <img src={mail} alt="" className="w-[390px] h-[260px]" />
            <div className="Notice_ul h-[200px] rounded-3xl flex flex-col">
                <div className="flex bg-[#fff] rounded-xl py-3 px-4 items-center justify-between mt-4 mx-4">
                    <img src={chuong} alt="" className="w-[20px] h-[20px]" />
                    <span className="text-xl">{t('content.tinNhanHeThong.tinNhanHeThong')}</span>
                    <img src={iconNext} alt="" className="w-[16px] h-[16px]" />
                </div>

                <span className="text-2xl text-center pt-8">{t('content.tinNhanHeThong.kCoDuLieu')}</span>
            </div>
        </div>
    );
}

export default TinNhanHT;
