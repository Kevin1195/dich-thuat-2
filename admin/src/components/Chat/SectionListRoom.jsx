import { Dropdown } from "antd";
import { BsThreeDots } from "react-icons/bs";
import avatar from "../../assets/images/avatar.png";
import { deleteRoom } from "../../services/chat.services";
import { toast } from "react-toastify";
import { FaDotCircle } from "react-icons/fa";
import SETTINGS from "../../setting.json";

const SectionListRoom = ({
  listChat,
  selectRoom,
  setSelectRoom,
  setTypeEdit,
  setIsModalGroup,
  setLoad,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const deleteRoomById = async () => {
    try {
      const res = await deleteRoom(selectRoom.id);
      if (res.success) {
        toast.success("Đã xoá hội thoại");
        setLoad(true);
      } else {
        toast.error("Có lỗi xảy ra!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const items = [
    {
      label: (
        <button
          onClick={() => {
            setTypeEdit("edit");
            setIsModalGroup(true);
          }}
        >
          Quản lý
        </button>
      ),
      key: "0",
    },
    {
      label: <button onClick={deleteRoomById}>Xóa hội thoại</button>,
      key: "1",
    },
  ];
  return (
    <div className="max-h-[97%] overflow-y-auto">
      {listChat?.length > 0 &&
        listChat?.map(value => (
          <div
            className={`border-b-1 pl-1 active_user ${
              selectRoom.id === value.id ? "bg-[#e5efff] text-blue-500" : ""
            }`}
            onClick={() => {
              setSelectRoom(value);
            }}
            key={value.id}
          >
            <div className="p-1 flex justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={
                      value?.avatar
                        ? `${SETTINGS.BASE_URL}${value?.avatar}`
                        : avatar
                    }
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <FaDotCircle
                    size={12}
                    className={`${
                      value?.users?.some(
                        item => item.username !== user?.username && item.online,
                      )
                        ? "bg-green-500 text-green-500"
                        : "bg-gray-500 text-gray-500"
                    } rounded-full absolute bottom-1 right-1 border-[1px] border-black`}
                  />
                </div>
                <div className="truncate  max-w-[250px]">
                  <p className="message-title mb-0 mt-1  font-semibold">
                    {value?.name || value?.username}
                  </p>
                  <span className="text-[12px]">
                    {value?.lastMessage?.type === "image"
                      ? "Hình ảnh"
                      : value?.lastMessage?.content}
                  </span>
                </div>
              </div>
              {user?.type?.toLowerCase() === "người thật" && (
                <div className="mr-5 cursor-pointer ">
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <BsThreeDots size={24} color="red" />
                  </Dropdown>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SectionListRoom;
