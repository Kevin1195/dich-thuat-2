import React, { useState, useEffect } from 'react';
import luckBg from '../../assets/images/bg-luck.png';
import backIcon from '../../assets/images/backicon.png';
import WheelComponent from './WheelComponent';
import { Link } from 'react-router-dom';
import './Rotation.css';
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

function RotationLuck() {
    const segments = ['66.00$', '88.00$', '588.00$', '8888.00$', '28888.00$', '38888.00$', '58888.00$', '88888.00$'];
    const segColors = ['#ffb820', '#ffcb3f', '#ffb820', '#ffcb3f', '#ffb820', '#ffcb3f', '#ffb820', '#ffcb3f'];

    const [isTurn, setIsTurn] = useState(true);
    const [winningSegment, setWinningSegment] = useState();

    const { t } = useTranslation();

    const onFinished = (winner) => {
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/webapi/user-lucky`,
                { winningSegment },
                {
                    headers: {
                        'x-access-token': localStorage.getItem('auth'),
                        'Access-Control-Allow-Origin': '*',
                    },
                },
            )
            .then(function (response) {
                if (response.data.status === 'ok') {
                    setIsTurn(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        checkToken();
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/user-lucky`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                console.log(data);
                if (data.status === 'ok') {
                    if (data.data[0].may_man) {
                        if (data.data[0].da_quay_may_man === 0) {
                            setIsTurn(false);
                            setWinningSegment(data.data[0].may_man);
                        } else setIsTurn(true);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div className="luck-rotation">
            <div className="title-lucky w-[100%] h-[48px] bg-[#4475ff] flex items-center justify-center">
                <Link to="/" className="go-to-home ml-auto">
                    <img src={backIcon} alt="" />
                </Link>
                <span className=" text-3xl font-bold text-white title-vong-quay">
                    {t('content.vongQuayMayMan.text')}
                </span>
            </div>
            <img src={luckBg} alt="Luck" />
            {winningSegment !== '0' && winningSegment && (
                <div className="style-luky">
                    <WheelComponent
                        segments={segments}
                        segColors={segColors}
                        winningSegment={winningSegment}
                        onFinished={(winner) => onFinished(winner)}
                        primaryColor="#e4370e"
                        contrastColor="#e4370e"
                        buttonText="Vé số"
                        isOnlyOnce={true}
                        isTurn={isTurn}
                        size={160}
                        upDuration={1000}
                        downDuration={2000}
                        fontFamily="Arial"
                    />
                </div>
            )}
        </div>
    );
}

export default RotationLuck;
