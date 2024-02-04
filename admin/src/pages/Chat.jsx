import React, { useEffect, useState, useRef } from "react";
import { AiOutlineFileImage, AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import background from "../assets/images/background-chat.jpeg";
import ModalGroup from "../components/Chat/ModalGroup";
import { Input } from "antd";
import { debounce } from "throttle-debounce";
import {
  getRoomMessage,
  getUserRoom,
  uploadService,
} from "../services/chat.services";
import SectionListRoom from "../components/Chat/SectionListRoom";
import SectionListMessage from "../components/Chat/SectionListMessage";

import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
import avatar from "../assets/images/avatar.png";
import { FaDotCircle } from "react-icons/fa";
import { useWebSocket } from "../contexts/WebSocket";

function Chat() {
  const [listChat, setListChat] = useState([]);
  const [listChatFilter, setListChatFilter] = useState([]);

  const [selectRoom, setSelectRoom] = useState("");
  const [message, setMessage] = useState([]);
  // const [load, setReload] = useState(true);
  const [textMessage, setTextMessage] = useState("");

  const [isModalGroup, setIsModalGroup] = useState(false);
  const [typeEdit, setTypeEdit] = useState("add");

  const fileRef = useRef(null);

  const { reload, setReload, webSocket } = useWebSocket();

  const user = JSON.parse(localStorage.getItem("user"));

  const [isSearchMessage, setIsSearchMessage] = useState(false);

  const getListChat = async () => {
    try {
      const res = await getUserRoom();
      setListChat(res?.data || []);
      setListChatFilter(res?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setReload(false);
    }
  };

  useEffect(() => {
    getListChat();
  }, [reload]);

  const getMessages = async () => {
    try {
      const res = await getRoomMessage(selectRoom.id);
      setMessage(res?.data?.data?.reverse());
      setReload(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectRoom) {
      const selectNew = listChat.find(item => item.id === selectRoom.id);
      setSelectRoom(selectNew);
      getMessages();
    }
  }, [selectRoom, reload]);

  // Hàm này dùng để gửi tin nhắn cho khách hàng
  const handlerSend = async (content, type = "text") => {
    if (!selectRoom || !content) {
      return;
    }

    const data = {
      type: "sendMessage",
      data: {
        room_id: selectRoom.id,
        content,
        type,
      },
    };
    webSocket.send(JSON.stringify(data));
    setReload(true);
    if (type === "text") {
      setTextMessage("");
    } else {
      fileRef.current.value = null;
    }
  };

  const handleSendFile = async e => {
    try {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      const res = await uploadService(data);
      if (res.success) {
        await handlerSend(res.image[0], "image");
      } else {
        toast.error("Có lỗi xảy ra");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };
  //hàm search message

  const [listSearch, setListSearch] = useState([]);
  const [elementSearch, setElementSeach] = useState(-1);
  const handleSearchMessage = debounce(500, async e => {
    if (e.target.value) {
      const messageFound = await getRoomMessage(selectRoom.id, e.target.value);
      if (messageFound?.data?.data?.length > 0) {
        setListSearch(messageFound?.data?.data);
        setElementSeach(0);
      }
    } else {
      setListSearch([]);
      setElementSeach(-1);
    }
  });

  const handleNextFilter = () => {
    if (listSearch?.length > 0) {
      if (elementSearch === listSearch?.length - 1) {
        setElementSeach(0);
      } else {
        setElementSeach(elementSearch + 1);
      }
    }
  };

  useEffect(() => {
    if (listSearch?.[elementSearch]?.id) {
      document
        .getElementById(listSearch?.[elementSearch]?.id?.toString())
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [elementSearch]);

  const handleFilterListChat = debounce(500, e => {
    setListChatFilter(dataOld => {
      const tempData = listChat?.filter(item =>
        item.users.some(user => {
          if (
            user.user_hotname.includes(e.target.value) ||
            user.username.includes(e.target.value)
          ) {
            return true;
          }
        }),
      );
      return [...tempData];
    });
  });

  return (
    <div className="mt-2 m-10 mb-20">
      {user?.type?.toLowerCase() === "người thật" && (
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2 mb-5"
          onClick={() => {
            setTypeEdit("add");
            setIsModalGroup(true);
          }}
        >
          Thêm nhóm mới
        </button>
      )}

      <div className="flex h-[85vh]  border">
        <div className="w-[30%]">
          <div className="p-1 ">
            <Input
              type="text"
              placeholder="Tìm kiếm"
              onChange={handleFilterListChat}
            />
          </div>
          <SectionListRoom
            listChat={listChatFilter}
            selectRoom={selectRoom}
            setSelectRoom={setSelectRoom}
            setTypeEdit={setTypeEdit}
            setIsModalGroup={setIsModalGroup}
            setLoad={setReload}
          />
        </div>

        <div
          className="w-[70%] flex flex-col relative"
          style={{ backgroundImage: `url(${background})` }}
        >
          {selectRoom && (
            <div>
              {isSearchMessage ? (
                <div className="flex align-middle items-center bg-gray-300">
                  <Input
                    placeholder="Tìm kiếm tin nhắn"
                    className="mx-2 w-[90%] my-2 rounded  outline-none  text-xl"
                    type="text"
                    onChange={handleSearchMessage}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        handleNextFilter();
                      }
                    }}
                    allowClear
                  />

                  <span className="mr-3 w-[5%] my-2 p-2">
                    {elementSearch + 1}/{listSearch?.length}
                  </span>

                  <IoMdClose
                    size={25}
                    onClick={() => setIsSearchMessage(false)}
                    className="cursor-pointer w-[5%]"
                  />
                </div>
              ) : (
                <div className="flex justify-between items-center align-middle px-3 py-1 bg-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={
                          selectRoom?.avatar
                            ? `${SETTINGS.BASE_URL}${selectRoom?.avatar}`
                            : avatar
                        }
                        alt=""
                        className="w-[50px] h-[50px] rounded-full"
                      />
                      <FaDotCircle
                        size={12}
                        className={`${
                          selectRoom?.users?.some(
                            item =>
                              item.username !== user?.username && item.online,
                          )
                            ? "bg-green-500 text-green-500"
                            : "bg-gray-500 text-gray-500"
                        } rounded-full absolute bottom-1 right-1 border-[1px] border-black`}
                      />
                    </div>
                    <div className="truncate  max-w-[500px]">
                      <p className="message-title mb-0 mt-1  font-semibold text-blue-500 text-lg">
                        {selectRoom?.name}
                      </p>
                      {selectRoom?.users?.length > 2 && (
                        <span className="text-md ">
                          {selectRoom?.users?.length} thành viên
                        </span>
                      )}
                    </div>
                  </div>

                  <AiOutlineSearch
                    size={30}
                    onClick={() => setIsSearchMessage(true)}
                    className="cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}

          <SectionListMessage
            message={message}
            selectRoom={selectRoom}
            setLoad={setReload}
            elementSearch={elementSearch}
            listSearch={listSearch}
            setSelectRoom={setSelectRoom}
          />
          {selectRoom && (
            <div className="pl-3">
              <div className="flex justify-between items-center p-2 bg-white rounded-md absolute bottom-2 h-[50px] w-[98%] ">
                <label htmlFor="image">
                  <AiOutlineFileImage size={24} color="blue" />
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  ref={fileRef}
                  onChange={e => handleSendFile(e)}
                />
                <input
                  placeholder="Nhập tin nhắn"
                  className="border-0 w-[93%] outline-none"
                  type="text"
                  onChange={e => setTextMessage(e.target.value)}
                  value={textMessage}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      handlerSend(textMessage);
                    }
                  }}
                />
                <FiSend
                  size={24}
                  onClick={() => handlerSend(textMessage)}
                  className="cursor-pointer text-[#00ffbfb7]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalGroup
        isOpen={isModalGroup}
        setIsOpen={setIsModalGroup}
        selectRoom={selectRoom}
        type={typeEdit}
        setLoad={setReload}
      />
    </div>
  );
}

export default Chat;
