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

import { levelGrid } from '../data/dummy';
import { Header } from '../components';

const axios = require('axios').default;

const Level = () => {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [deletes, setDelete] = useState(false);
    const [open, setOpen] = useState(false);
    const [list_level, setListLevel] = useState([]);

    const [name_level_new, setName_level] = useState();
    const [id_level_new, setId_level_new] = useState();
    const [price_new, setPrice_new] = useState();
    const [roses_new, setRoses] = useState();
    const [amount_new, setAmount] = useState();
    const [withdraw_per_day_new, setWithdraw_per_day] = useState();
    let [listMission, setListMission] = useState([]);
    useEffect(() => {
        fetchMission();
        return () => {
            setListMission({}); // This worked for me
        };
    }, []);

    const handleAddLevel = () => {};

    function fetchMission() {
        axios
            .get(`${SETTINGS.BASE_URL}/api/portal/level/list`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth_portal'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data.result;
                setListMission(data);
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }

    const EditMission = async () => {
        if (
            !name_level_new ||
            !id_level_new ||
            !price_new ||
            !roses_new ||
            !amount_new ||
            !withdraw_per_day_new
        ) {
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
                `${SETTINGS.BASE_URL}/api/portal/edit/level`,
                {
                    id_level_new,
                    name_level_new,
                    price_new,
                    roses_new,
                    amount_new,
                    withdraw_per_day_new,
                    type: 'add',
                },
                {
                    headers,
                }
            )
            .then(async function (response) {
                let data = response.data;
                if (data.status === 'ok') {
                    if (data.result.type === 1) {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1200);
                        setEdit(false);
                        return toast.success(
                            'Cập nhật tài khoản thành công !',
                            {
                                theme: 'light',
                            }
                        );
                    }
                }
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
            <Header category="Danh sách cấp độ" title="" />
            <button
                onClick={() => setEdit(true)}
                className="text-white bg-green-500 px-4 py-2 rounded-md mb-4 mt-[-20px]"
            >
                Thêm cấp độ
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
                    {levelGrid.map((item, index) => (
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
                                            id_level
                                        </p>
                                        <input
                                            className="p-[10px] border-solid border-2 w-full"
                                            placeholder="id_level"
                                            onChange={(e) =>
                                                setId_level_new(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-group mb-[20px]">
                                        <p className="text-left text-[#999]">
                                            Tên cấp độ
                                        </p>
                                        <input
                                            onChange={(e) =>
                                                setName_level(e.target.value)
                                            }
                                            className="p-[10px] border-solid border-2 w-full"
                                            placeholder="Tên cấp độ"
                                        />
                                    </div>
                                    <div className="form-group mb-[20px]">
                                        <p className="text-left text-[#999]">
                                            Số tiền đầu tư
                                        </p>
                                        <input
                                            onChange={(e) =>
                                                setPrice_new(e.target.value)
                                            }
                                            className="p-[10px] border-solid border-2 w-full"
                                            placeholder="Số tiền đầu tư"
                                        />
                                    </div>
                                    <div className="form-group mb-[20px]">
                                        <p className="text-left text-[#999]">
                                            Số đơn hàng trong ngày
                                        </p>
                                        <input
                                            onChange={(e) =>
                                                setAmount(e.target.value)
                                            }
                                            className="p-[10px] border-solid border-2 w-full"
                                            placeholder="Số đơn hàng trong ngày"
                                        />
                                    </div>
                                    <div className="form-group mb-[20px]">
                                        <p className="text-left text-[#999]">
                                            Hoa hồng nhận được (%)
                                        </p>
                                        <input
                                            onChange={(e) =>
                                                setRoses(e.target.value)
                                            }
                                            className="p-[10px] border-solid border-2 w-full"
                                            placeholder="Hoa hồng nhận được (%)"
                                        />
                                    </div>
                                    <div className="form-group mb-[20px]">
                                        <p className="text-left text-[#999]">
                                            Số lượt rút tiền trong ngày
                                        </p>
                                        <input
                                            onChange={(e) =>
                                                setWithdraw_per_day(
                                                    e.target.value
                                                )
                                            }
                                            className="p-[10px] border-solid border-2 w-full"
                                            placeholder="Số lượt rút tiền trong ngày"
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
