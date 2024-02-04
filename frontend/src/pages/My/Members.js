import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import userIcon from '../../assets/images/user-icon-black.png';
import { useTranslation } from 'react-i18next';
import './members.scss';

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

function Members({ title }) {
    const [data, setData] = useState([]);

    document.title = title;

    const { t } = useTranslation();

    useEffect(() => {
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/user/members`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.status === 'ok') {
                    setData(data.data.listMember.filter((item) => item.name_u_bank !== null && item.phone !== null));
                }
            })
            .catch(function (error) {
                toast.error(`${t('content.error')}`, { theme: 'light' });
            });
    }, []);

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <div id="members" className="mt-4">
            <h2 className="text-center">{t('content.members.nhomCuaToi')}</h2>
            <p className=" mt-3">
                {t('content.members.soNguoiDaMoi')} <strong>{data.length}</strong>
            </p>
            {data.length > 0 &&
                data.map((item) => (
                    <>
                        <div className="d-flex align-items-center gap-5 mt-3">
                            <img src={userIcon} alt="user" />

                            <div className="mt-2">
                                <p>
                                    <strong>{t('content.members.hoTen')}</strong> {item.name_u_bank}
                                </p>
                                <p>
                                    <strong>{t('content.members.sdt')}</strong> {item.phone}
                                </p>
                                <p>
                                    <strong>{t('content.members.ngayDangKy')}</strong> {item.time}
                                </p>
                            </div>
                        </div>
                        <hr />
                    </>
                ))}

            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Members;
