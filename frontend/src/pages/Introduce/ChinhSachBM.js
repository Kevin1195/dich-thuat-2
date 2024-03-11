import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
function ChinhSachBM() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { t } = useTranslation();
    return (
        <div className="withdraw px-[15px] py-[20px] min-h-[920px] bg-[#f2f2f2]">
            <div className="bg-[#fff] text-2xl rounded-2xl py-4 px-4 leading-10">
                {/* <span>
                    <b>Chính sách</b>
                </span>
                <br />
                <span>
                    <b>Bảo mật thông tin</b>
                </span>
                <br />
                <span>
                    Bản cập nhật ngày: 31/8/2022 Chính sách bảo mật thông tin này (“Chính Sách”) được sử dụng với mục
                    đích giúp người dùng hiểu rõ những thông tin mà Công ty TNHH Indochina Mall Việt Nam (Sau đây gọi là
                    “Indochina Mall Vietnam” hoặc “chúng tôi”) thu thập và đảm bảo an toàn thông tin cá nhân cho người dùng
                    khi truy cập và/hoặc sử dụng ứng dụng di động của công ty TNHH Indochina Mall Việt Nam (“Ứng dụng điện
                    thoại của Indochina Mall Vietnam”). Người dùng có trách nhiệm thông báo kịp thời cho chúng tôi về những
                    hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật của bên thứ ba về việc sử dụng Ứng dụng điện
                    thoại của Indochina Mall Vietnam để có biện pháp giải quyết phù hợp.
                </span>
                <br />
                <br />
                <span>
                    <b>1. Cách thức, mục đích và phạm vi thu thập thông tin:</b>
                </span>
                <br />
                <span>
                    Người dùng khi sử dụng Ứng dụng điện thoại của Indochina Mall Vietnam có thể được yêu cầu cung cấp các
                    thông tin như: Họ tên, email, số điện thoại, mật khẩu đăng nhập và các thông tin khác khi đăng ký
                    tài khoản để chúng tôi có thể định danh, xác minh thông tin, hỗ trợ, liên hệ và trao đổi thông tin
                    với người dùng trong quá trình cung cấp dịch vụ. Theo yêu cầu của chúng tôi, người dùng cần cam kết
                    rằng các thông tin cung cấp cho ứng dụng là đúng, chính xác và đầy đủ với những nội dung tại thời
                    điểm được yêu cầu. Khi đồng ý cung cấp những thông tin đã nêu trên thì chúng tôi hiểu rằng người
                    dùng đã đồng ý để chúng tôi thu thập và sử dụng thông tin đó theo mục đích và phạm vi nêu tại Chính
                    Sách này. Những sai lệch về thông tin có thể sẽ ảnh hưởng tới quyền lợi của bạn và chúng tôi sẽ
                    không chiu trách nhiệm trong những trường hợp đó. Indochina Mall Vietnam sử dụng thông tin người dùng
                    cung cấp để phục vụ các mục đích:
                </span>
                <br />
                <span>• Cung cấp các dịch vụ/tiện ích phù hợp đến từng người dùng.</span>
                <br />
                <span>
                    • Gửi các thông báo về các hoạt động trao đổi thông tin giữa người dùng và Indochina Mall Vietnam để
                    người dùng theo dõi quá trình trao đổi thông tin này và để thông báo rằng Indochina Mall Vietnam đã ghi
                    nhận những thông tin đó.
                </span>
                <br />
                <span>• Liên lạc và giải quyết với người dùng trong những trường hợp đặc biệt.</span>
                <br />
                <span>
                    • Xác nhận và liên hệ có liên quan đến giao dịch tại Ứng dụng đi động của Indochina Mall Vietnam.
                </span>
                <br />
                <span>
                    • Để gửi đến người dùng các thông tin về chương trình khuyến mại, hoạt động, sự kiện đang và sắp
                    diễn ra, nghiên cứu, khảo sát của Indochina Mall Vietnam và/ hoặc bên liên kết và/ hoặc đối tác của
                    chúng tôi qua hình thức email hoặc tin nhắn văn bản, thông báo trên Ứng dụng.
                </span>
                <br />
                <span>• Bất kỳ mục đích nào mà đã được người dùng đồng ý.</span>
                <br />
                <span>
                    Indochina Mall Việt Nam có trách nhiệm hợp tác cung cấp thông tin cá nhân của người dùng khi có yêu cầu
                    từ cơ quan Nhà nước có thẩm quyền hoặc các trường hợp khác theo quy định của pháp luật. Để thực hiện
                    các mục đích nêu trên, chúng tôi sẽ xem xét chia sẻ thông tin với các công ty đối tác của
                    Indochina Mall Vietnam. Thông tin có thể được chia sẻ cho bên thứ ba mà chúng tôi hợp tác để phát triển
                    Ứng dụng di động của Indochina Mall Việt Nam. Tuy nhiên, trong trường hợp này, chúng tôi sẽ cố gắng để
                    đảm bảo người nhận không thể lợi dụng thông tin của người dùng để thực hiện các mục đích vượt quá
                    phạm vi sử dụng mà người dùng đã cho phép, chúng tôi cũng sẽ đảm bảo họ sẽ không sử dụng những thông
                    tin này vào những mục đích trái phép
                </span>
                <br />
                <br />
                <span>
                    <b>2. Lưu trữ thông tin và chỉnh sửa dữ liệu cá nhân:</b>
                </span>
                <br />
                <span>
                    Dữ liệu cá nhân của người dùng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ theo quy định pháp luật
                    hoặc bởi người dùng. Còn lại trong mọi trường hợp thông tin cá nhân của người dùng sẽ được bảo mật
                    trên máy chủ của Indochina Mall MALL Vietnam và máy chủ của Chương trình Khách hàng Thân thiết
                    Indochina Mall MALL Vietnam. Người dùng có quyền sử dụng các dịch vụ và tiện ích đươc cung cấp bởi Ứng
                    dụng di động của Indochina Mall Vietnam, thay đổi, cập nhật, xóa bỏ thông tin cá nhân đã cung cấp trên
                    hệ thống dữ liệu của Ứng dụng di động của Indochina Mall Vietnam bằng cách đăng nhập vào tài khoản cá
                    nhân. Người dùng có quyền gửi khiếu nại đến địa chỉ website https://Indochina Mall.com hoặc thông qua
                    Ứng dụng di động của Indochina Mall Vietnam. Khi tiếp nhận những phản hồi này, chúng tôi sẽ xác nhận
                    lại thông tin; trường hợp đúng như phản ánh của người dùng, tùy theo mức độ, Indochina Mall Việt Nam sẽ
                    có những biện pháp xử lý kịp thời.
                </span>
                <br />
                <br />
                <span>
                    <b>3. Đường liên kết đến bên thứ ba:</b>
                </span>
                <br />
                <span>
                    Ứng dụng điện thoại của Indochina Mall Vietnam có thể chứa đường liên kết đến các trang web, ứng dụng
                    của bên thứ ba và dịch vụ trực tuyến không do Indochina Mall Vietnam sở hữu hoặc kiểm soát. Indochina Mall
                    Vietnam không kiểm soát và không có trách nhiệm đối với những trang web và ứng dụng trực tuyến này.
                    Hãy lưu ý khi rời khỏi Ứng dụng di động của Indochina Mall. Người dùng được khuyến nghị đọc kỹ các điều
                    khoản và chính sách của từng trang web, ứng dụng và dịch vụ trực tuyến của bên thứ ba mà bạn truy
                    cập.
                </span>
                <br />
                <span>4. Trò chơi ngắn</span>
                <br />
                <br />
                <span>
                    - Ứng dụng điện thoại của Indochina Mall Vietnam có các trò chơi ngắn bao gồm Lucky wheel, Quiz game và
                    Hado. Đây là các trò chơi ngắn được sở hữu và phát hành bởi từng trung tâm thương mại và mỗi trung
                    tâm thương mại hoàn toàn chịu trách nhiệm giải quyết mọi khiếu nại của người dùng có liên quan đến
                    trò chơi ngắn được phát hành. Tất cả thông tin khách hàng cung cấp trong các trò chơi ngắn sẽ được
                    tuân thủ theo chính sách bảo mật thông tin này.
                </span>
                <br />
                <span>
                    - Trường hợp người dùng cần khiếu nại về các mini game này, hãy liên hệ tới bộ phận phụ trách của
                    từng Trung tâm thương mại . Chi tiết thông tin liên hệ được cung cấp cụ thể trong mỗi game.
                </span>
                <br />
                <span>- Phía Apple/Google không tham gia vào các mini game này dưới bất kỳ hình thức nào.</span>
                <br />
                <br />
                <span>
                    <b>5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</b>
                </span>
                <br />
                <span>CÔNG TY TNHH Indochina Mall VIỆT NAM</span>
                <br />
                <span>
                    Địa chỉ: Tầng 3, Văn phòng phía Đông, Indochina Mall Long Biên, số 27 đường Cổ Linh, Phường Long Biên,
                    Quận Long Biên, Thành phố Hà Nội, Việt Nam
                </span>
                <br />
                <br />
                <span>Email: nbs@Indochina Mall-vn.com</span>
                <br />
                <span>Indochina Mall VIETNAM CO., LTD</span>
                <br />
                <br />
                <span>
                    <b>6. Cam kết bảo mật thông tin cá nhân người dùng</b>
                </span>
                <br />
                <span>
                    Thông tin cá nhân của khách hàng trên Ứng dụng di động Indochina Mall Vietnam được cam kết bảo mật
                    tuyệt đối theo chính sách bảo vệ thông tin cá nhân của ứng dụng. Việc thu thập và sử dụng thông tin
                    của mỗi người dùng ngoài mục đích đã nêu tại chính sách bảo mật thông tin này chỉ được thực hiện khi
                    có sự đồng ý của người dùng đó, trừ những trường hợp pháp luật có quy định khác. Không sử dụng,
                    không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của người dùng khi
                    không có sự cho phép đồng ý từ người dùng ngoại trừ trường hợp phải thực hiện theo yêu cầu của các
                    cơ quan Nhà nước có thẩm quyền theo quy định của pháp luật hoặc đã được người dùng đồng ý dựa trên
                    những điều khoản trong chính sách này. Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công
                    dẫn đến mất mát dữ liệu cá nhân người dùng, Indochina Mall Vietnam sẽ có trách nhiệm thông báo vụ việc
                    cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho người dùng được biết. Để Ban quản lý
                    Indochina Mall Việt Nam có thể giải quyết các yêu cầu/khiếu nại của các cá nhân/tổ chức thì khi liên hệ
                    với chúng tôi, người dùng vui lòng cung cấp đầy đủ thông tin cá nhân có liên quan như: Họ và tên,
                    địa chỉ liên lạc, điện thoại… và chịu trách nhiệm về những thông tin trên. Ban quản lý Indochina Mall
                    Vietnam không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi
                    của khách hàng đó nếu xét thấy tất cả thông tin cá nhân của người dùng đó cung cấp khi liên hệ ban
                    đầu là không chính xác.
                </span>
                <br />
                <br />
                <span>
                    <b>7. Cập nhật</b>
                </span>
                <br />
                <span>
                    Trong quá trình cập nhật ứng dụng, các Chính Sách này có thể sẽ được cập nhật để thay thế cho các
                    quy định và điều khoản ban đầu. Vui lòng truy cập ứng dụng phiên bản mới nhất để xem nội dung chi
                    tiết của bản cập nhật.
                </span> */}
            </div>
        </div>
    );
}

export default ChinhSachBM;
