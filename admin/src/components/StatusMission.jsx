import React, { useEffect, useState } from 'react';

const StatusMission = props => {
  let { status } = props.data;
  return (
    <div className='flex justify-around'>
      <p
        className={`text-white ${
          status === 2 ? 'bg-green-500' : 'bg-orange-400'
        } p-2 rounded-md w-[100px]`}
      >
        {status === 2 ? 'Thành công' : 'Chờ duyệt'}
      </p>
    </div>
  );
};

export default StatusMission;
