import React, { useEffect, useRef, useState } from "react";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import ReactQuill from "react-quill";
const axios = require("axios").default;

function calculRoses(amount, roses) {
  return (Number(amount) * (roses / 100)).toFixed(2);
}

const EditProduct = props => {
  let {
    id_mission,
    name_mission,
    price,
    image,
    receive,
    level_mission,
    description,
  } = props.data;
  const [edit, setEdit] = useState(false);
  const [deletes, setDelete] = useState(false);
  let [list_level, setListLevel] = useState([]);

  let [name_new, setName] = useState(name_mission);
  let [roses_new, setRoses] = useState(receive);
  let [price_new, setPrice] = useState(price);
  let [vip_new, setVip] = useState(level_mission);
  let [img_new, setImg] = useState(image);
  const [descriptionNew, setDescriptionNew] = useState(description);

  const handleEditorChange = (content, editor) => {
    setDescriptionNew(content);
  };
  const editorRef = useRef(null);
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
      setListLevel([]); // This worked for me
    };
  }, []);

  let roses = list_level?.find(item => {
    return item.id_level === level_mission;
  });
  const handleChange = event => {
    setVip(event.target.value);
  };
  const EditMission = async () => {
    const headers = {
      "x-access-token": localStorage.getItem("auth_portal"),
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/edit/mission`,
        {
          id_mission,
          name_new,
          roses_new,
          price_new,
          vip_new,
          img_new,
          description: descriptionNew,
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
            return toast.success("Cập nhật nhiệm vụ thành công !", {
              theme: "light",
            });
          }
          toast.success("Đã tìm thấy 1 đơn hàng!", {
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
        `${SETTINGS.BASE_URL}/api/portal/edit/mission`,
        {
          id_mission,
          name_new,
          roses_new,
          price_new,
          vip_new,
          description: descriptionNew,
          type: "delete",
        },
        {
          headers,
        },
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === "ok") {
          if (data.result.type === 0) {
            setTimeout(() => {
              window.location.reload();
            }, 1200);
            setDelete(false);
            return toast.success("Xóa nhiệm vụ thành công !", {
              theme: "light",
            });
          }
          toast.success("Đã tìm thấy 1 đơn hàng!", {
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
        <button onClick={() => setEdit(true)} className="bg-[#3498db] p-[10px]">
          <p className="text-white">Sửa</p>
        </button>
        <button
          onClick={() => setDelete(true)}
          className="bg-[#e74c3c] p-[10px]"
        >
          <p className="text-white">Xóa</p>
        </button>
      </div>
      {edit && (
        <div>
          <div className="w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]"></div>
          <div className="fixed w-[calc(100%-30px)] lg:w-[calc(50%-30px)] top-[5%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]">
            <div className="relative van-dialog__content">
              <div className="px-[31px] py-[25px]">
                <div>
                  <div className="form-group mb-[20px]">
                    <input
                      onChange={e => setName(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Tên sản phẩm"
                      defaultValue={name_mission}
                    />
                  </div>
                  <div className="form-group mb-[20px]">
                    <input
                      onChange={e => {
                        let arr = calculRoses(e.target.value, roses.roses);
                        setRoses(arr);
                        setPrice(e.target.value);
                      }}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Giá sản phẩm"
                      defaultValue={price}
                    />
                  </div>
                  <div className="form-group mb-[20px]">
                    <input
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Hoa hồng nhận được"
                      value={roses_new || receive}
                    />
                  </div>
                  <div className="form-group my-[25px]">
                    <select
                      onChange={e => handleChange(e)}
                      value={vip_new || level_mission}
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
                  <div className="form-group mb-[20px]">
                    <input
                      onChange={e => setImg(e.target.value)}
                      className="p-[10px] border-solid border-2 w-full"
                      placeholder="Link Hình Ảnh"
                      defaultValue={img_new}
                    />
                  </div>
                  <div className="form-group mb-[20px]">
                    <img className="w-[200px] mx-auto" src={img_new} alt="" />
                  </div>
                </div>
                <p className="text-xl mb-2 text-left">
                  Mô tả chi tiết sản phẩm
                </p>
                <ReactQuill
                  className="h-[300px] mb-[50px] "
                  theme="snow"
                  value={descriptionNew}
                  onChange={setDescriptionNew}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link"],
                      ["clean"],
                    ],
                    clipboard: {
                      // toggle to add extra line breaks when pasting HTML:
                      matchVisual: false,
                    },
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                  ]}
                />
                {/* <Editor
                  initialValue={description}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onEditorChange={handleEditorChange}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | emoticons| help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                /> */}
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
                  Xác nhận xóa nhiệm vụ
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

export default EditProduct;
