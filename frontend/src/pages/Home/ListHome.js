import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
function ListHome(drops) {
    let amount = drops.amount;
    let type = drops.type;
    const [random1s, setRandom1s] = useState(true);
    const { t } = useTranslation();

    const inputDate = new Date();
    const month = inputDate.getMonth() + 1;
    const day = inputDate.getDate();

    const timeStr = inputDate.toLocaleTimeString();

    let level = ['VIP1', 'VIP2', 'VIP3', 'VIP4', 'VIP5', 'VIP6'];
    let numberPhone = ['036', '034', '094', '092', '096', '078', '085', '093', '092', '091', '038', '037', '039'];

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function name() {
        return numberPhone[random(0, 11)] + '***' + random(1000, 9999);
    }

    function formatMoney(money = 0) {
        return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    useEffect(() => {
        setInterval(() => {
            setRandom1s((prev) => !prev);
        }, 5000);
    }, []);

    return (
        <ul className="pl-0">
            {Array(amount)
                .fill({})
                .map((data, index) => {
                    return (
                        <li
                            className={`${type === 'order' ? 'sc-cxpSdN dNsaPg bg-[#f5f5f5]' : 'sc-cxpSdN dNsaPg'}`}
                            key={index}
                        >
                            <div className="dNsaPg-detail">
                                <span className="text-black"> {name()}</span>
                            </div>

                            {type === 'order' ? (
                                <div className="dNsaPg-detail">
                                    <span className="p-0 m-0 text-orange px-2">
                                        {t('content.listHome.khopThanhCong')}
                                    </span>
                                </div>
                            ) : (
                                <div className="dNsaPg-detail">
                                    <span className="p-0 m-0 text-orange px-2">{t('content.listHome.hoaHong')}</span>
                                    <span className="p-0 m-0 text-orange">{formatMoney(random(1000, 50000))} đ</span>
                                </div>
                            )}

                            {type === 'order' ? (
                                <div className="dNsaPg-detail text-[#ccc] text-xl">{timeStr}</div>
                            ) : (
                                <div className="dNsaPg-detail text-[#ccc] text-xl">{`${month} - ${day}`}</div>
                            )}
                        </li>
                    );
                })}
        </ul>
    );
}

export default ListHome;
