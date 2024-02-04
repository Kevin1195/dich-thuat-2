// import React, { useEffect, useState } from 'react';
// import {
//     GridComponent,
//     ColumnsDirective,
//     ColumnDirective,
//     Resize,
//     Sort,
//     ContextMenu,
//     Filter,
//     Page,
//     Toolbar,
//     Inject,
// } from '@syncfusion/ej2-react-grids';
// import SETTINGS from '../setting.json';
// import { toast } from 'react-toastify';

// import { membersGrid } from '../data/dummy';
// import { Header } from '../components';
// import { useStateContext } from '../contexts/ContextProvider';

// const axios = require('axios').default;

// const Member = () => {
//     const { reload } = useStateContext();
//     let [listMission, setListMission] = useState([]);
//     useEffect(() => {
//         fetchMission();
//         return () => {
//             setListMission({}); // This worked for me
//         };
//     }, [reload]);

//     function fetchMission() {
//         axios
//             .get(`${SETTINGS.BASE_URL}/api/portal/list/users/all`, {
//                 headers: {
//                     'x-access-token': localStorage.getItem('auth_portal'),
//                     'Access-Control-Allow-Origin': '*',
//                 },
//             })
//             .then(function (response) {
//                 let data = response.data.result;
//                 setListMission(data);
//             })
//             .catch(function (error) {
//                 toast.error('Có lỗi xảy ra', { theme: 'light' });
//             });
//     }
//     return (
//         <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
//             <Header category="Danh sách thành viên" title="" />
//             <GridComponent
//                 id="gridcomp"
//                 dataSource={listMission}
//                 allowTextWrap={true}
//                 allowPaging
//                 allowSorting
//                 allowKeyboard={false}
//                 toolbar={['Search']}
//             >
//                 <ColumnsDirective>
//                     {membersGrid.map((item, index) => (
//                         <ColumnDirective key={index} {...item} />
//                     ))}
//                 </ColumnsDirective>
//                 <Inject
//                     services={[
//                         Resize,
//                         Sort,
//                         ContextMenu,
//                         Filter,
//                         Toolbar,
//                         Page,
//                     ]}
//                 />
//             </GridComponent>
//         </div>
//     );
// };
// export default Member;

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
import ReactPaginate from "react-paginate";

import { membersGrid } from "../data/dummy";
import { Header } from "../components";
import { ContextLevelList } from "../contexts/ContextLevelList";
import { useStateContext } from "../contexts/ContextProvider";
import "./Pagination.scss";

const axios = require("axios").default;

const Member = () => {
  const { reload } = useStateContext();
  let [listMission, setListMission] = useState([]);
  const [page, setpage] = useState(0);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    fetchMission(page);
    return () => {
      setListMission({}); // This worked for me
    };
  }, [reload, page]);

  const handlePageClick = (event) => {
    setpage(() => event.selected);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    fetchMission(0, search);
  };

  function fetchMission(page, search) {
    axios
      .get(`${SETTINGS.BASE_URL}/api/portal/list/users/all`, {
        params: { page, search },
        headers: {
          "x-access-token": localStorage.getItem("auth_portal"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        let { status, data, totalPage } = response.data;
        if (status) {
          setListMission(data);
          setTotalPage(totalPage);
        } else {
          toast.error(response.data.msg, { theme: "light" });
        }
      })
      .catch(function (error) {
        toast.error("Có lỗi xảy ra", { theme: "light" });
      });
  }
  return (
    <ContextLevelList>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
        <Header category="Danh sách thành viên" title="" />
        <form onSubmit={handleSubmitSearch} className="mb-4">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-sm focus:outline-none p-2 w-[500px]"
            placeholder="Tài khoản || Id_user || Mã mời"
            autoComplete="new-password"
          />
          <button className="bg-blue-500 ml-4 text-white rounded-md px-4 py-2">
            Tìm
          </button>
        </form>
        <GridComponent id="gridcomp" dataSource={listMission} allowSorting>
          <ColumnsDirective>
            {membersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu]} />
        </GridComponent>
        <ReactPaginate
          breakLabel="..."
          className="pagination"
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={totalPage}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </ContextLevelList>
  );
};
export default Member;
