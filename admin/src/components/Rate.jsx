import { FaRegStar, FaStar } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

const RateMission = (props) => {
  let { rate } = props?.data;
  return (
    <div className="flex justify-center my-4">
      {Array.from({ length: rate || 1 }, (_, index) => (
        <div key={index}>
          <FaStar size={35} className="w-4 text-yellow-500" />
        </div>
      ))}
    </div>
  );
};

export default RateMission;
