import React, { useState, useEffect } from 'react';
import bg from '../../assets/images/bg-nang-cap.png';
import themhoahong from '../../assets/images/themhoahong.png';
import themnhiemvu from '../../assets/images/themnhiemvu.png';
import chamsockg from '../../assets/images/chamsockg.png';
import avtIcon from '../../assets/images/avt-icon.png';
import { Link } from 'react-router-dom';
import SETTINGS from '../../setting.json';
import { useTranslation } from 'react-i18next';
const axios = require('axios').default;

const checkToken = () => {
    let accessToken = localStorage.getItem('auth');
    if (!accessToken) {
        localStorage.removeItem('auth');
        window.location.href = '/account/login';
    } else {
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/me`, {
                headers: {
                    'x-access-token': accessToken,
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.status === 'error') {
                    localStorage.removeItem('auth');
                    window.location.href = '/account/login';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};

const formatMoney = (money) => new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(money);

function NangCapHV() {
    const { t } = useTranslation();

    const [listMission, setListMission] = useState([
        {
            title: `${t('content.nangCapHoiVien.tvb')}`,
            money: 200,
            don: 60,
            rose: 0.5,
            timehieuluc: 365,
        },
        {
            title: `${t('content.nangCapHoiVien.tvv')}`,
            money: 1000,
            don: 80,
            rose: 0.6,
            timehieuluc: 365,
        },
        {
            title: `${t('content.nangCapHoiVien.tvbk')}`,
            money: 3000,
            don: 100,
            rose: 0.7,
            timehieuluc: 365,
        },
        {
            title: `${t('content.nangCapHoiVien.tvb')}`,
            money: 5000,
            don: 120,
            rose: 0.8,
            timehieuluc: 365,
        },

        {
            title: '0',
            money: 0,
            don: 0,
            rose: 0,
            timehieuluc: `${t('content.nangCapHoiVien.tronDoi')}`,
        },
    ]);

    const [myLevel, setmyLevel] = useState();

    useEffect(() => {
        checkToken();
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/userInfo`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;

                if (data.status === 'ok') {
                    setmyLevel(data.data[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div className="nang-cap px-[15px] py-[20px] relative">
            <div className="header-nang-cap bg-[#8e71f5] flex items-center justify-center py-3">
                <span className="text-white text-2xl">{t('content.nangCapHoiVien.nangCapHoiVien')}</span>
            </div>

            <img src={bg} alt="" className="h-[80px] w-[100%] mt-20 img-bg-nang-cap" />
            <div className="flex content-nang-cap items-center justify-center">
                <img src={avtIcon} alt="" className="w-[40px]" />
                <div className="flex flex-col text-white text-xl">
                    <span>
                        {t('content.nangCapHoiVien.capBac')} {myLevel ? myLevel.name_level : ''}
                    </span>
                    <span>
                        {t('content.nangCapHoiVien.moiNgayCoTheNhan')} {myLevel ? myLevel.amount : 0}{' '}
                        {t('content.nangCapHoiVien.donHang')}
                    </span>
                </div>
                <Link to="/my" className="bg-[#cfa55d] py-2 px-4 h-[28px] rounded-3xl">
                    {t('content.nangCapHoiVien.trungTamCaNhan')}
                </Link>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-center">
                    <img src={themhoahong} alt="" className="w-[70px] h-[70px]" />
                    <span className="texl-2xl">{t('content.nangCapHoiVien.themHoaHong')}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img src={themnhiemvu} alt="" className="w-[70px] h-[70px]" />
                    <span>{t('content.nangCapHoiVien.themNhiemVu')}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img src={chamsockg} alt="" className="w-[70px] h-[70px]" />
                    <span>{t('content.nangCapHoiVien.cskhRieng')}</span>
                </div>
            </div>

            <div className="flex flex-wrap">
                {listMission.map((item, i) => {
                    return (
                        <div
                            className="flex flex-col w-[47%] h-[150px] mr-3 mt-3 items-center border rounded-xl"
                            key={i}
                        >
                            <span className="text-2xl text-[#a29d9d] mt-2.5">{item.title}</span>
                            <span className="text-[#228aff] text-xl mt-3 font-semibold">{formatMoney(item.money)}</span>
                            <span className="text-[12px] font-semibold">
                                {t('content.nangCapHoiVien.soNhiemVu')}
                                {item.don}
                                {t('content.nangCapHoiVien.donHangNgay')}
                            </span>
                            <span className="text-[12px] font-semibold">
                                {t('content.nangCapHoiVien.tyleHoaHong')}
                                {item.rose}
                                {t('content.nangCapHoiVien.phanTramDon')}
                            </span>
                            <span className="text-[12px] font-semibold">{t('content.nangCapHoiVien.timeHieuLuc')}</span>
                            <span className="text-[12px] font-semibold">{item.timehieuluc}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default NangCapHV;
