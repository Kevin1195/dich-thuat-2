import React, { useEffect, useState } from 'react';
import { FaDotCircle, FaSearch } from 'react-icons/fa';
import avtIcon from '../../assets/images/avatar.png';

import ReactLoading from 'react-loading';
import { checkCreateRoom, getUserInfo, getUserRoom } from '../../services/chat.services';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { FcOnlineSupport } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useWebSocket } from '../../contexts/WebSocket';

function Service() {
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState();
    const [dataStatic, setDataStatic] = useState([]);
    const [data, setData] = useState([]);

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const { reload, setReload } = useWebSocket();
    const getData = async () => {
        try {
            setIsLoading(true);
            // const result = await getUserRoom();
            const [resultUser, result] = await Promise.all([getUserInfo(), getUserRoom()]);
            if (resultUser?.status === 'ok') {
                setUser(resultUser?.data?.[0]);
            }
            if (result?.success) {
                setDataStatic(result?.data);
                setData(result?.data);
                setReload(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const haneleTime = (value) => {
        const timeDiff = moment().diff(moment(value), 'days');
        if (timeDiff === 0) {
            return moment(value).format('HH:mm');
        } else if (timeDiff < -7) {
            return moment(value).format('DD/MM/YYYY');
        } else {
            return moment(value).format('dddd');
        }
    };
    const handleSearch = () => {
        setData((dataOld) => {
            const tempData = dataStatic?.filter((item) => item?.name?.includes(search));
            return [...tempData];
        });
    };
    useEffect(() => {
        getData();
    }, [reload]);

    const createChatWithUserInRoom = async () => {
        try {
            const room = {
                name: user?.username,
                userList: [user.username, 'admin'],
            };
            const res = await checkCreateRoom(room);
            if (res.success) {
                navigate(`/support/${res?.data?.id}`);
            } else {
                toast.error('Có lỗi xảy ra');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    return (
        <div className="relative h-[100vh]">
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <ReactLoading type="bubbles" color="#ff8a00" height={10} width={70} />
                </div>
            ) : (
                <div className="container w-full p-2">
                    <div className="component-search w-full flex">
                        <input
                            className="w-10/12 border border-slate-300 rounded p-2 text-xl"
                            value={search}
                            placeholder="Tìm kiếm"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div
                            className="p-2 w-2/12 border border-slate-300 justify-center align-middle items-center flex bg-blue-500 text-white"
                            onClick={handleSearch}
                        >
                            <FaSearch size={18} />
                        </div>
                    </div>
                    <div className="grid mt-3">
                        {data?.map((item) => (
                            <Link
                                className="flex align-middle gap-2  border-b p-2 my-1"
                                key={item?.id}
                                to={`/support/${item?.id}`}
                            >
                                <div className="relative w-[45px] h-[45px] rounded-full">
                                    <img
                                        // src="https://i.pinimg.com/564x/df/ce/a7/dfcea7989195d3273c2bcb367fca0a83.jpg"
                                        src={item?.avatar || avtIcon}
                                        alt="avatar"
                                    />
                                    <FaDotCircle
                                        size={12}
                                        className={`${
                                            item?.users?.some((i) => i.username !== user?.username && i.online)
                                                ? 'bg-green-500 text-green-500'
                                                : 'bg-gray-500 text-gray-500'
                                        } rounded-full absolute bottom-3 right-0 border-[1px] border-black`}
                                    />
                                </div>
                                <div className="grid mt-2 w-full">
                                    <span className="text-lg font-bold truncate  mt-[-5px]">
                                        {item?.name === user?.username
                                            ? item?.users?.find((i) => i?.username !== user?.username)?.username
                                            : item?.name}
                                    </span>
                                    {item?.lastMessage?.type !== 'image' ? (
                                        <div className="flex justify-between">
                                            <span className="text-lg truncate max-w-[200px]">
                                                {item?.lastMessage?.content}
                                            </span>
                                            <div>{haneleTime(item?.lastMessage?.created_at)}</div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between">
                                            <span>Hình ảnh</span>
                                            <div>{haneleTime(item?.lastMessage?.created_at)}</div>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div
                className="absolute bottom-[10%] right-[3%] border rounded-full p-2 flex flex-col items-center z-50"
                onClick={createChatWithUserInRoom}
            >
                <FcOnlineSupport size={35} />
            </div>
        </div>
    );
}

export default Service;
