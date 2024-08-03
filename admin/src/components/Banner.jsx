import React, { useState } from "react";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
import axios from "axios";
const Banner = (props) => {
  let { id } = props.data;
  const [edit, setEdit] = useState(false);
  const [deletes, setDelete] = useState(false);

  const EditMission = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("auth_portal"),
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/edit/banner`,
        { id, status: 1 },
        {
          headers,
        }
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === "ok") {
          if (data.result.type === 1) {
            setEdit(false);
            setTimeout(() => {
              window.location.reload();
            }, 200);
            return toast.success("Bật Banner thành công !", {
              theme: "light",
            });
          }
          toast.success("Đã tìm thấy 1 đơn hàng!", { theme: "light" });
        }
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  };

  const DeleteMission = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("auth_portal"),
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/edit/banner`,
        { id, status: 2 },
        {
          headers,
        }
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === "ok") {
          if (data.result.type === 1) {
            setEdit(false);
            setTimeout(() => {
              window.location.reload();
            }, 200);
            return toast.success("Tắt Banner thành công !", {
              theme: "light",
            });
          }
        }
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  };

  return (
    <>
      <div className="">
        <button
          onClick={() => setEdit(true)}
          className="bg-[#2ecc71] p-[10px] mx-[10px]"
        >
          <p className="text-white">Bật</p>
        </button>
        <button
          onClick={() => setDelete(true)}
          className="bg-[#e74c3c] p-[10px] mx-[10px]"
        >
          <p className="text-white">Tắt</p>
        </button>
      </div>
      {edit && (
        <div>
          <div className="w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]"></div>
          <div className="fixed w-[calc(100%-30px)] lg:w-[40%] top-[30%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]">
            <div className="relative van-dialog__content">
              <div className="px-[31px] py-[25px]">
                <div className="font-microsoft text-center font-bold my-[50px]">
                  Xác nhận Bật Banner
                </div>
                <div className="flex justify-between">
                  <div
                    onClick={() => setEdit(false)}
                    className="w-[calc(100%)] text-center bg-[#95a5a6] mx-[15px] py-[5px] rounded-full"
                  >
                    <p className="text-white">Hủy</p>
                  </div>
                  <div
                    onClick={() => EditMission()}
                    className="w-[calc(100%)] text-center bg-[#3498db] mx-[15px] py-[5px] rounded-full"
                  >
                    <p className="text-white">Đồng ý</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {deletes && (
        <div>
          <div className="w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]"></div>
          <div className="fixed w-[calc(100%-30px)] lg:w-[40%] top-[30%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]">
            <div className="relative van-dialog__content">
              <div className="px-[31px] py-[25px]">
                <div className="font-microsoft text-center font-bold my-[50px]">
                  Xác nhận Tắt Banner
                </div>
                <div className="flex justify-between">
                  <div
                    onClick={() => setDelete(false)}
                    className="w-[calc(100%)] text-center bg-[#95a5a6] mx-[15px] py-[5px] rounded-full"
                  >
                    <p className="text-white">Hủy</p>
                  </div>
                  <div
                    onClick={() => DeleteMission()}
                    className="w-[calc(100%)] text-center bg-[#3498db] mx-[15px] py-[5px] rounded-full"
                  >
                    <p className="text-white">Đồng ý</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
