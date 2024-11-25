import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  MdKeyboardArrowDown,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../data/avatar.jpg";
import { UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import SETTINGS from "../setting.json";
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  let accessToken = localStorage.getItem("auth_portal");
  const navigate = useNavigate();
  const [isNotice, setIsNotice] = useState(false);
  const [typeNotice, setTypeNotice] = useState("");
  const [href, setHref] = useState("");
  const audioNoticeRef = useRef(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const socket = io(SETTINGS.BASE_URL, {
      extraHeaders: { "user-id": accessToken },
    });

    // Kết nối và xử lý sự kiện
    socket.on("connect", () => {
      console.log("Socket connected.");

      // Lắng nghe sự kiện "notice" từ server
      socket.on("notice", msg => {
        if (msg.message === "newConfirm") {
          setIsNotice(true);
          setTypeNotice("confirm");
          setHref("/missions");

          if (audioNoticeRef.current) {
            audioNoticeRef.current.loop = true; // Kích hoạt lặp lại âm thanh
            audioNoticeRef.current.play();
          }
        }
        if (msg.message === "newMission") {
          setIsNotice(true);
          setTypeNotice("newMission");
          setHref("/manage/members");
          setUsername(msg.username);
          if (audioNoticeRef.current) {
            audioNoticeRef.current.loop = true; // Kích hoạt lặp lại âm thanh
            audioNoticeRef.current.play();
          }
        }
        if (msg.message === "newRecharge") {
          setIsNotice(true);
          setTypeNotice("recharge");
          setHref("/recharge");
          if (audioNoticeRef.current) {
            audioNoticeRef.current.loop = true;
            audioNoticeRef.current.play();
          }
        }
        if (msg.message === "newWithdraw") {
          setIsNotice(true);
          setTypeNotice("withdraw");
          setHref("/withdraw");
          if (audioNoticeRef.current) {
            audioNoticeRef.current.loop = true;
            audioNoticeRef.current.play();
          }
        }
      });
    });

    // Dọn dẹp socket khi component bị unmount
    return () => {
      socket.disconnect();
    };
  }, [SETTINGS.BASE_URL, accessToken]);

  const handleNotificationClick = () => {
    // Dừng âm thanh
    if (audioNoticeRef.current) {
      audioNoticeRef.current.pause();
      audioNoticeRef.current.currentTime = 0;
      audioNoticeRef.current.loop = false; // Tắt lặp lại
    }

    // Xóa trạng thái thông báo
    setIsNotice(false);
    setTypeNotice("");

    // Điều hướng tới trang tương ứng
    navigate(href);
  };

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <audio src={"/audio/notice.mp3"} ref={audioNoticeRef} />
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      {isNotice && (
        <div
          className="flex justify-center gap-3 items-center cursor-pointer"
          onClick={handleNotificationClick}
        >
          <div
            className={`flex justify-center gap-3 items-center relative p-2 px-4 bg-[#df3453] rounded-full text-white ${
              isNotice ? "shake-animation blink-animation" : ""
            }`}
          >
            <MdOutlineNotificationsActive
              className={`text-2xl  ${isNotice ? "shake-animation" : ""}`}
            />
            <p className="text-lg">
              {typeNotice === "recharge"
                ? "Có yêu cầu nạp tiền mới"
                : typeNotice === "withdraw"
                ? "Có yêu cầu rút tiền mới"
                : typeNotice === "newMission"
                ? `Có yêu cầu nhận đơn mới từ ${username}`
                : "Có yêu cầu duyệt đơn mới"}
            </p>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Navbar;
