import React, { useState } from "react";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
import { useStateContext } from "../contexts/ContextProvider";
const axios = require("axios").default;

const Member = props => {
  let { name, id } = props.data;
  const { setReload } = useStateContext();

  const [edit, setEdit] = useState(false);
  const [deletes, setDelete] = useState(false);
  const [nameBank, setNameBank] = useState();

  // useEffect(() => {
  //     axios
  //         .get(`${SETTINGS.BASE_URL}/api/portal/level/list`, {
  //             headers: {
  //                 'x-access-token': localStorage.getItem('auth_portal'),
  //                 'Access-Control-Allow-Origin': '*',
  //             },
  //         })
  //         .then(async function (response) {
  //             let data = response.data.result;
  //             setListLevel(data);
  //         })
  //         .catch(function (error) {
  //             toast.error('Có lỗi xảy ra', { theme: 'light' });
  //         });
  //     return () => {
  //         setListLevel({}); // This worked for me
  //     };
  // }, []);

  const EditMission = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("auth_portal"),
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/edit/bank`,
        {
          name: nameBank,
          id,
          type: "edit",
        },
        {
          headers,
        },
      )
      .then(async function (response) {
        let { status, msg } = response.data.result;
        if (status) {
          setReload(pre => !pre);
          setEdit(false);
          return toast.success(msg, {
            theme: "light",
          });
        }
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  };

  const DeleteMission = async type => {
    const headers = {
      "x-access-token": localStorage.getItem("auth_portal"),
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/edit/bank`,
        { id, type: "delete" },
        {
          headers,
        },
      )
      .then(async function (response) {
        let { status, msg } = response.data.result;
        if (status) {
          setReload(pre => !pre);
          setDelete(false);
          return toast.success(msg, {
            theme: "light",
          });
        }
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  };

  return (
    <>
      <div className="flex justify-around">
        <button
          onClick={() => setEdit(true)}
          className="bg-[#3498db] p-[10px] min-w-[50px]"
        >
          <p className="text-white">Sửa</p>
        </button>
        <button
          onClick={() => setDelete(true)}
          className="bg-[#e74c3c] p-[10px] min-w-[50px]"
        >
          <p className="text-white">Xoá</p>
        </button>
      </div>
      {edit && (
        <div>
          <div className="w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]"></div>
          <div className="fixed w-[calc(100%-30px)] lg:w-[calc(50%-30px)] top-[2%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]">
            <div className="relative van-dialog__content">
              <div className="px-[31px] py-[25px]">
                <div>
                  <div className="form-group mb-[20px]">
                    <p className="text-left text-[#999]">name</p>
                    <input
                      onChange={e => setNameBank(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Tài khoản"
                      defaultValue={name}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div
                    onClick={() => setEdit(false)}
                    className="w-[calc(100%)] text-center bg-[#95a5a6] mx-[15px] py-[10px] rounded-full"
                  >
                    <p className="text-white">Hủy</p>
                  </div>
                  <div
                    onClick={() => EditMission()}
                    className="w-[calc(100%)] text-center bg-[#3498db] mx-[15px] py-[10px] rounded-full"
                  >
                    <p className="text-white">Sửa đổi</p>
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
                  Xác nhận xoá ngân hàng
                </div>
                <div className="flex justify-between">
                  <div
                    onClick={() => setDelete(false)}
                    className="w-[calc(100%)] text-center bg-[#95a5a6] mx-[15px] py-[5px] rounded-full"
                  >
                    <p className="text-white">Hủy</p>
                  </div>
                  <div
                    onClick={DeleteMission}
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

export default Member;
