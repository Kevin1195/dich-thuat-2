import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { editHotName } from "../../services/chat.services";
import { toast } from "react-toastify";

const ModalEditHotName = ({ isOpen, setIsOpen, currentMessage, setLoad }) => {
  const [hotName, setHotName] = useState(currentMessage?.user_hotname || "");
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleOk = async () => {
    try {
      const data = {
        username: currentMessage?.from_user,
        user_hotname: hotName,
      };

      const res = await editHotName(currentMessage?.room_id, data);
      if (res.success) {
        setLoad(true);
        setIsOpen(false);
        return toast.success("Cập nhật biệt danh thành công!");
      }
      toast.error("Có lỗi xảy ra");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      title="Chỉnh sửa biệt danh"
      footer={null}
    >
      <Input
        type="text"
        placeholder="Nhập biệt danh"
        value={hotName}
        onChange={e => setHotName(e.target.value)}
      />
      <div className="flex justify-end gap-5 mt-5">
        <Button onClick={handleCancel}>Hủy bỏ</Button>
        <Button className="bg-blue-500 text-white" onClick={handleOk}>
          Cập nhật
        </Button>
      </div>
    </Modal>
  );
};

export default ModalEditHotName;
