import Header from '../../components/Layout/components/Header';
import { useTranslation } from 'react-i18next';
function Service({ title }) {
    document.title = title;
    const { t } = useTranslation();
    return (
        <div>
            <Header color="rgb(255, 82, 89)" title="Dịch vụ" param="/my" />
            <div className="help-detile px-[15px] py-[20px]">
                <p className="text-[13px] mb-[10px]">{t('content.service.description')}</p>
                <div className="text-[13px] mb-[2px]">
                    <p className="mb-[2px]"> {t('content.service.1')}</p>
                    <p className="mb-[2px]"> {t('content.service.2')}</p>
                    <p className="mb-[2px]"> {t('content.service.3')}</p>
                    <p className="mb-[2px]"> {t('content.service.4')}</p>
                    <p className="mb-[2px]"> {t('content.service.5')}</p>
                </div>
            </div>
        </div>
    );
}

export default Service;
