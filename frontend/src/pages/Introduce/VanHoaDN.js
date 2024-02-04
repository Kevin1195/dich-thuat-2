import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
function VanHoaDN() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { t } = useTranslation();
    return (
        <div className="withdraw px-[15px] py-[20px] min-h-[920px] bg-[#f2f2f2]">
            <div className="bg-[#fff] text-2xl rounded-2xl py-4 px-4 leading-10">
                <span>{t('content.vanHoaDN.1')}</span>
                <br />
                <br />
                <span>{t('content.vanHoaDN.2')}</span> <br />
                <br />
                <span>{t('content.vanHoaDN.3')}</span>
                <br />
                <br />
                <span>{t('content.vanHoaDN.4')}</span>
                <br />
                <br />
                <span>{t('content.vanHoaDN.5')}</span>
            </div>
        </div>
    );
}

export default VanHoaDN;
