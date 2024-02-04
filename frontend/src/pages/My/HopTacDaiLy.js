import React from 'react';
import backIcon from '../../assets/images/backicon.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HopTacDaiLy() {
    const { t } = useTranslation();
    return (
        <div className="luck-rotation">
            <div className="title-lucky w-[100%] h-[48px] bg-[#4475ff] flex items-center justify-center">
                <Link to="/my" className="go-to-home ml-auto">
                    <img src={backIcon} alt="" />
                </Link>
                <span className=" text-3xl font-bold text-white title-vong-quay">
                    {t('content.hopTacDaiLy.hopTacDaiLy')}
                </span>
            </div>
            <div className="text-black text-2xl">{t('content.hopTacDaiLy.moTa')}</div>
        </div>
    );
}

export default HopTacDaiLy;
