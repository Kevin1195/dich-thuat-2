import imgLogin from "../data/login.svg";

import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const axios = require("axios").default;

const cx = classNames.bind(styles);

function Login() {
  let navigate = useNavigate();
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  function confirmLogin() {
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/login`,
        { username, password },
        {
          headers: {
            "x-access-token": localStorage.getItem("auth_portal"),
            "Access-Control-Allow-Origin": "*",
          },
        },
      )
      .then(async function (response) {
        let data = response.data.data;
        if (data.type === 1) {
          localStorage.setItem("auth_portal", data.auth);
          localStorage.setItem("user", JSON.stringify(data.user));
          setInterval(() => {
            window.location.href = "/dashboard/analytics";
          }, 1500);
          return toast.success("Đăng nhập thành công !", { theme: "light" });
        }
        if (data.type === 2)
          return toast.error("Thông tin không chính xác !", { theme: "light" });

        return toast.error("Có lỗi xảy ra", { theme: "light" });
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  }
  return (
    <div className="login">
      <div className="w-[calc(100%_-_25px)] lg:w-[auto] min-h-[100vh] xl:flex justify-around items-center mx-auto">
        <div className="hidden xl:block">
          <img className="" src={imgLogin} alt="" />
        </div>
        <div className="w-full lg:flex-1 lg:px-[10%] min-h-[100vh] flex justify-center items-center flex-col">
          <div className={cx("form-group")}>
            <div className="w-full text-left text-[28px] text-[#5e5873] space-x-4">
              Đăng nhập! 👋
            </div>
          </div>
          <div className={cx("form-group")}>
            <p className="text-[#999] text-[14px]">Tài khoản</p>
            <input
              onChange={e => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              spellCheck="false"
              autoComplete="false"
            />
          </div>
          <div className={cx("form-group")}>
            <p className="text-[#999] text-[14px]">Mật khẩu</p>
            <input
              onChange={e => setPassword(e.target.value)}
              placeholder="············"
              type="password"
              spellCheck="false"
              autoComplete="false"
            />
          </div>
          <div onClick={() => confirmLogin()} className={cx("form-group")}>
            <button type="button">Đăng nhập</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
