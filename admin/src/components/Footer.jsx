import dayjs from "dayjs";
import React from "react";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => (
  <div className="mt-24 bg-[#eeeeee] p-[1px]">
    <div className="dark:text-gray-200 text-gray-700 text-center m-20 flex justify-center gap-3 items-center">
      © {dayjs().format("YYYY")} Created by Telegram{" "}
      <a
        href="https://t.me/noname78999"
        target="_blank"
        className=" flex justify-center gap-3 items-center"
      >
        <FaTelegramPlane color="blue" size="20px" /> @noname78999
      </a>
    </div>
  </div>
);

export default Footer;
