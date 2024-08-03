import React, { useEffect, useState, Fragment, useRef } from "react";
import { Header } from "../components";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";

function calculRoses(amount, roses) {
  return (Number(amount) * (roses / 100)).toFixed(2);
}

const AddProduct = () => {
  let [levels, setListLevel] = useState([]);
  const [name, setname] = useState();
  const [price, setPrice] = useState();
  const [rosess, setRoses] = useState("");
  const [vip, setVip] = useState("");
  const [imgsss, setImg] = useState();
  const [plus, setPlus] = useState();
  const [isSpecial, setIsSpecial] = useState(false);
  const [rosesSpecial, setRosesSpecial] = useState(0);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const editorRef = useRef(null);
  const [description, setDescription] = useState("");

  const handleEditorChange = (content, editor) => {
    setDescription(content);
  };

  let navigate = useNavigate();

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
      setListLevel({});
    };
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleChangeLevel = (e) => {
    if (e.target.value === "special") {
      setVip(() => e.target.value);
      setIsSpecial(() => true);
    } else {
      setVip(() => e.target.value);
      setIsSpecial(() => false);
    }
  };

  const handleChangePrice = (e) => {
    if (isSpecial) {
      setPrice(() => e.target.value);
      let newss = (Number(e.target.value) * (rosesSpecial / 100)).toFixed(2);
      setRoses(newss);
    } else {
      setPrice(e.target.value);
      let newss = calculRoses(e.target.value, plus);
      setRoses(newss);
    }
  };

  function handAddProduct() {
    const headers = {
      "x-access-token": localStorage.getItem("auth_portal"),
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/add/product`,
        { name, price, rosess, vip, imgsss, description },
        {
          headers,
        }
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === "ok") {
          if (data.result.type === 1) {
            setTimeout(() => {
              navigate("/manage/product");
            }, 1200);
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
  }

  useEffect(() => {
    let roses = levels.find((item) => {
      return item.id_level === vip;
    });
    if (roses) {
      setPlus(roses.roses);
    }
  }, [vip]);

  if (!Array.isArray(levels) || levels.length <= 0) return false;

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Thêm sản phẩm mới (Lưu ý: nhập đầy đủ thông tin từ trên xuống )" />
      <div className="border-2">
        <div className="mb-[10px] p-[10px]">
          <input
            onChange={(e) => setname(e.target.value)}
            className="w-full p-[10px] outline-0 border-1"
            type="text"
            placeholder="Nhập tên sản phẩm"
          />
        </div>
        <div className="mb-[10px] p-[10px] flex">
          <select
            onChange={(e) => handleChangeLevel(e)}
            value={vip}
            className="form-select appearance-none mr-[5px]
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
            <option>---------- Chọn cấp độ Level ----------</option>
            {levels.map((data, index) => {
              if (data.name_level === "THÀNH VIÊN MỚI") {
                return;
              }
              return (
                <option key={data.id_level} value={data.id_level}>
                  {data.name_level}
                </option>
              );
            })}
            <option value="special">ĐƠN ĐẶC BIỆT</option>
          </select>
          {isSpecial && (
            <input
              onChange={(e) => setRosesSpecial(e.target.value)}
              className="w-full p-[10px] outline-0 border-1 ml-[5px]"
              type="text"
              placeholder="Nhập % hoa hồng"
            />
          )}
        </div>
        <div className="mb-[10px] p-[10px] flex">
          <input
            onChange={(e) => handleChangePrice(e)}
            className="w-full p-[10px] outline-0 border-1 mr-[5px]"
            type="text"
            placeholder="Nhập giá sản phẩm"
          />
          <input
            value={rosess}
            className="w-full p-[10px] outline-0 border-1 ml-[5px]"
            type="text"
            placeholder="Hoa hồng nhận được"
            disabled="disabled"
          />
        </div>

        {/* <div className="mb-[10px] p-[10px]">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full p-[10px] text-sm text-gray-400 bg-white rounded-lg border border-gray-300 focus:outline-none"
            id="file_input"
            type="file"
            multiple={true}
            onChange={onSelectFile}
          />
        </div> */}
        <div className="mb-[10px] p-[10px]">
          <input
            onChange={(e) => setImg(e.target.value)}
            className="w-full p-[10px] outline-0 border-1"
            type="text"
            placeholder="Nhập link hình ảnh"
          />
        </div>
        <div className="mb-[10px] p-[10px]">
          <img
            className="w-[200px] mx-auto"
            src={imgsss || "https://i.imgur.com/9s6yfeB.png"}
            alt=""
          />
        </div>
        <p className="text-2xl mb-2  p-[10px]">Mô tả chi tiết sản phẩm</p>
        {/* <Editor
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
        <ReactQuill
          className="h-[300px] mb-[30px] p-[10px]"
          theme="snow"
          value={description}
          onChange={setDescription}
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
        <div onClick={() => handAddProduct()} className="mb-[10px] p-[10px]">
          <button className="w-[100%] bg-[#3498db] rounded-md py-[10px]">
            <p className="text-white text-center">Thêm nhiệm vụ</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
