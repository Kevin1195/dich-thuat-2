import React, { useEffect, useState } from "react";
import { Header } from "../components";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
import axios from "axios";

const Settings = () => {
  let [settings, setSettings] = useState([]);

  let [stk_bank, setStkBank] = useState("");
  let [name_bank, setNameBank] = useState("");
  let [name_u_bank, setNameUBank] = useState("");
  let [stk_momo, setStkMomo] = useState("");
  let [name_momo, setNameMomo] = useState("");
  let [name_u_momo, setNameUMomo] = useState("");
  let [fee, setFee] = useState("");
  let [min_withdraw, setMinWithdraw] = useState("");
  let [zalo, setZalo] = useState("");
  let [telegram, setTelegram] = useState("");
  let [linkImageQR, setLinkImageQR] = useState("");

  useEffect(() => {
    axios
      .get(`${SETTINGS.BASE_URL}/api/portal/list/settings`, {
        headers: {
          "x-access-token": localStorage.getItem("auth_portal"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(async function (response) {
        let data = response.data.result;
        setSettings(data[0]);
        setStkBank(data[0].stk_bank);
        setNameBank(data[0].name_bank);
        setNameUBank(data[0].name_u_bank);
        setStkMomo(data[0].stk_momo);
        setNameMomo(data[0].name_momo);
        setNameUMomo(data[0].name_u_momo);
        setFee(data[0].fee);
        setMinWithdraw(data[0].min_withdraw);
        setTelegram(data[0].telegram);
        setZalo(data[0].zalo);
        setLinkImageQR(data[0].link_image_qr);
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
    return () => {
      setSettings({});
    };
  }, []);

  function handSettings() {
    const headers = {
      "x-access-token": localStorage.getItem("auth_portal"),
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/edit/settings`,
        {
          stk_bank,
          name_bank,
          name_u_bank,
          stk_momo,
          name_momo,
          name_u_momo,
          fee,
          min_withdraw,
          zalo,
          telegram,
          linkImageQR,
        },
        {
          headers,
        }
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === "ok") {
          if (data.result.type === 1) {
            return toast.success("Cập nhật cài đặt thành công !", {
              theme: "light",
            });
          }
        }
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Cài đặt" />
      <div className="border-2">
        <div className="mb-[10px] p-[10px] grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-[12px] text-[#999] ml-[5px]">
              STK ngân hàng
            </label>
            <input
              onChange={(e) => setStkBank(e.target.value)}
              defaultValue={settings.stk_bank}
              className="w-full p-[10px] outline-0 border-1"
              type="text"
              placeholder="STK ngân hàng"
            />
          </div>
          <div>
            <label className="text-[12px] text-[#999] ml-[5px]">
              Tên ngân hàng
            </label>
            <input
              onChange={(e) => setNameBank(e.target.value)}
              defaultValue={settings.name_bank}
              className="w-full p-[10px] outline-0 border-1"
              type="text"
              placeholder="Tên ngân hàng"
            />
          </div>
          <div>
            <label className="text-[12px] text-[#999] ml-[5px]">
              Tên chủ thẻ
            </label>
            <input
              onChange={(e) => setNameUBank(e.target.value)}
              defaultValue={settings.name_u_bank}
              className="w-full p-[10px] outline-0 border-1"
              type="text"
              placeholder="Tên chủ thẻ"
            />
          </div>

          <div>
            <label className="text-[12px] text-[#999] ml-[5px]">
              Link QR Code Bank
            </label>
            <input
              onChange={(e) => setLinkImageQR(e.target.value)}
              defaultValue={settings.link_image_qr}
              className="w-full p-[10px] outline-0 border-1"
              type="text"
              placeholder="Link QR Code Bank"
            />
          </div>

          {/* <div>
            <label className="text-[12px] text-[#999] ml-[5px]">SĐT Momo</label>
            <input
              onChange={(e) => setStkMomo(e.target.value)}
              defaultValue={settings.stk_momo}
              className="w-full p-[10px] outline-0 border-1"
              type="text"
              placeholder="SĐT Momo"
            />
          </div>
          <div>
            <label className="text-[12px] text-[#999] ml-[5px]">Tên Ví</label>
            <input
              onChange={(e) => setNameMomo(e.target.value)}
              defaultValue={settings.name_momo}
              className="w-full p-[10px] outline-0 border-1"
              type="text"
              placeholder="Tên Ví"
            />
          </div>
          <div>
            <label className="text-[12px] text-[#999] ml-[5px]">
              Tên chủ ví
            </label>
            <input
              onChange={(e) => setNameUMomo(e.target.value)}
              defaultValue={settings.name_u_momo}
              className="w-full p-[10px] outline-0 border-1"
              type="text"
              placeholder="Tên chủ ví"
            />
          </div> */}
        </div>
        <div className="mb-[10px] p-[10px] grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] text-[#999] ml-[5px]">
              Phí rút tiền
            </label>
            <input
              onChange={(e) => setFee(e.target.value)}
              defaultValue={settings.fee}
              className="w-full p-[10px] outline-0 border-1"
              type="text"
              placeholder="Phí rút tiền"
            />
          </div>
          <div>
            <label className="text-[12px] text-[#999] ml-[5px]">
              Min Rút tiền
            </label>
            <input
              onChange={(e) => setMinWithdraw(e.target.value)}
              defaultValue={settings.min_withdraw}
              className="w-full p-[10px] outline-0 border-1"
              type="text"
              placeholder="Min Rút tiền"
            />
          </div>
        </div>
        <div className="mb-[10px] p-[10px] grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] text-[#999] ml-[5px]">Zalo</label>
            <input
              onChange={(e) => setZalo(e.target.value)}
              defaultValue={settings.zalo}
              className="w-full p-[10px] outline-0 border-1"
              type="text"
              placeholder="Phí rút tiền"
            />
          </div>
          <div>
            <label className="text-[12px] text-[#999] ml-[5px]">Telegram</label>
            <input
              onChange={(e) => setTelegram(e.target.value)}
              defaultValue={settings.telegram}
              className="w-full p-[10px] outline-0 border-1"
              type="text"
              placeholder="Min Rút tiền"
            />
          </div>
        </div>
        <div onClick={() => handSettings()} className="mb-[10px] p-[10px]">
          <button className="w-[100%] bg-[#3498db] rounded-md py-[10px]">
            <p className="text-white text-center">Cập nhật </p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Settings;
