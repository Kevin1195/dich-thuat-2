import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Toolbar,
  Page,
  Inject,
} from "@syncfusion/ej2-react-grids";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";

import { ordersData, ordersGrid3_3 } from "../data/dummy";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

import axios from "axios";

const HistoryWithdraw = () => {
  const { reload } = useStateContext();
  let [listMissions, setListMission] = useState([]);
  useEffect(() => {
    fetchMission();
    return () => {
      setListMission({}); // This worked for me
    };
  }, [reload]);

  function fetchMission() {
    axios
      .get(`${SETTINGS.BASE_URL}/api/portal/withdraw/list/all`, {
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

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
      <Header category="Lịch sử nạp tiền" title="" />
      <GridComponent
        id="gridcomp"
        dataSource={listMissions}
        allowPaging
        allowSorting
        toolbar={["Search"]}
      >
        <ColumnsDirective>
          {ordersGrid3_3.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Toolbar, Page]} />
      </GridComponent>
    </div>
  );
};
export default HistoryWithdraw;
