import React, { useRef } from 'react';
import { useState } from 'react';
import { getRoomById, getRoomMessage, getUserInfo, uploadService } from '../../services/chat.services';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import SETTINGS from '../../setting.json';
import { toast } from 'react-toastify';
import { AiOutlineFileImage } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import avtIcon from '../../assets/images/avatar.png';
import { IoIosArrowBack } from 'react-icons/io';
import { FaDotCircle } from 'react-icons/fa';
import { useWebSocket } from '../../contexts/WebSocket';

export default function DetailChat() {
    const params = useParams();
    const el = useRef();
    const fileRef = useRef(null);

    const [data, setData] = useState();
    const [text, setText] = useState();
    const [user, setUser] = useState({});

    const [room, setRoom] = useState({});

    const { reload, setReload, webSocket } = useWebSocket();

    const getData = async () => {
        const [resultUser, resultRoom] = await Promise.all([getUserInfo(), getRoomById(params?.id)]);
        if (resultUser?.status === 'ok') {
            setUser(resultUser?.data?.[0]);
        }
        if (resultRoom.success) {
            setRoom(resultRoom?.data);
        }
    };

    const getMessages = async () => {
        try {
            setReload(true);
            const messages = await getRoomMessage(params?.id);
            if (messages?.success) {
                setData(messages?.data?.data?.reverse());
            }
        } catch (error) {
            console.log(error);
        } finally {
            setReload(false);
        }
    };
    useEffect(() => {
        el.current?.scrollIntoView({ behavior: 'smooth' });
    }, [data, reload, el]);

    useEffect(() => {
        getMessages();
        getData();
    }, [reload]);

    // Hàm này dùng để gửi tin nhắn cho khách hàng
    const handlerSend = async (text, type = 'text') => {
        if (!params?.id || !text) {
            return;
        }

        const data = {
            type: 'sendMessage',
            data: {
                room_id: params?.id,
                content: text,
                type,
            },
        };
        webSocket.send(JSON.stringify(data));
        setReload(true);
        if (type === 'text') {
            setText('');
        } else {
            fileRef.current.value = null;
        }
    };
    const handleSendFile = async (e) => {
        try {
            const data = new FormData();
            data.append('file', e.target.files[0]);
            const res = await uploadService(data);

            if (res.success) {
                handlerSend(res.image[0], 'image');
            } else {
                toast.error('Có lỗi xảy ra');
            }
            fileRef.current.value = null;
        } catch (error) {
            fileRef.current.value = null;
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

    return (
        <div className="relative ">
            <div
                className="header-chat p-3 w-[500px] ml-[-70px] bg-slate-300 fixed top-0 flex justify-center"
                style={{ alignItems: 'center', height: '50px' }}
            >
                <div className="w-[360px]">
                    <div className="flex gap-4 items-center mx-3">
                        <Link to={'/support'}>
                            <IoIosArrowBack size={24} color="blue" />
                        </Link>
                        <div className="flex gap-3 items-center">
                            <div className="relative">
                                <img
                                    style={{ width: '40px', height: '40px' }}
                                    className="rounded-full"
                                    src={avtIcon}
                                    alt="avatar"
                                />
                                <FaDotCircle
                                    size={12}
                                    className={`${
                                        room?.userList?.some((i) => i.username !== user?.username && i.online)
                                            ? 'bg-green-500 text-green-500'
                                            : 'bg-gray-500 text-gray-500'
                                    } rounded-full absolute bottom-1 right-0 border-[1px] border-black`}
                                />
                            </div>
                            <div>
                                <span className="text-3xl font-semibold flex truncate max-w-[200px]">
                                    {room?.name === user?.username
                                        ? room?.userList?.find((i) => i?.username !== user?.username)?.username
                                        : room?.name}
                                </span>
                                {room?.userList?.length > 2 && (
                                    <span className="text-lg  flex truncate max-w-[200px]">
                                        {room?.userList?.length} thành viên
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="messages" style={{ marginTop: '70px', maxHeight: '77vh', overflowY: 'scroll' }}>
                {data?.map((item) => (
                    <div className="flex text-2xl" style={{ alignItems: 'center' }} key={item?.id}>
                        {item?.from_user === user?.username ? (
                            <div
                                className="flex w-full gap-2 mt-2"
                                style={{ justifyContent: 'end', alignItems: 'center' }}
                            >
                                {!item?.deleted && (
                                    <>
                                        {item.type === 'text' ? (
                                            <div className="bg-sky-500 p-2 rounded text-white grid max-w-[60%]">
                                                <span>{item?.content}</span>
                                                <span className="text-end text-lg font-medium">
                                                    {haneleTime(item?.created_at)}
                                                </span>
                                            </div>
                                        ) : (
                                            <div>
                                                <img
                                                    className="max-h-[250px]"
                                                    src={`${SETTINGS.BASE_URL}${item.content}`}
                                                    alt="Hình ảnh"
                                                />
                                                <span className="text-end text-lg font-medium float-right mt-2">
                                                    {haneleTime(item?.created_at)}
                                                </span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ) : (
                            <>
                                <div
                                    className="flex w-full mt-2"
                                    style={{ justifyContent: 'start', alignItems: 'center' }}
                                >
                                    {!item?.deleted && (
                                        <>
                                            {item.type === 'text' ? (
                                                <div className="bg-slate-100 p-2 rounded text-black grid max-w-[60%]">
                                                    <span className=" text-blue-500 font-semibold text-2xl">
                                                        {item?.from_user}
                                                    </span>
                                                    <span>{item?.content}</span>
                                                    <span className="text-start text-[12px] text-slate-500 ">
                                                        {haneleTime(item?.created_at)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <img
                                                        className="max-h-[250px]"
                                                        src={`${SETTINGS.BASE_URL}${item.content}`}
                                                        alt="Hình ảnh"
                                                    />
                                                    <span className="text-end text-lg font-medium float-right mt-2">
                                                        {haneleTime(item?.created_at)}
                                                    </span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        <div style={{ float: 'left', clear: 'both' }} ref={el}></div>
                    </div>
                ))}
            </div>

            <div className="input-chat fixed flex items-center w-[360px] border rounded-lg" style={{ bottom: '60px' }}>
                <label htmlFor="image" className="p-3">
                    <AiOutlineFileImage size={24} color="blue" />
                </label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    ref={fileRef}
                    onChange={(e) => handleSendFile(e)}
                />
                <input
                    value={text}
                    placeholder="Nhập tin nhắn"
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handlerSend(text);
                        }
                    }}
                    className="text-xl w-4/5"
                />

                <FiSend size={24} color="green" onClick={() => handlerSend(text)} />
            </div>
        </div>
    );
}
