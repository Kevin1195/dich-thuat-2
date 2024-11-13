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
                <span>COEX MALL</span>
                <br />
                <br />
                <span>
                    COEX MALL Việt Nam - nhà bán lẻ hàng đầu của Nhật Bản và châu Á - đã tạo được sự hiện diện mạnh mẽ
                    tại Việt Nam từ năm 2011. Tại Công ty COEX MALL, tập trung vào khách hàng là triết lý kinh doanh
                    trung tâm của chúng tôi, để cam kết điều này, chúng tôi tập trung vào việc nâng cao sự tiện lợi cho
                    khách hàng và liên tục cung cấp các dịch vụ khách hàng tốt nhất.
                </span>
                <br />
                <br />
                <span>Các Trung tâm mua sắm của chúng tôi tại COEX MALL:</span>
                <br />
                <br />
                <span>1. Địa chỉ: 513 Yeongdong-daero, Gangnam District, Seoul, Hàn Quốc</span>
                <br />
                <br />
                {/* <span>2. ĐỊA CHỈ: 48/10 Nguyễn Biểu, Phường 1, Quận 5</span>
                <br />
                <br />
                <span>3. ĐỊA CHỈ: 361/31 Lê Quang Định, Phường 5, Quận Bình Thạnh</span>
                <br />
                <br /> */}
                <span>
                    Đáp ứng nhu cầu của hơn 2.500 lao động. Với kế hoạch đầu tư dài hạn tại Việt Nam, chúng tôi tiếp tục
                    mở thêm 3 Trung tâm Bách hóa Tổng hợp & Siêu thị (GMS) và hơn 200 cửa hàng chuyên doanh cho đến năm
                    2025.
                </span>
                <br />
                <br />
                <span>
                    @2023 - Bản quyền của COEX MALL Giấy chứng nhận đăng ký kinh doanh số 0317601810 do Sở Kế hoạch và
                    Đầu tư Thành phố Hồ Chí Minh cấp ngày 09/12/2022
                </span>
            </div>
        </div>
    );
}

export default We;
