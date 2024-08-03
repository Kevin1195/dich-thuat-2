import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Footer, Navbar, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
  Orders,
  Employees,
  Customers,
  Login,
  Recharge,
  Withdraw,
  HistoryRecharge,
  HistoryWithdraw,
  AddProduct,
  Member,
  Banner,
  Settings,
  ListOrderX,
  Level,
  Bank,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import SETTINGS from "./setting.json";
import ConfirmMisssion from "./pages/ConfirmMisssion";
import AllMission from "./pages/AllMission";
import Chat from "./pages/Chat";

import { WebSocketProvider } from "./contexts/WebSocket";

import axios from "axios";

const App = (props) => {
  let [check, setCheck] = useState(true);
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const checkToken = () => {
    let accessToken = localStorage.getItem("auth_portal");
    if (!accessToken) {
      setCheck(false);
    } else {
      axios
        .get(`${SETTINGS.BASE_URL}/api/portal/check`, {
          headers: {
            "x-access-token": accessToken,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(function (response) {
          let data = response.data;
          if (data.type === 2) {
            setCheck(false);
            localStorage.removeItem("auth_portal");
            window.location.href = "/login";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    checkToken();
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        {/* <WebSocketProvider> */}
        {check && (
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{
                    background: currentColor,
                    borderRadius: "50%",
                  }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                  <Route>
                    <Route path="/" element={<Ecommerce />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/dashboard/analytics"
                      element={<Ecommerce />}
                    />
                    <Route path="/manage/product" element={<Orders />} />
                    <Route path="/missions" element={<ConfirmMisssion />} />
                    <Route path="/all/missions" element={<AllMission />} />
                    <Route path="/recharge" element={<Recharge />} />
                    <Route path="/withdraw" element={<Withdraw />} />
                    <Route
                      path="/history/recharge"
                      element={<HistoryRecharge />}
                    />
                    <Route
                      path="/history/withdraw"
                      element={<HistoryWithdraw />}
                    />
                    <Route path="/add/product" element={<AddProduct />} />
                    <Route path="/manage/members" element={<Member />} />
                    <Route path="/manage/banners" element={<Banner />} />
                    <Route path="/manage/level" element={<Level />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/bank" element={<Bank />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/listorderx/:sdt" element={<ListOrderX />} />
                  </Route>

                  {/* <Route path="/chat" element={<Chat />} /> */}
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        )}
        {!check && (
          <div>
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          </div>
        )}
        {/* </WebSocketProvider> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
