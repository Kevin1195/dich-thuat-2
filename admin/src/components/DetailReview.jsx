import React, { useState } from "react";

const DetailReview = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const review = props?.data?.review || "Không có nội dung đánh giá";

  return (
    <div className="relative w-full">
      <p
        onClick={() => setShowTooltip(true)}
        className="w-[208px] overflow-hidden text-ellipsis whitespace-nowrap"
        style={{ cursor: "pointer" }}
      >
        {review}
      </p>
      {showTooltip && (
        <div>
          <div className="w-[100%] h-[100%] fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.7)]"></div>
          <div className="fixed w-[calc(100%-30px)] lg:w-[40%] top-[30%] left-[-50%] right-[-50%] mx-auto bg-[#fff] rounded-lg z-[100]">
            <div className="relative van-dialog__content">
              <h1 className="text-[20px] w-full text-center mt-4">
                Chi tiết nhận xét
              </h1>
              <div className="px-[31px] py-[10px]">
                <p className="my-6 font-bold text-center break-words font-microsoft whitespace-break-spaces">
                  {review}
                </p>
                <div className="flex justify-between">
                  <div
                    onClick={() => setShowTooltip(false)}
                    className="w-[calc(100%)] text-center bg-[#95a5a6] mx-[15px] py-[5px] rounded-full cursor-pointer"
                  >
                    <p className="text-white ">Đóng</p>
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

export default DetailReview;
