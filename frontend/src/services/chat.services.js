import { instance } from '../helper/axios';

// tạo phòng
export const createRoom = async (data) => {
    return await instance.post(`/room`, data);
};

// cập nhật phòng
export const updateRoom = async (id, data) => {
    return await instance.put(`/room/${id}`, data);
};
// chi tiết phòng
export const getRoomById = async (id, data) => {
    return await instance.get(`/room/${id}`, data);
};

export const getUserInfo = async () => {
    return await instance.get(`/webapi/userInfo`);
};

// xóa phòng
export const deleteRoom = async (id) => {
    return await instance.delete(`/room/${id}`);
};
// danh sách phòng của user
export const getUserRoom = async () => {
    return await instance.get(`/room/user`);
};
// thêm user vào phòng
export const addUserToRoom = async (id, data) => {
    return await instance.put(`/room/user/${id}`, data);
};
// thêm nhiều user vào phòng
export const addMultiUserToRoom = async (id, data) => {
    return await instance.put(`/room/user/multiple/${id}`, data);
};
// sửa biệt danh
export const editHotName = async (id, data) => {
    return await instance.put(`/room/user/hotname/${id}`, data);
};
// khai trừ khỏi đảng
export const deleteUserFromRoom = async (id, data) => {
    return await instance.put(`/room/user/remove/${id}`, data);
};
// lấy danh sách tin nhắn của phòng
export const getRoomMessage = async (id) => {
    return await instance.get(`/room/message/${id}`);
};
// gửi tin nhắn vào phòng
export const createMessage = async (id, data) => {
    return await instance.post(`/room/message/${id}`, data);
};
// cập nhật tin nhắn
export const updateMessageRequest = async (id, data) => {
    return await instance.put(`/room/message/${id}`, data);
};
// xóa tin nhắn
export const deleteMessage = async (id) => {
    return await instance.delete(`/room/message/${id}`);
};

export const getListUser = async () => {
    return await instance.get(`/portal/users/all`);
};

export const uploadService = async (data) => {
    return await instance.post(`/room/upload`, data);
};

export const checkCreateRoom = async (data) => {
    return await instance.post(`/room/check`, data);
};
