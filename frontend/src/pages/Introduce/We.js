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
                <span>CÔNG TY DỊCH THUẬT Công ty dịch thuật A2Z</span>
                <br />
                <br />
                <span>
                    CÔNG TY DỊCH THUẬT Công ty dịch thuật A2Z Việt Nam - nhà bán lẻ hàng đầu của Nhật Bản và châu Á - đã
                    tạo được sự hiện diện mạnh mẽ tại Việt Nam từ năm 2011. Tại Công ty dịch thuật A2Z, tập trung vào
                    khách hàng là triết lý kinh doanh trung tâm của chúng tôi, để cam kết điều này, chúng tôi tập trung
                    vào việc nâng cao sự tiện lợi cho khách hàng và liên tục cung cấp các dịch vụ khách hàng tốt nhất.
                </span>
                <br />
                <br />
                <span>Các Trung tâm mua sắm của chúng tôi tại CÔNG TY DỊCH THUẬT Công ty dịch thuật A2Z:</span>
                <br />
                <br />
                <span>
                    1. Phòng 204, 64 Nguyễn Đình Chiểu, Quận 1, Tp.HCM Hướng dẫn chỉ đường: Ngã tư giao giữ Đinh Tiên
                    Hoàng và Nguyễn Đình Chiểu.
                </span>
                <br />
                <br />
                <span>
                    2. 503 Nguyễn Trãi, Thanh Xuân Nam, Thanh Xuân, Hà Nội Hướng dẫn chỉ đường: Đối diện cửa hàng Thế
                    Giới Di Động, cách phố Triều Khúc 30m, cách Cục cảnh sát điều tra tội phạm về ma túy - Bộ Công An
                    20m.
                </span>
                <br />
                <br />
                <span>
                    Đáp ứng nhu cầu của hơn 2.500 lao động. Với kế hoạch đầu tư dài hạn tại Việt Nam, chúng tôi tiếp tục
                    mở thêm 3 Trung tâm Bách hóa Tổng hợp & Siêu thị (GMS) và hơn 200 cửa hàng chuyên doanh cho đến năm
                    2025.
                </span>
            </div>
        </div>
    );
}

export default We;
