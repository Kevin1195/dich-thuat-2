import React, { useEffect, useState } from "react";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
import axios from "axios";

const Member = (props) => {
  let {
    username,
    money,
    level,
    status,
    roses_user,
    level_nhandon,
    dongbangtk,
    stt_don_vip,
    may_man,
    thue_may_man,
    da_quay_may_man,
    name_bank,
    name_u_bank,
    stk_bank,
  } = props.data;

  const [edit, setEdit] = useState(false);
  const [deletes, setDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [list_level, setListLevel] = useState([]);

  let [money_new, setMoney] = useState(money);
  let [dongbang, setDongbang] = useState(dongbangtk);
  let [vip_new, setVip] = useState(roses_user);
  let [vip_NhanDonNew, setVipNhanDon] = useState(level_nhandon);
  let [level_new, setLevel] = useState(level);
  let [delete_bank, setDBank] = useState("0");
  let [status_new, setStatus] = useState(status);
  let [password_new, setPassword] = useState("");
  let [passbank, setPassBank] = useState("");
  const [sttDonVip, setSttDonVip] = useState(stt_don_vip);
  const [mayman, setMayMan] = useState(may_man);
  const [thuemayman, setThuemayman] = useState(thue_may_man);
  const [daquaymayman, setDaQuayMM] = useState(da_quay_may_man);
  const [nameBank, setNameBank] = useState(name_bank);
  const [nameubank, setNameubank] = useState(name_u_bank);
  const [stkBank, setStkBank] = useState(stk_bank);

  useEffect(() => {
    axios
      .get(`${SETTINGS.BASE_URL}/api/portal/level/list`, {
        headers: {
          "x-access-token": localStorage.getItem("auth_portal"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(async function (response) {
        let data = response.data.result;
        setListLevel(data);
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });

    return () => {
      setListLevel({}); // This worked for me
    };
  }, []);

  const handleChange = (event) => {
    setVip(event.target.value);
  };

  const EditMission = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("auth_portal"),
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/edit/user`,
        {
          username,
          money_new,
          password_new,
          vip_new,
          level_new,
          delete_bank,
          vip_NhanDonNew,
          passbank,
          dongbang,
          sttDonVip,
          mayman,
          thuemayman,
          daquaymayman,
          nameBank,
          nameubank,
          stkBank,
          type: "edit",
        },
        {
          headers,
        }
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === "ok") {
          if (data.result.type === 1) {
            setTimeout(() => {
              window.location.reload();
            }, 1200);
            setEdit(false);
            return toast.success("Cập nhật tài khoản thành công !", {
              theme: "light",
            });
          }
        }
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  };
  // console.log(mayman)
  const DeleteMission = async (type) => {
    const headers = {
      "x-access-token": localStorage.getItem("auth_portal"),
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/edit/user`,
        { username, type: type },
        {
          headers,
        }
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === "ok") {
          if (data.result.type === 2) {
            setDelete(false);
            setTimeout(() => {
              window.location.reload();
            }, 1200);
            return toast.success("Khóa tài khoản thành công !", {
              theme: "light",
            });
          } else {
            setDelete(false);
            setTimeout(() => {
              window.location.reload();
            }, 1200);
            return toast.success("Mở tài khoản thành công !", {
              theme: "light",
            });
          }
        }
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  };
  const DuyetTien = async () => {
    //window.location.href = '/listorderx/'+username;
    //
    // return <Redirect to={link} />;
    // const headers = {
    //   "x-access-token": localStorage.getItem("auth_portal"),
    //   "Access-Control-Allow-Origin": "*",
    // };
    // axios
    //   .post(
    //     `${SETTINGS.BASE_URL}/api/portal/edit/duyettien`,
    //     { username},
    //     {
    //       headers,
    //     }
    //   )
    //   .then(async function (response) {
    //     let data = response.data;
    //     if (data.status === "ok") {
    //       if (data.result.type === 1) {
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 1200);
    //         return toast.success("Duyệt tiền đóng băng thành công !", {
    //           theme: "light",
    //         });
    //       } else {
    //         // setTimeout(() => {
    //         //   window.location.reload();
    //         // }, 1200);
    //         return toast.error("Duyệt tiền thất bại hoặc không có số dư đóng băng !", {
    //           theme: "light",
    //         });
    //       }
    //     }
    //   })
    //   .catch(function (error) {
    //     toast.error("Có lỗi xảy ra", { theme: "light" });
    //   });
  };

  return (
    <>
      <div className="flex justify-around">
        {/* <button
                    onClick={() => (window.location.href = link)}
                    className="bg-[#808000] p-[8px] min-w-[50px]"
                >
                    <p className="text-white">Duyệt</p>
                </button> */}
        <button
          onClick={() => setEdit(true)}
          className="bg-[#3498db] p-[10px] min-w-[50px]"
        >
          <p className="text-white">Sửa</p>
        </button>
        {status_new === 1 && (
          <button
            onClick={() => setDelete(true)}
            className="bg-[#e74c3c] p-[10px] min-w-[50px]"
          >
            <p className="text-white">Khóa</p>
          </button>
        )}
        {status_new === 2 && (
          <button
            onClick={() => setOpen(true)}
            className="bg-[#2ecc71] p-[10px] min-w-[50px]"
          >
            <p className="text-white">Mở</p>
          </button>
        )}
      </div>
      {edit && (
        <div>
          <div className="w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]"></div>
          <div className="fixed w-[calc(100%-30px)] lg:w-[calc(50%-30px)] top-[2%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]">
            <div className="relative van-dialog__content">
              <div className="px-[31px] py-[25px]">
                <div>
                  <div className="form-group mb-[5px]">
                    <p className="text-left text-[#999]">Tài khoản</p>
                    <input
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Tài khoản"
                      disabled="disabled"
                      defaultValue={username}
                    />
                  </div>

                  <div className="form-group mb-[5px]">
                    <p className="text-left text-[#999]">Vòng quay may mắn:</p>
                    <select
                      onChange={(e) => setMayMan(e.target.value)}
                      defaultValue={may_man}
                      className="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="0">Không</option>
                      <option value="66.00$">66.00</option>
                      <option value="88.00$">88.00</option>
                      <option value="588.00$">588.00</option>
                      <option value="8888.00$">8888.00</option>
                      <option value="28888.00$">28888.00</option>
                      <option value="38888.00$">38888.00</option>
                      <option value="58888.00$">58888.00</option>
                      <option value="88888.00$">88888.00</option>
                    </select>
                  </div>

                  <div className="form-group my-[5px]">
                    <p className="mb-2 text-[10px] text-left text-gray-400">
                      Đã đóng thuế hộp quà may mắn chưa?
                    </p>
                    <select
                      onChange={(e) => setThuemayman(e.target.value)}
                      defaultValue={thue_may_man}
                      className="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="Chưa đóng">Chưa đóng</option>
                      <option value="Đã đóng">Đã đóng</option>
                    </select>
                  </div>

                  <div className="form-group my-[5px]">
                    <p className="mb-2 text-[10px] text-left text-gray-400">
                      Khách đã quay hay chưa?
                    </p>
                    <select
                      onChange={(e) => setDaQuayMM(e.target.value)}
                      defaultValue={da_quay_may_man}
                      className="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value={0}>
                        Chưa quay, hoặc chọn ô này nếu muốn khách được phép quay
                      </option>
                      <option value={1}>
                        Đã quay, hoặc chọn ô này để khách không được phép quay
                      </option>
                    </select>
                  </div>

                  <div className="form-group mb-[5px]">
                    <p className="text-left text-[#999]">
                      Số dư (Cập nhật số dư mới) $:
                    </p>
                    <input
                      onChange={(e) => setMoney(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Số dư"
                      defaultValue={money_new}
                    />
                  </div>
                  <div className="form-group mb-[5px]">
                    <p className="text-left text-[#999]">Số dư đóng băng mới</p>
                    <input
                      onChange={(e) => setDongbang(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Số dư"
                      defaultValue={dongbang}
                    />
                  </div>
                  <div className="form-group mb-[5px]">
                    <p className="text-left text-[#999]">Đổi mật khẩu</p>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Mật khẩu mới (Lưu ý: nếu không đổi thì không nhập gì vào đây)"
                      defaultValue={password_new}
                    />
                  </div>
                  <div className="form-group mb-[5px]">
                    <p className="text-left text-[#999]">
                      Đổi mật khẩu rút tiền
                    </p>
                    <input
                      onChange={(e) => setPassBank(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Mật khẩu rút tiền mới (Lưu ý: nếu không đổi thì không nhập gì vào đây)"
                      defaultValue={passbank}
                    />
                  </div>
                  <div className="form-group my-[5px]">
                    <p className="text-left text-[#999]">Cấp Đại Lý</p>
                    <select
                      onChange={(e) => handleChange(e)}
                      defaultValue={vip_new || roses_user}
                      className="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      {list_level?.map((data, index) => {
                        return (
                          <option key={data.id_level} value={data.id_level}>
                            {data.name_level}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group mb-[5px]">
                    <p className="text-left text-[#999]">Mã nhận đơn</p>
                    <input
                      onChange={(e) => setVipNhanDon(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      defaultValue={vip_NhanDonNew}
                    />
                    {/* <select
                      defaultValue={vip_NhanDonNew}
                      onChange={e => setVipNhanDon(e.target.value)}
                      className='form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    >
                      {listMission?.map((data, index) => {
                        return (
                          <option key={data.id_mission} value={data.id_mission}>
                            {data.name_mission}
                          </option>
                        );
                      })}
                    </select> */}
                  </div>
                  {/* <div className='form-group mb-[5px]'>
                    <p className='text-left text-[#999]'>
                      Nhận đơn hàng vip tại đơn thứ:
                    </p>
                    <input
                      onChange={e => setSttDonVip(e.target.value)}
                      className='p-[10px] border-solid border-2 w-full'
                      defaultValue={stt_don_vip}
                    />
                  </div> */}
                  {/* <div className="form-group my-[5px]">
                                        <p className="text-left text-[#999]">
                                            Cấp nhận đơn
                                        </p>
                                        <select
                                            onChange={(e) => handleChange2(e)}
                                            defaultValue={
                                                vip_NhanDonNew || level_nhandon
                                            }
                                            className="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        >
                                            <option key="vip0" value="vip0">
                                                {'vip0'}
                                            </option>
                                            {list_level.map((data, index) => {
                                                return (
                                                    <option
                                                        key={data.id_level}
                                                        value={data.id_level}
                                                    >
                                                        {data.name_level}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div> */}
                  <div className="form-group my-[5px]">
                    <p className="text-left text-[#999]">Quyền:</p>
                    <select
                      onChange={(e) => setLevel(e.target.value)}
                      defaultValue={level_new}
                      className="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="0">USER</option>
                      <option value="1">ADMIN</option>
                    </select>
                  </div>
                  <div className="form-group mb-[5px]">
                    <p className="text-left text-[#999]">Tên ngân hàng</p>
                    <input
                      onChange={(e) => setNameBank(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      defaultValue={nameBank}
                    />
                  </div>
                  <div className="form-group mb-[5px]">
                    <p className="text-left text-[#999]">
                      Chủ tài khoản ngân hàng
                    </p>
                    <input
                      onChange={(e) => setNameubank(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      defaultValue={nameubank}
                    />
                  </div>
                  <div className="form-group mb-[5px]">
                    <p className="text-left text-[#999]">Số tài khoản</p>
                    <input
                      onChange={(e) => setStkBank(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      defaultValue={stkBank}
                    />
                  </div>
                  <div className="form-group my-[5px]">
                    <p className="mb-2 text-[10px] text-left text-gray-400">
                      Gỡ bỏ ngân hàng
                    </p>
                    <select
                      onChange={(e) => setDBank(e.target.value)}
                      defaultValue={delete_bank}
                      className="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="0">Không</option>
                      <option value="1">Có</option>
                    </select>
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
                  Xác nhận khóa tài khoản
                </div>
                <div className="flex justify-between">
                  <div
                    onClick={() => setDelete(false)}
                    className="w-[calc(100%)] text-center bg-[#95a5a6] mx-[15px] py-[5px] rounded-full"
                  >
                    <p className="text-white">Hủy</p>
                  </div>
                  <div
                    onClick={() => DeleteMission("banned")}
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
                    onClick={() => DeleteMission("open")}
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
