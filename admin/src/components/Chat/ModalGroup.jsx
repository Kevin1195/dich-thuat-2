import { Button, Form, Input, Modal, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createRoom,
  deleteFile,
  getListUser,
  updateRoom,
  uploadService,
} from "../../services/chat.services";
import { FiUpload } from "react-icons/fi";
import SETTINGS from "../../setting.json";
import ModalPreview from "./ModalPreview";

const ModalGroup = ({ isOpen, setIsOpen, selectRoom, type, setLoad }) => {
  const [users, setUsers] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [listAvatar, setListAvatar] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const [form] = Form.useForm();
  useEffect(() => {
    if (type === "edit" && selectRoom) {
      let userList = selectRoom.users.map(user => user.username);
      userList = userList.filter(item => item !== user.username);
      form.setFieldsValue({
        userList,
        name: selectRoom.name,
      });
      if (selectRoom?.avatar) {
        setListAvatar([
          {
            url: `${SETTINGS.BASE_URL}${selectRoom?.avatar}`,
          },
        ]);
        setAvatar(selectRoom?.avatar);
      }
    } else {
      form.setFieldsValue({
        userList: [],
        name: "",
        avatar: "",
      });
    }
  }, [type, selectRoom]);

  const getUsers = async () => {
    try {
      const res = await getListUser();
      if (res.status === "ok") {
        const options = res.data.map(item => {
          return {
            label: item.username,
            value: item.username,
          };
        });

        setUsers(options);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [isOpen]);

  const handleSubmit = async values => {
    try {
      if (!values?.userList?.includes(user.username)) {
        values?.userList.push(user.username);
      }
      values.avatar = avatar;
      let res;
      if (type === "edit") {
        res = await updateRoom(selectRoom.id, values);
      } else {
        res = await createRoom(values);
      }
      if (res.success) {
        setLoad(true);
        setIsOpen(false);
        form.setFieldsValue({
          userList: [],
          name: "",
        });
        return toast.success(
          `${type === "edit" ? "Cập nhật" : "Tạo"} nhóm chat thành công`,
        );
      }
      toast.error(res.message || "Có lỗi xảy ra");
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setAvatar("");
    setListAvatar([]);
  };

  const handleUploadAvatar = async e => {
    try {
      const data = new FormData();
      data.append("file", e);
      const res = await uploadService(data);
      setAvatar(res.image?.[0]);
      setListAvatar([
        {
          url: `${SETTINGS.BASE_URL}${res.image?.[0]}`,
        },
      ]);
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      const resDelete = await deleteFile({ pathName: avatar });
      if (resDelete.success) {
        setAvatar("");
        setListAvatar([]);
      } else {
        toast.error("Có lỗi xảy ra");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const handlePreview = async () => {
    setPreviewOpen(true);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      title={`${type === "edit" ? "Cập nhật" : "Tạo"} nhóm chat `}
      footer={null}
    >
      <Form onFinish={handleSubmit} layout="vertical" form={form}>
        <Form.Item name="avatar" label="Avatar" valuePropName="fileList">
          <Upload
            action={e => handleUploadAvatar(e)}
            listType="picture-circle"
            onPreview={handlePreview}
            fileList={listAvatar}
            onRemove={handleRemoveAvatar}
          >
            {listAvatar?.length > 0 ? null : <FiUpload size={30} />}
          </Upload>
          <ModalPreview
            isOpen={previewOpen}
            setIsOpen={setPreviewOpen}
            image={avatar}
          />
        </Form.Item>

        <Form.Item
          label="Tên nhóm chat"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn thành viên!",
            },
          ]}
        >
          <Input placeholder="Nhập tên nhóm chat" />
        </Form.Item>
        <Form.Item
          label="Thành viên"
          name="userList"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn thành viên!",
              type: "array",
            },
          ]}
        >
          <Select
            placeholder="Chọn thành viên"
            mode="multiple"
            showSearch
            options={users}
          />
        </Form.Item>
        <div className="flex justify-end gap-5 mt-5">
          <Button onClick={handleCancel}>Hủy bỏ</Button>
          <Button htmlType="submit" className="bg-blue-500 text-white">
            Xác nhận
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalGroup;
