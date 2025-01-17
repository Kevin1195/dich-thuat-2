import Address from '../pages/My/Address';
import ChinhSachBM from '../pages/Introduce/ChinhSachBM';
import ComfirmOrder from '../pages/Order/ComfirmOrder';
import Desc from '../pages/Introduce/Desc';
import DetailChat from '../pages/My/DetailChat';
import DieuKhoan from '../pages/Introduce/DieuKhoan';
import EditPassword from '../pages/My/EditPassword';
import EditPwTransaction from '../pages/My/EditPwTransaction';
import FinancialDetails from '../pages/My/FinancialDetails';
import FormRecharge from '../pages/My/FormRecharge';
import Guide from '../pages/My/Guide';
import History from '../pages/Order/History';
import HistoryRechargeWithdraw from '../pages/Order/HistoryRechargeWithdraw';
import HistoryRut from '../pages/Order/HistoryRut';
import HoSoCT from '../pages/My/HoSoCT';
import Home from '../pages/Home';
import HopTacDaiLy from '../pages/My/HopTacDaiLy';
import Login from '../pages/Account/Login';
import Members from '../pages/My/Members';
import MoPhongDT from '../pages/Introduce/MoPhongDT';
import MoTaQuyTac from '../pages/My/MoTaQuyTac';
import My from '../pages/My';
import MyBank from '../pages/My/MyBank';
import MyQRCode from '../pages/My/QRCode';
import NangCapHV from '../pages/My/NangCapHV';
import NotFound from '../pages/NotFound';
import Order from '../pages/Order';
import OrderRedirect from '../pages/Order/OrderRedirect';
import PhanPhoi from '../pages/Introduce/PhanPhoi';
import Recharge from '../pages/My/Recharge';
import Register from '../pages/Account/Register';
import RotationLuck from '../pages/RotationLuck/RotationLuck';
import Service from '../pages/My/Service';
import Settings from '../pages/My/Settings';
import Support from '../pages/My/Support';
import System from '../pages/System';
import SystemInformation from '../pages/System/Support';
import TaiChinh from '../pages/Introduce/TaiChinh';
import ThongTinCT from '../pages/My/ThongTinCT';
import TinNhanHT from '../pages/My/TinNhanHT';
import VanHoaDN from '../pages/Introduce/VanHoaDN';
import We from '../pages/Introduce/We';
import Withdraw from '../pages/My/Withdraw';
import YKienPH from '../pages/My/YKienPH';

// Public Router

let defaultTitle = 'COEX MALL';

const publicRoutes = [
    // Trang chủ
    { path: '/', title: 'Trang chủ', component: Home },

    // Giới thiệu
    { path: '/ve-chung-toi', title: `Về chúng tôi`, component: We },
    { path: '/mo-ta-thanh-vien', title: 'Mô tả thành viên', component: Desc },
    { path: '/nguyen-tac-tai-chinh', title: 'Nguyên tắc tài chính', component: TaiChinh },
    { path: '/van-hoa-cong-ty', title: 'Văn hoá công ty', component: VanHoaDN },
    { path: '/dieu-khoan-su-dung', title: 'Điều khoản sử dụng', component: DieuKhoan },
    { path: '/mo-phong-doanh-thu', title: 'Mô phỏng doanh thu', component: MoPhongDT },
    { path: '/phan-phoi-doi', title: 'Phân phối đội', component: PhanPhoi },
    { path: '/chinh-sach-bao-mat', title: 'Chính sách bảo mật', component: ChinhSachBM },

    // Nạp rút tiền
    { path: '/thong-tin-cong-ty', title: `Thông tin công ty | ${defaultTitle}`, component: ThongTinCT, layout: null },
    { path: '/ho-so-cong-ty', title: `Hồ sơ công ty | ${defaultTitle}`, component: HoSoCT, layout: null },
    { path: '/mo-ta-quy-tac', title: `Mô tả quy tắc | ${defaultTitle}`, component: MoTaQuyTac, layout: null },
    { path: '/hop-tac-dai-ly', title: `Hợp tác đại lý | ${defaultTitle}`, component: HopTacDaiLy, layout: null },
    { path: '/qr-code', title: `Quét mã QR | ${defaultTitle}`, component: MyQRCode, layout: null },
    { path: '/recharge', title: `Nạp tiền | ${defaultTitle}`, component: Recharge },
    { path: '/recharge/:id', title: `Nạp tiền | ${defaultTitle}`, component: FormRecharge },
    { path: '/withdraw', title: `Rút tiền | ${defaultTitle}`, component: Withdraw },

    // Order
    { path: '/support', title: 'Hỗ trợ khách hàng', component: Support },
    { path: '/support/:id', title: 'Hỗ trợ khách hàng', component: DetailChat },
    { path: '/order/mission', title: 'Nhiệm vụ', component: OrderRedirect },
    { path: '/order/mission/:id_mission', title: 'Đơn hàng', component: Order },
    { path: '/order/index', title: 'Lịch sử đơn hàng', component: History },
    // { path: '/order/confirm/:id', title: `Comfirm Order | ${defaultTitle}`, component: ComfirmOrder },
    // My
    { path: '/my', title: 'Của tôi', component: My },
    { path: '/my/mail', title: 'Tin nhắn hệ thống', component: TinNhanHT },
    { path: '/my/y-kien', title: 'Ý kiến phản hồi', component: YKienPH },
    { path: '/my/nang-cap-hoi-vien', title: 'Nâng cấp hội viên', component: NangCapHV },
    { path: '/my/settings', title: 'Cài đặt', component: Settings },
    { path: '/my/address', title: 'Địa chỉ', component: Address },
    { path: '/my/guide', title: 'Hướng dẫn', component: Guide },
    { path: '/my/service', title: 'Dịch vụ', component: Service },
    { path: '/my/edit-password', title: 'Đổi mật khẩu', component: EditPassword },
    { path: '/my/banking', title: 'Liên kết ngân hàng', component: MyBank },
    {
        path: '/my/edit-password-transaction',
        title: 'Đổi mật khẩu giao dịch',
        component: EditPwTransaction,
    },
    {
        path: '/my/financial-details',
        title: `Financial details | ${defaultTitle}`,
        component: FinancialDetails,
    },
    {
        path: '/my/history-recharge-withdraw',
        title: `Lịch sử nạp rút | ${defaultTitle}`,
        component: HistoryRechargeWithdraw,
    },
    {
        path: '/my/members',
        title: `Nhóm của tôi`,
        component: Members,
    },

    {
        path: '/vong-quay-may-man',
        title: 'Vòng quay may mắn',
        component: RotationLuck,
        layout: null,
    },
    // Account
    {
        path: '/account/login',
        title: `Đăng nhập tài khoản | ${defaultTitle}`,
        component: Login,
        layout: null,
    },
    { path: '/account/register', title: `Đăng ký ngay | ${defaultTitle}`, component: Register, layout: null },
    { path: '*', title: `NotFound | ${defaultTitle}`, component: NotFound, layout: null },
];
// Private Router
const privateRoutes = [];

export { publicRoutes, privateRoutes };
