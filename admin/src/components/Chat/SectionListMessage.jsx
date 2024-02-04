import { Dropdown, Popconfirm } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import ModalPreview from "./ModalPreview";
import dayjs from "dayjs";
import ModalEditHotName from "./ModalEditHotName";
import {
  checkCreateRoom,
  deleteMessage,
  deleteUserFromRoom,
} from "../../services/chat.services";
import { toast } from "react-toastify";
import SETTINGS from "../../setting.json";
import { FaDotCircle } from "react-icons/fa";
const SectionListMessage = ({
  message,
  selectRoom,
  setLoad,
  listSearch,
  elementSearch,
  setSelectRoom,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditHotName, setIsOpenEditHotName] = useState(false);

  const [imgPreview, setImgPreview] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const removeUserFromRoom = async () => {
    try {
      const res = await deleteUserFromRoom(selectRoom.id, {
        username: currentMessage?.from_user,
      });
      setLoad(true);
      if (res.success)
        return toast.success(
          `Loại ${currentMessage.from_user} khỏi nhóm thành công!`,
        );

      toast.error(`Có lỗi xảy ra!`);
    } catch (error) {
      toast.error(`Có lỗi xảy ra!`);
    }
  };

  const deleteMessageById = async messageId => {
    try {
      const res = await deleteMessage(messageId);
      if (!res.success) return toast.error(`Có lỗi xảy ra`);
      setLoad(true);
    } catch (error) {
      toast.error(`Có lỗi xảy ra!`);
    }
  };

  const createChatWithUserInRoom = async () => {
    try {
      const room = {
        name: currentMessage?.from_user,
        userList: [currentMessage?.from_user, user.username],
      };
      const res = await checkCreateRoom(room);
      if (res.success) {
        setLoad(true);
        setSelectRoom(res.data);
      } else {
        toast.error("Có lỗi xảy ra");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const itemsDropdownUser = [
    {
      label: (
        <button onClick={() => setIsOpenEditHotName(true)}>
          Chỉnh sửa biệt danh
        </button>
      ),
      key: 2,
    },
    {
      label: (
        <button onClick={() => removeUserFromRoom()}>Khai trừ khỏi nhóm</button>
      ),
      key: 3,
    },
    {
      label: <button onClick={createChatWithUserInRoom}>Nhắn tin riêng</button>,
      key: 4,
    },
  ];

  const itemsDropdownCSKH = [
    {
      label: <button onClick={createChatWithUserInRoom}>Nhắn tin riêng</button>,
      key: 5,
    },
  ];

  const renderDate = value => {
    const timeDiff = dayjs().diff(dayjs(value), "day");
    if (timeDiff === 0) {
      return dayjs(value).format("HH:mm");
    } else if (timeDiff < -7) {
      return dayjs(value).format("DD/MM/YYYY");
    } else {
      return dayjs(value).format("dddd");
    }
  };

  return (
    <div className="overflow-scroll pl-3 mb-20">
      {message?.length > 0 &&
        message.map(item => {
          if (item.from_user === user?.username) {
            return (
              <div
                className={`w-[100%] flex justify-end ${
                  listSearch?.[elementSearch]?.id === item?.id
                    ? "bg-slate-400"
                    : ""
                }`}
                key={item.id}
              >
                <div
                  className="my-3 max-w-[50%]"
                  key={item.created_at}
                  id={item.id}
                >
                  {item?.type === "text" ? (
                    <div className="flex items-end gap-3 px-5 py-1 pb-4  rounded-xl  bg-blue-500">
                      <p className="text-white text-[14px]">{item.content}</p>

                      <div className="flex flex-col items-end gap-3 ">
                        {user?.type?.toLowerCase() === "người thật" &&
                          (!item?.deleted ? (
                            <Popconfirm
                              title="Bạn có muốn xóa tin nhắn này?"
                              cancelText="Không"
                              okText="Xóa"
                              okType="danger"
                              onConfirm={() => deleteMessageById(item.id)}
                            >
                              <FiTrash2
                                color="red"
                                className="cursor-pointer"
                              />
                            </Popconfirm>
                          ) : (
                            <span className="text-[12px] text-red-500 mr-[-10px]">
                              Đã xóa
                            </span>
                          ))}

                        <span className="text-[12px] text-gray-200 mb-[-10px]">
                          {renderDate(item.created_at)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5 relative">
                      <img
                        src={`${SETTINGS.BASE_URL}${item.content}`}
                        alt={item.content}
                        className={`max-h-[400px] float-right cursor-pointer ${
                          item.deleted ? "filter blur-[2px]" : ""
                        } `}
                        onClick={() => {
                          setImgPreview(item.content);
                          setIsOpenModal(true);
                        }}
                      />

                      {user?.type?.toLowerCase() === "người thật" &&
                        !item.deleted && (
                          <Popconfirm
                            title="Bạn có muốn xóa tin nhắn này?"
                            cancelText="Không"
                            okText="Xóa"
                            okType="danger"
                            onConfirm={() => deleteMessageById(item.id)}
                          >
                            <FiTrash2
                              color="red"
                              className="cursor-pointer absolute right-3  top-2"
                              size={20}
                            />
                          </Popconfirm>
                        )}
                      <p>
                        <span className="cursor-pointer text-red-500  text-lg ">
                          {item.deleted ? "Hình ảnh này đã bị xóa" : ""}
                        </span>
                        <p className="text-[12px]  text-end mt-[-10px]">
                          {renderDate(item.created_at)}
                        </p>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          } else {
            return (
              <div
                className={`my-2 max-w-[40%] ${
                  listSearch?.[elementSearch]?.id === item?.id
                    ? "bg-slate-400"
                    : ""
                }`}
                key={item.id}
                id={item.id}
              >
                {item?.type === "text" ? (
                  <div className="flex gap-2 items-start">
                    <div className="flex items-end gap-3 px-5 py-1 pb-4  rounded-xl  bg-[#e2e8fd]">
                      <div>
                        <div className="mr-5 cursor-pointer flex gap-2 items-center">
                          {selectRoom.users.some(
                            user => user.username === item.from_user,
                          ) ? (
                            <Dropdown
                              menu={{
                                items:
                                  user?.type?.toLowerCase() === "người thật"
                                    ? itemsDropdownUser
                                    : itemsDropdownCSKH,
                              }}
                              trigger={["click"]}
                            >
                              <p
                                className="font-semibold text-blue-400"
                                onClick={() => setCurrentMessage(item)}
                              >
                                {item?.user_hotname || item?.from_user}
                              </p>
                            </Dropdown>
                          ) : (
                            <p className="font-semibold text-gray-400">
                              {item?.user_hotname || item?.from_user}
                            </p>
                          )}
                          <FaDotCircle
                            size={10}
                            className={`${
                              selectRoom?.users?.find(
                                user => user.username === item?.from_user,
                              )?.online
                                ? "bg-green-500 text-green-500"
                                : "bg-gray-500 text-gray-500"
                            } rounded-full`}
                          />
                        </div>

                        <p className="text-[14px]">{item.content}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        {user?.type?.toLowerCase() === "người thật" &&
                          (!item?.deleted ? (
                            <Popconfirm
                              title="Bạn có muốn xóa tin nhắn này?"
                              cancelText="Không"
                              okText="Xóa"
                              okType="danger"
                              onConfirm={() => deleteMessageById(item.id)}
                            >
                              <FiTrash2
                                color="red"
                                className="cursor-pointer"
                              />
                            </Popconfirm>
                          ) : (
                            <span className="text-[12px] text-red-500">
                              Đã xóa
                            </span>
                          ))}

                        <span className="text-[12px] mb-[-12px]">
                          {renderDate(item.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={`${SETTINGS.BASE_URL}${item.content}`}
                      alt={item.content}
                      className={`max-h-[400px]  cursor-pointer ${
                        item.deleted ? "filter blur-[2px]" : ""
                      } `}
                      onClick={() => {
                        setImgPreview(item.content);
                        setIsOpenModal(true);
                      }}
                    />

                    {user?.type?.toLowerCase() === "người thật" &&
                      !item?.deleted && (
                        <Popconfirm
                          title="Bạn có muốn xóa tin nhắn này?"
                          cancelText="Không"
                          okText="Xóa"
                          okType="danger"
                          onConfirm={() => deleteMessageById(item.id)}
                        >
                          <FiTrash2
                            color="red"
                            className="cursor-pointer absolute right-10 top-2"
                            size={20}
                          />
                        </Popconfirm>
                      )}
                    {/* <span className="text-[12px]  mb-[-12px]">
                      {renderDate(item.created_at)}
                    </span> */}
                    <p>
                      <span className="cursor-pointer text-red-500 text-end text-lg ">
                        {item.deleted ? "Hình ảnh này đã bị xóa" : ""}
                      </span>
                      <p className="text-[12px]  ">
                        {renderDate(item.created_at)}
                      </p>
                    </p>
                  </div>
                )}
              </div>
            );
          }
        })}

      <div style={{ float: "left", clear: "both" }} ref={bottomRef}></div>
      <ModalPreview
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        image={imgPreview}
      />
      <ModalEditHotName
        isOpen={isOpenEditHotName}
        setIsOpen={setIsOpenEditHotName}
        currentMessage={currentMessage}
        setLoad={setLoad}
      />
    </div>
  );
};

export default SectionListMessage;
