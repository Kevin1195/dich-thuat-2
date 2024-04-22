import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
function We() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { t } = useTranslation();
    return (
        <div className="withdraw px-[15px] py-[20px] min-h-[920px] bg-[#f2f2f2]">
            <div className="bg-[#fff] text-2xl rounded-2xl py-4 px-4 leading-10">
                {/* <span>Trung tâm thương mại The Garden Shopping Center</span>
                <br />
                <br />
                <span>
                    The Garden Shopping Center là điểm đến “tất cả trong một” dành cho mọi đối tượng khách hàng, đặc biệt là gia đình,
                    phù hợp cho cả người Việt Nam và người nước ngoài tại thành phố Hồ Chí Minh. Nằm dọc theo đại lộ
                    Nguyễn Văn Linh, Quận 7, The Garden Shopping Center gồm năm tầng cung cấp các sản phẩm thời trang mới nhất, đại
                    siêu thị, hệ thống rạp phim, cũng như các cửa hàng ăn uống, giải trí, giáo dục, phong cách sống.
                </span>
                <br />
                <br />
                <span>
                    The Garden Shopping Center được liên doanh phát triển bởi Công ty Cổ phần Đầu tư Phát triển Saigon Co.op (SCID) và
                    Mapletree Investments Pte Ltd (Mapletree). Đây là một phần của dự án Saigon South Place rộng 4,4
                    hecta, khi hoàn thành sẽ bao gồm các khối văn phòng hiện đại hạng A và hệ thống căn hộ dịch vụ được
                    vận hành bởi một nhà điều hành quốc tế uy tín.
                </span> */}
            </div>
        </div>
    );
}

export default We;
