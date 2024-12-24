import {
  ColumnDirective,
  ColumnsDirective,
  ContextMenu,
  Filter,
  GridComponent,
  Inject,
  Page,
  Resize,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import React, { useEffect, useState } from "react";
import { gridAllMission, gridMission } from "../data/dummy";

import { Header } from "../components";
import SETTINGS from "../setting.json";
import axios from "axios";
import { toast } from "react-toastify";

const AllMission = () => {
  let [listMissions, setListMission] = useState([]);
  useEffect(() => {
    fetchMission();
    return () => {
      setListMission({}); // This worked for me
    };
  }, []);

  function fetchMission() {
    axios
      .get(`${SETTINGS.BASE_URL}/api/portal/missions/all`, {
        headers: {
          "x-access-token": localStorage.getItem("auth_portal"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        let data = response.data.data;
        setListMission(data);
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  }
  return (
    <div className="p-2 m-2 mt-24 bg-white rounded-md md:m-10 md:p-10">
      <Header category="Danh sách đơn hàng" title="" />
      <GridComponent
        id="gridcomp"
        dataSource={listMissions}
        allowPaging
        allowSorting
        toolbar={["Search"]}
      >
        <ColumnsDirective>
          {gridAllMission.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Toolbar, Page]} />
      </GridComponent>
    </div>
  );
};
export default AllMission;
