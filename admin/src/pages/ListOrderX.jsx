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

import { ordersData, ordersGrid4 } from '../data/dummy';
import { Header } from '../components';
import { ListOrder } from '.';
import { useParams } from 'react-router-dom';

const axios = require('axios').default;

const ListOrderX = () => {
    let { sdt } = useParams();

    if (sdt == undefined) {
        sdt = 0;
    }
    //console.log(sdt);
    let [listMissions, setListMission] = useState([]);
    useEffect(() => {
        fetchMission();
        return () => {
            setListMission({}); // This worked for me
        };
    }, []);

    function fetchMission() {
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/portal/listorder`,
                { sdt },
                {
                    headers: {
                        'x-access-token': localStorage.getItem('auth_portal'),
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            )
            .then(function (response) {
                let data = response.data.result;
                // console.log(JSON.stringify(data));
                setListMission(data);
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
            <Header category={'Danh sách đơn hàng của ' + sdt} title="" />
            <GridComponent
                id="gridcomp"
                dataSource={listMissions}
                allowPaging
                allowSorting
                toolbar={['Search']}
            >
                <ColumnsDirective>
                    {ordersGrid4.map((item, index) => (
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
        </div>
    );
};
export default ListOrderX;
