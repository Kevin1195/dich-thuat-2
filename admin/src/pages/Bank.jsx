import React, { useEffect, useState } from 'react';
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
} from '@syncfusion/ej2-react-grids';
import SETTINGS from '../setting.json';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import { bankList } from '../data/dummy';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const axios = require('axios').default;

const Level = () => {
    const navigate = useNavigate();
    const { reload, setReload } = useStateContext();
    const [edit, setEdit] = useState(false);

    const [nameBank, setNameBank] = useState();
    let [listMission, setListMission] = useState([]);

    useEffect(() => {
        axios
            .get(`${SETTINGS.BASE_URL}/api/portal/list/bank`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth_portal'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let { status, list } = response.data.result;
                if (status) {
                    setListMission(list);
                }
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }, [reload]);

    const handleAddLevel = () => {};

    const EditMission = async () => {
        if (!nameBank) {
            return toast.warn('Vui long nhập đầy đủ thông tin', {
                theme: 'light',
            });
        }
        const headers = {
            'x-access-token': localStorage.getItem('auth_portal'),
            'Access-Control-Allow-Origin': '*',
        };
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/portal/edit/bank`,
                {
                    name: nameBank,
                    type: 'add',
                },
                {
                    headers,
                }
            )
            .then(async function (response) {
                let { status, msg } = response.data.result;
                if (status) {
                    setReload((pre) => !pre);
                    setEdit(false);
                    return toast.success(msg, {
                        theme: 'light',
                    });
                }
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
            <Header category="Danh sách ngân hàng" title="" />
            <button
                onClick={() => setEdit(true)}
                className="text-white bg-green-500 px-4 py-2 rounded-md mb-4 mt-[-20px]"
            >
                Thêm ngân hàng
            </button>
            <GridComponent
                id="gridcomp"
                dataSource={listMission}
                allowPaging
                allowSorting
                allowKeyboard={false}
                toolbar={['Search']}
            >
                <ColumnsDirective>
                    {bankList.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject
                    services={[
                        Resize,
                        Sort,
                        ContextMenu,
                        Filter,
                        Toolbar,
                        Page,
                    ]}
                />
            </GridComponent>
            {edit && (
                <div>
                    <div className="w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]"></div>
                    <div className="fixed w-[calc(100%-30px)] lg:w-[calc(50%-30px)] top-[2%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]">
                        <div className="relative van-dialog__content">
                            <div className="px-[31px] py-[25px]">
                                <div>
                                    <div className="form-group mb-[20px]">
                                        <p className="text-left text-[#999]">
                                            Tên ngân hàng
                                        </p>
                                        <input
                                            className="p-[10px] border-solid border-2 w-full"
                                            placeholder="Tên ngân hàng"
                                            onChange={(e) =>
                                                setNameBank(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
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
                                        <p className="text-white">Thêm mới</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Level;
