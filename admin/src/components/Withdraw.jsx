import React, { useEffect, useState } from 'react';
import SETTINGS from '../setting.json';
import { toast } from 'react-toastify';
import { useStateContext } from '../contexts/ContextProvider';
const axios = require('axios').default;

function calculRoses(amount, roses) {
  return (Number(amount) * (roses / 100)).toFixed(2);
}

const Withdraw = props => {
  let { id_txn } = props.data;
  const { setReload } = useStateContext();
  const [edit, setEdit] = useState(false);
  const [deletes, setDelete] = useState(false);
  let [lydo, setLydo] = useState('');

  const EditMission = async () => {
    const headers = {
      'x-access-token': localStorage.getItem('auth_portal'),
      'Access-Control-Allow-Origin': '*',
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/edit/withdraw`,
        { id_txn, type: 'edit' },
        {
          headers,
        },
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === 'ok') {
          if (data.result.type === 1) {
            setEdit(false);
            setReload(pre => !pre);
            return toast.success('Xác nhận đơn rút thành công !', {
              theme: 'light',
            });
          }
        }
      })
      .catch(function (error) {
        toast.error('Có lỗi xảy ra', { theme: 'light' });
      });
  };

  const DeleteMission = async () => {
    const headers = {
      'x-access-token': localStorage.getItem('auth_portal'),
      'Access-Control-Allow-Origin': '*',
    };
    axios
      .post(
        `${SETTINGS.BASE_URL}/api/portal/edit/withdraw`,
        { id_txn, type: 'delete' },
        {
          headers,
        },
      )
      .then(async function (response) {
        let data = response.data;
        if (data.status === 'ok') {
          if (data.result.type === 0) {
            setDelete(false);
            setReload(pre => !pre);
            return toast.success('Hủy đơn rút thành công !', {
              theme: 'light',
            });
          } else {
            return toast.error('Bắt buộc nhập lý do !', {
              theme: 'light',
            });
          }
        }
      })
      .catch(function (error) {
        toast.error('Có lỗi xảy ra', { theme: 'light' });
      });
  };

  return (
    <>
      <div className='flex justify-around'>
        <button onClick={() => setEdit(true)} className='bg-[#2ecc71] p-[10px]'>
          <p className='text-white'>Xác nhận</p>
        </button>
        <button
          onClick={() => setDelete(true)}
          className='bg-[#e74c3c] p-[10px]'
        >
          <p className='text-white'>Hủy bỏ</p>
        </button>
      </div>
      {edit && (
        <div>
          <div className='w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]'></div>
          <div className='fixed w-[calc(100%-30px)] lg:w-[40%] top-[30%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]'>
            <div className='relative van-dialog__content'>
              <div className='px-[31px] py-[25px]'>
                <div className='font-microsoft text-center font-bold my-[50px]'>
                  Xác nhận đã thanh toán
                </div>
                <div className='flex justify-between'>
                  <div
                    onClick={() => setEdit(false)}
                    className='w-[calc(100%)] text-center bg-[#95a5a6] mx-[15px] py-[5px] rounded-full'
                  >
                    <p className='text-white'>Hủy</p>
                  </div>
                  <div
                    onClick={() => EditMission()}
                    className='w-[calc(100%)] text-center bg-[#3498db] mx-[15px] py-[5px] rounded-full'
                  >
                    <p className='text-white'>Đồng ý</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {deletes && (
        <div>
          <div className='w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]'></div>
          <div className='fixed w-[calc(100%-30px)] lg:w-[40%] top-[30%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]'>
            <div className='relative van-dialog__content'>
              <div className='px-[31px] py-[25px]'>
                <div className='font-microsoft text-center font-bold my-[50px]'>
                  Xác nhận hủy đơn rút
                </div>
                {/* <div className="form-group mb-[20px]">
                                    <p className="text-left text-[#999]">
                                        Nhập lý do hủy
                                    </p>
                                    <input
                                        onChange={(e) =>
                                            setLydo(e.target.value)
                                        }
                                        className="p-[10px] border-solid border-2 w-full"
                                        placeholder="Lý do..."
                                        defaultValue={lydo}
                                    />
                                </div> */}
                <div className='flex justify-between'>
                  <div
                    onClick={() => setDelete(false)}
                    className='w-[calc(100%)] text-center bg-[#95a5a6] mx-[15px] py-[5px] rounded-full'
                  >
                    <p className='text-white'>Hủy</p>
                  </div>
                  <div
                    onClick={() => DeleteMission()}
                    className='w-[calc(100%)] text-center bg-[#3498db] mx-[15px] py-[5px] rounded-full'
                  >
                    <p className='text-white'>Đồng ý</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Withdraw;
