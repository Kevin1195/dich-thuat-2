import React, { useState } from "react";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
const axios = require("axios").default;

const Member = props => {
  let { id_level, name_level, price, roses, amount, withdraw_per_day } =
    props.data;

  const [edit, setEdit] = useState(false);
  const [deletes, setDelete] = useState(false);
  const [open, setOpen] = useState(false);

  const [name_level_new, setName_level] = useState(name_level);
  const [price_new, setPrice_new] = useState(price);
  const [roses_new, setRoses] = useState(roses);
  const [amount_new, setAmount] = useState(amount);
  const [withdraw_per_day_new, setWithdraw_per_day] =
    useState(withdraw_per_day);

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
        `${SETTINGS.BASE_URL}/api/portal/edit/level`,
        {
          id_level,
          name_level_new,
          price_new,
          roses_new,
          amount_new,
          withdraw_per_day_new,
          type: "edit",
        },
        {
          headers,
        },
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === "ok") {
          if (data.result.type === 1) {
            setTimeout(() => {
              window.location.reload();
            }, 1200);
            setEdit(false);
            return toast.success("Cập nhật cấp độ thành công !", {
              theme: "light",
            });
          }
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
        `${SETTINGS.BASE_URL}/api/portal/edit/level`,
        { id_level, type: "delete" },
        {
          headers,
        },
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === "ok") {
          setDelete(false);
          setTimeout(() => {
            window.location.reload();
          }, 1200);
          return toast.success("Xoá cấp độ thành công !", {
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
                    <p className="text-left text-[#999]">id_level</p>
                    <input
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Tài khoản"
                      disabled="disabled"
                      defaultValue={id_level}
                    />
                  </div>
                  <div className="form-group mb-[20px]">
                    <p className="text-left text-[#999]">Tên cấp độ</p>
                    <input
                      onChange={e => setName_level(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Tên cấp độ"
                      defaultValue={name_level}
                    />
                  </div>
                  <div className="form-group mb-[20px]">
                    <p className="text-left text-[#999]">Số tiền đầu tư</p>
                    <input
                      onChange={e => setPrice_new(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Số tiền đầu tư"
                      defaultValue={price}
                    />
                  </div>
                  <div className="form-group mb-[20px]">
                    <p className="text-left text-[#999]">
                      Số đơn hàng trong ngày
                    </p>
                    <input
                      onChange={e => setAmount(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Số đơn hàng trong ngày"
                      defaultValue={amount}
                    />
                  </div>
                  <div className="form-group mb-[20px]">
                    <p className="text-left text-[#999]">
                      Hoa hồng nhận được (%)
                    </p>
                    <input
                      onChange={e => setRoses(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Hoa hồng nhận được (%)"
                      defaultValue={roses}
                    />
                  </div>
                  <div className="form-group mb-[20px]">
                    <p className="text-left text-[#999]">
                      Số lượt rút tiền trong ngày
                    </p>
                    <input
                      onChange={e => setWithdraw_per_day(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Số lượt rút tiền trong ngày"
                      defaultValue={withdraw_per_day}
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
                  Xác nhận xoá level
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
      {open && (
        <div>
          <div className="w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]"></div>
          <div className="fixed w-[calc(100%-30px)] lg:w-[40%] top-[30%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]">
            <div className="relative van-dialog__content">
              <div className="px-[31px] py-[25px]">
                <div className="font-microsoft text-center font-bold my-[50px]">
                  Xác nhận mở tài khoản
                </div>
                <div className="flex justify-between">
                  <div
                    onClick={() => setOpen(false)}
                    className="w-[calc(100%)] text-center bg-[#95a5a6] mx-[15px] py-[5px] rounded-full"
                  >
                    <p className="text-white">Hủy</p>
                  </div>
                  <div
                    // onClick={() => DeleteMission('open')}
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
