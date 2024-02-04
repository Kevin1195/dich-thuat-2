import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
function DieuKhoan() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { t } = useTranslation();
    return (
        <div className="withdraw px-[15px] py-[20px] min-h-[920px] bg-[#f2f2f2]">
            <div className="bg-[#fff] text-2xl rounded-2xl py-4 px-4 leading-10">
                {/* <span>{t('content.dieuKhoan.dieuKhoan')}</span>
                <br />
                <br />
                <span>{t('content.dieuKhoan.1')}</span>
                <br />
                <br />
                <span>
                    {t('content.dieuKhoan.2')} <br /> {t('content.dieuKhoan.3')}
                </span>
                <br />
                <br />
                <span>{t('content.dieuKhoan.4')}</span>
                <br />
                <br />
                <span>{t('content.dieuKhoan.5')}</span>
                <br />
                <br />
                <span>{t('content.dieuKhoan.6')}</span>
                <br />
                <br />
                <span>{t('content.dieuKhoan.7')}</span>
                <br />
                <br />
                <span>
                    {t('content.dieuKhoan.8')} <br /> {t('content.dieuKhoan.9')}
                </span>
                <br />
                <br />
                <span>{t('content.dieuKhoan.10')}</span> */}
            </div>
        </div>
    );
}

export default DieuKhoan;
