import React, { useEffect, useState } from "react";
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
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";

import { customersData, ordersGrid2_2 } from "../data/dummy";
import { Header } from "../components";

const axios = require("axios").default;

const HistoryRecharge = () => {
  let [listMissions, setListMission] = useState([]);
  useEffect(() => {
    fetchMission();
    return () => {
      setListMission({}); // This worked for me
    };
  }, []);

  function fetchMission() {
    axios
      .get(`${SETTINGS.BASE_URL}/api/portal/recharge/list/all`, {
        headers: {
          "x-access-token": localStorage.getItem("auth_portal"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        let data = response.data.result;
        setListMission(data);
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  }

  const toolbarOptions = ["Search"];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
      <Header category="Lịch sử nạp tiền" title="" />
      <GridComponent
        id="gridcomp"
        dataSource={listMissions}
        allowPaging
        allowSorting
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {ordersGrid2_2.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Toolbar, Page]} />
      </GridComponent>
    </div>
  );
};
export default HistoryRecharge;
