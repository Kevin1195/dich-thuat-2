import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import backIcon from '../../assets/images/backicon.png';
import { Link } from 'react-router-dom';
import invite from '../../assets/images/invite.png';
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

const MyQRCode = () => {
    const [invitationCode, setInvitationCode] = useState();
    const { t } = useTranslation();
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
                    setInvitationCode(data.data[0].id_user);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div className="luck-rotation bg-invite">
            <div className="title-lucky w-[100%] h-[48px] bg-[#4475ff] flex items-center justify-center">
                <Link to="/my" className="go-to-home ml-auto">
                    <img src={backIcon} alt="" />
                </Link>
                <span className=" text-3xl font-bold text-white title-vong-quay">{t('content.qrCode.quetMa')}</span>
            </div>
            <div className="content-invite pt-16">
                <div className="content-invite-text flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-white">{t('content.qrCode.moiNguoiDungMoi')}</span>
                    <span className="text-4xl font-extrabold pt-2 text-white">{t('content.qrCode.cungBan')}</span>
                </div>
                <div className="img-invite flex items-center justify-center">
                    <img src={invite} alt="Invite" />
                </div>
                <div className="content-main-invite bg-white rounded-3xl px-4 py-4 mx-4">
                    <div className="content-main flex">
                        <div className="content-main-invite-text text-xl">
                            <span>{t('content.qrCode.chupAnhMan')}</span> <br /> <br />
                            <span>{t('content.qrCode.xacNhanBanBe')}</span>
                            <br /> <br />
                            <span>{t('content.qrCode.hoanThanhDk')}</span>
                            <br /> <br />
                            <span className="leading-[3rem]">{t('content.qrCode.sauKhiThanhCong')}</span>
                        </div>
                        {invitationCode && (
                            <QRCode value={`https://megavip.top/account/register?invitation_code=${invitationCode}`} />
                        )}
                    </div>
                    <div className="ma-moi flex items-center justify-center text-2xl">
                        {t('content.qrCode.maMoi')} {invitationCode ? invitationCode : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyQRCode;
