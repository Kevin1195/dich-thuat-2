import React, { createContext, useContext, useState, useEffect } from "react";
// import { io } from 'socket.io-client';
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
import sound from "../assets/audio/sound.mp3";

// const socket = io.connect(SETTINGS.BASE_URL, { path: '/mysocket' });
// const ws = new WebSocket(SETTINGS.BASE_URL_SOCKET);

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const audio = new Audio(sound);
  // ws.onmessage = data => {
  //   let { username } = JSON.parse(data.data);
  //   toast.warn(`Tài khoản ${username} tạo đơn rút tiền`, {
  //     theme: "light",
  //     autoClose: 5000,
  //   });
  //   audio.play();
  //   // toast.warn(`Tài khoản ${data.username} tạo đơn rút tiền`, {
  //   //     theme: 'light',
  //   //     autoClose: 5000,
  //   // });
  // };
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [reload, setReload] = useState(true);

  const setMode = e => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = color => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = clicked =>
    setIsClicked({ ...initialState, [clicked]: true });

  useEffect(() => {
    // socket.on('receive_withdraw', (data) => {
    //     toast.warn(`Tài khoản ${data.username} tạo đơn rút tiền`, {
    //         theme: 'light',
    //         autoClose: 5000,
    //     });
    //     audio.play();
    // });
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        reload,
        setReload,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
