import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { ordersData, bannerGrid } from "../data/dummy";
import React, { useEffect, useState } from "react";
import { Header } from "../components";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Banner = () => {
  let [banner, setBanner] = useState([]);
  const [link, setLink] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${SETTINGS.BASE_URL}/api/webapi/list/banner`)
      .then(async function (response) {
        let data = response.data.data;
        setBanner(data);
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
    return () => {
      setBanner({});
    };
  }, []);

  function handAddProduct() {
    const headers = {
      "x-access-token": localStorage.getItem("auth_portal"),
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/add/banner`,
        { link },
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
            return toast.success("Thêm banner thành công !", {
              theme: "light",
            });
          }
        }
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Thêm Banner mới" />

      <div className="border-2">
        <div className="mb-[10px] p-[10px]">
          <input
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-[10px] outline-0 border-1"
            type="text"
            placeholder="Nhập link hình ảnh"
          />
        </div>
        <div className="mb-[10px] p-[10px]">
          <img
            className="w-[200px] mx-auto"
            src={link || "https://i.imgur.com/9s6yfeB.png"}
            alt=""
          />
        </div>
        <div onClick={() => handAddProduct()} className="mb-[10px] p-[10px]">
          <button className="w-[100%] bg-[#3498db] rounded-md py-[10px]">
            <p className="text-white text-center">Thêm hình ảnh</p>
          </button>
        </div>
      </div>

      <GridComponent
        id="gridcomp"
        dataSource={banner}
        allowPaging
        allowSorting
        toolbar={["Search"]}
      >
        <ColumnsDirective>
          {bannerGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Toolbar, Page]} />
      </GridComponent>
    </div>
  );
};
export default Banner;
