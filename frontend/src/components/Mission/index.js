import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mission.module.scss';
import SETTINGS from '../../setting.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

const cx = classNames.bind(styles);

let pattern = /[0-9]/g;

function Mission() {
    let [mission, setMission] = useState([]);
    useEffect(() => {
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/mission/list`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                setMission(data.data);
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }, []);
    return (
        <>
            {Array.isArray(mission.missions) &&
                mission.missions.map((data, index) => {
                    return (
                        <Link to={'/order/mission/' + data.id_level} key={index}>
                            <div className={cx('dorder')}>
                                <div className={cx('vip-list')}>
                                    <div className={cx('h2')}>{data.name_level}</div>
                                    <div className={cx('vip-list-icon')}>
                                        <div className={cx('vip-pic')}>
                                            <img
                                                src={SETTINGS.BASE_URL+"/static/media/"+data.id_level+".jpg"}
                                                draggable="true"
                                                width="100%;"
                                                alt="mission"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('vip-data')}>
                                    <div className={cx('text')}>
                                        <div>
                                            <span>CLASSIC</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('vip-commission')}>
                                    <div className={cx('text')}>
                                        <span>nhiệm vụ</span>
                                    </div>
                                    <div className={cx('number')}>
                                        <span>{data.roses}%</span>
                                    </div>
                                </div>
                                {Number(mission.roses_user.match(pattern)[0]) >
                                    Number(data.id_level.match(pattern)[0]) && (
                                    <div className={cx('lock')}>
                                        <img src="https://i.imgur.com/gBXdPXz.png" draggable="true" alt="img" />
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
        </>
    );
}

export default memo(Mission);
