import React, { useEffect, useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";

import { Stacked, Button, SparkLine } from "../components";
import { SparklineAreaData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import SETTINGS from "../setting.json";
import { toast } from "react-toastify";
const axios = require("axios").default;
function formatMoney(money = 0) {
  return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  let [analytics, setAnalytics] = useState([]);
  useEffect(() => {
    axios
      .get(`${SETTINGS.BASE_URL}/api/portal/list/analytics`, {
        headers: {
          "x-access-token": localStorage.getItem("auth_portal"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(async function (response) {
        let data = response.data.result;
        setAnalytics(data);
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
    return () => {
      setAnalytics({});
    };
  }, []);

  return (
    <div>
      <div className="w-full min-h-[300px] mt-[50px] p-4 rounded-2xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="w-full border-1 border-[#2980b9] bg-[#7352FF] rounded-sm p-[5px]">
            <p className="text-white">Tổng thành viên</p>
            <p className="text-white text-[20px] font-semibold">
              {formatMoney(analytics.total_users)}
            </p>
          </div>
          <div className="w-full border-1 border-[#2980b9] bg-[#7352FF] rounded-sm p-[5px]">
            <p className="text-white">Tổng nạp tiền</p>
            <p className="text-white text-[20px] font-semibold">
              {formatMoney(analytics.total_recharge)}
            </p>
          </div>
          <div className="w-full border-1 border-[#2980b9] bg-[#7352FF] rounded-sm p-[5px]">
            <p className="text-white">Tổng rút tiền</p>
            <p className="text-white text-[20px] font-semibold">
              {formatMoney(analytics.total_withdraw)}
            </p>
          </div>
          <div className="w-full border-1 border-[#2980b9] bg-[#7352FF] rounded-sm p-[5px]">
            <p className="text-white">Thành viên mới đăng ký</p>
            <p className="text-white text-[20px] font-semibold">
              {formatMoney(analytics.today_users)}
            </p>
          </div>
          <div className="w-full border-1 border-[#2980b9] bg-[#7352FF] rounded-sm p-[5px]">
            <p className="text-white">Tổng nạp hôm nay</p>
            <p className="text-white text-[20px] font-semibold">
              {formatMoney(analytics.today_recharge)}
            </p>
          </div>
          <div className="w-full border-1 border-[#2980b9] bg-[#7352FF] rounded-sm p-[5px]">
            <p className="text-white">Tổng rút hôm nay</p>
            <p className="text-white text-[20px] font-semibold">
              {formatMoney(analytics.today_withdraw)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <div className="flex gap-10 flex-wrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Revenue Updates</p>
              <div className="flex items-center gap-4">
                <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                  <span>
                    <GoPrimitiveDot />
                  </span>
                  <span>Expense</span>
                </p>
                <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                  <span>
                    <GoPrimitiveDot />
                  </span>
                  <span>Budget</span>
                </p>
              </div>
            </div>
            <div className="mt-10 flex gap-10 flex-wrap justify-center">
              <div className=" border-r-1 border-color m-4 pr-10">
                <div>
                  <p>
                    <span className="text-3xl font-semibold">$93,438</span>
                    <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                      23%
                    </span>
                  </p>
                  <p className="text-gray-500 mt-1">Budget</p>
                </div>
                <div className="mt-8">
                  <p className="text-3xl font-semibold">$48,487</p>

                  <p className="text-gray-500 mt-1">Expense</p>
                </div>

                <div className="mt-5">
                  <SparkLine
                    currentColor={currentColor}
                    id="line-sparkLine"
                    type="Line"
                    height="80px"
                    width="250px"
                    data={SparklineAreaData}
                    color={currentColor}
                  />
                </div>
                <div className="mt-10">
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Download Report"
                    borderRadius="10px"
                  />
                </div>
              </div>
              <div>
                <Stacked
                  currentMode={currentMode}
                  width="320px"
                  height="360px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
