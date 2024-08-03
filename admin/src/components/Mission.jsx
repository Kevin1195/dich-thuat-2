import React, { useEffect, useState } from "react";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";

function calculRoses(amount, roses) {
  return (Number(amount) * (roses / 100)).toFixed(2);
}

const Mission = (props) => {
  let { id_mission_done, id_mission, username, status } = props.data;

  const { setReload } = useStateContext();
  const [edit, setEdit] = useState(false);
  const [deletes, setDelete] = useState(false);
  const ConfirmMission = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("auth_portal"),
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/mission/confirm`,
        { id_mission_done, id_mission, username },
        {
          headers,
        }
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === "ok") {
          setEdit(false);
          setReload((pre) => !pre);
          window.location.reload();
          return toast.success("Xác nhận duyệt đơn thành công !", {
            theme: "light",
          });
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
        `${SETTINGS.BASE_URL}/api/portal/mission/delete`,
        { id_mission_done },
        {
          headers,
        }
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === "ok") {
          setDelete(false);
          window.location.reload();
          return toast.success("Hủy đơn thành công !", {
            theme: "light",
          });
        }
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  };
  if (status === 2) return false;
  return (
    <>
      <div className="flex justify-around">
        <button onClick={() => setEdit(true)} className="bg-[#2ecc71] p-[10px]">
          <p className="text-white">Xác nhận</p>
        </button>
        <button
          onClick={() => setDelete(true)}
          className="bg-[#e74c3c] p-[10px]"
        >
          <p className="text-white">Xóa đơn</p>
        </button>
      </div>
      {edit && (
        <div>
          <div className="w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]"></div>
          <div className="fixed w-[calc(100%-30px)] lg:w-[40%] top-[30%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]">
            <div className="relative van-dialog__content">
              <div className="px-[31px] py-[25px]">
                <div className="font-microsoft text-center font-bold my-[50px]">
                  Xác nhận duyệt đơn
                </div>
                <div className="flex justify-between">
                  <div
                    onClick={() => setEdit(false)}
                    className="w-[calc(100%)] text-center bg-[#95a5a6] mx-[15px] py-[5px] rounded-full"
                  >
                    <p className="text-white">Hủy</p>
                  </div>
                  <div
                    onClick={() => ConfirmMission()}
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
                  Xác nhận xóa đơn
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

export default Mission;
