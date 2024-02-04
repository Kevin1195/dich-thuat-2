import React, { createContext, useContext, useEffect, useState } from 'react';
import SETTINGS from '../setting.json';
import audio from '../assets/audio/Notice-Zalo.mp3';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const WebSocketContext = createContext();
export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [webSocket, setWebSocket] = useState(null);
    const [reload, setReload] = useState(false);

    let location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('auth');
        const socket = new WebSocket(`${SETTINGS.BASE_URL_SOCKET}?token=${token}`);
        setWebSocket(socket);

        socket.addEventListener('close', () => {
            // Xử lý khi đóng kết nối
            setTimeout(() => {
                setWebSocket(new WebSocket(`${SETTINGS.BASE_URL_SOCKET}?token=${token}`));
            }, 2000);
        });

        socket.addEventListener('error', () => {
            // Xử lý lỗi hoặc thử kết nối lại
            setTimeout(() => {
                setWebSocket(new WebSocket(`${SETTINGS.BASE_URL_SOCKET}?token=${token}`));
            }, 2000);
        });

        return () => {
            // Đóng kết nối WebSocket khi unmount
            socket.close();
        };
    }, []);

    const playAudio = () => {
        new Audio(audio).play();
    };

    useEffect(() => {
        //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
        if (!webSocket) return;
        webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setReload(!reload);
            if (data?.type === 'receiveMessage') {
                playAudio();
                if (!location.pathname.includes('/support')) {
                    toast.info('Bạn có tin nhắn mới');
                }
            }
        };
    }, [webSocket]);

    const contextValue = {
        webSocket,
        reload,
        setReload,
    };

    return <WebSocketContext.Provider value={contextValue}>{children}</WebSocketContext.Provider>;
};

export default WebSocketContext;
