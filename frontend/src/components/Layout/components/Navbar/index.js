import homeBlack from '../../../../assets/images/home-icon-png-black.png';
import homeRed from '../../../../assets/images/home-icon-png-red.png';
import productBlack from '../../../../assets/images/product-black.png';
import productRed from '../../../../assets/images/product-red.png';
import historyRed from '../../../../assets/images/nav-history-red.png';
import historyBlack from '../../../../assets/images/nav-history-black.png';
import cskhBlack from '../../../../assets/images/cskh-black.png';
import cskhRed from '../../../../assets/images/cskh-red.png';
import userBlack from '../../../../assets/images/user-icon-black.png';
import userRed from '../../../../assets/images/user-icon-red.png';
import { Link, Outlet } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import './Navbar.css';
import nhandon from '../../../../assets/images/nhandon.png';
import { HiHome } from 'react-icons/hi';
import { RiFileList3Line, RiUserStarLine } from 'react-icons/ri';
import { MdSupportAgent } from 'react-icons/md';
import { TbHandClick } from 'react-icons/tb';
function Navbar(props) {
    let link = props.link;
    let [homeN, setHome] = useState(link === '/' ? true : false);
    let [historyN, setHistory] = useState(link === '/order/index' ? true : false);
    let [userN, setUserN] = useState(link === '/my' ? true : false);
    let [productN, setProductN] = useState(link === '/order/mission' ? true : false);
    let [cskhN, setCSKHN] = useState(link === '/support' ? true : false);

    useEffect(() => {
        if (link.indexOf('/order/mission') >= 0) {
            setHome(false);
            setHistory(false);
            setUserN(false);
            setCSKHN(false);
            setProductN(true);
        } else if (link === '/my') {
            setHome(false);
            setHistory(false);
            setUserN(true);
            setCSKHN(false);
            setProductN(false);
        } else if (link === '/system') {
            setHome(false);
            setHistory(false);
            setUserN(false);
            setCSKHN(false);
            setProductN(true);
        } else if (link === '/order/index') {
            setHome(false);
            setHistory(true);
            setUserN(false);
            setCSKHN(false);
            setProductN(false);
        } else if (link === '/support') {
            setHome(false);
            setHistory(false);
            setUserN(false);
            setCSKHN(true);
            setProductN(false);
        } else if (link === '/') {
            setHome(true);
            setHistory(false);
            setUserN(false);
            setCSKHN(false);
            setProductN(false);
        }
    }, [link]);

    return (
        <nav className="w-full navbar__footer fixed bottom-0 left-0 z-[49]">
            <div className="flex justify-center items-center navbar__footer--container">
                <Link to="/" className="flex-1 flex justify-center text-center">
                    <div className="flex-1 flex justify-center text-center flex-col py-2">
                        <div className="bar-item__icon flex justify-center ">
                            {!homeN ? (
                                <i className="flex justify-center">
                                    <img src={homeBlack} alt="Home" className="w-9 h-9 sepia-0" />
                                </i>
                            ) : (
                                <i className="flex justify-center">
                                    <img src={homeBlack} alt="Home" className="w-9 h-9 sepia-0" />
                                </i>
                            )}
                            {/* <HiHome size={25} color={homeN ? '#e0e300' : ''} /> */}
                        </div>
                        <div
                            className="text-xl lg:text-2xl mt-[3px] font-bold"
                            style={{ color: `rgb(${!homeN ? '114,114,114' : '224,227,0'})` }}
                        >
                            Trang chủ
                        </div>
                    </div>
                </Link>

                <Link to="/order/index" className="flex-1 flex justify-center text-center">
                    <div className="flex-1 flex justify-center text-center flex-col py-2">
                        <div className="bar-item__icon flex justify-center">
                            {!historyN ? (
                                <i className="flex justify-center">
                                    <img src={historyBlack} alt="History" className="w-9 h-9 sepia-0" />
                                </i>
                            ) : (
                                <i className="flex justify-center">
                                    <img src={historyBlack} alt="History" className="w-9 h-9 sepia-0" />
                                </i>
                            )}
                            {/* <RiFileList3Line size={25} color={historyN ? '#e0e300' : ''} /> */}
                        </div>
                        <div
                            className="text-xl lg:text-2xl mt-[3px] font-bold"
                            style={{ color: `rgb(${!historyN ? '114,114,114' : '224,227,0'})` }}
                        >
                            Lịch sử
                        </div>
                    </div>
                </Link>
                <Link to="/order/mission" className="flex-1 flex justify-center text-center ">
                    <div className="flex-1 flex justify-center text-center flex-col py-2">
                        <div className="bar-item__icon flex justify-center">
                            {!productN ? (
                                <i className="flex justify-center">
                                    <img src={nhandon} alt="Order" className="w-12 h-12 sepia-0 " />
                                </i>
                            ) : (
                                <i className="flex justify-center">
                                    <img src={nhandon} alt="Order" className="w-12 h-12 sepia-0 " />
                                </i>
                            )}
                            {/* <div className="flex justify-center text-center bg-[#2391f4] rounded-full py-[5px] mx-[17px] ">
                                <TbHandClick size={25} color={productN ? '#e0e300' : ''} />
                            </div> */}
                        </div>
                        <div
                            className="text-xl  font-bold"
                            style={{ color: `rgb(${!productN ? '114,114,114' : '224,227,0'})` }}
                        >
                            Nhận đơn
                        </div>
                    </div>
                </Link>
                <Link
                    to="https://support.biendich68.com"
                    target="_blank"
                    className="flex-1 flex justify-center text-center"
                >
                    <div className="flex-1 flex justify-center text-center flex-col py-2">
                        <div className="bar-item__icon flex justify-center">
                            {!cskhN ? (
                                <i className="flex justify-center">
                                    <img src={cskhBlack} alt="CSKH" className="w-9 h-9 sepia-0" />
                                </i>
                            ) : (
                                <i className="flex justify-center">
                                    <img src={cskhBlack} alt="CSKH" className="w-9 h-9 sepia-0" />
                                </i>
                            )}
                            {/* <MdSupportAgent size="25" color={cskhN ? '#e0e300' : ''} /> */}
                        </div>
                        <div
                            className="text-xl lg:text-2xl mt-[3px] font-bold"
                            style={{ color: `rgb(${!cskhN ? '114,114,114' : '224,227,0'})` }}
                        >
                            CSKH
                        </div>
                    </div>
                </Link>

                <Link to="/my" className="flex-1 flex justify-center text-center">
                    <div className="flex-1 flex justify-center text-center flex-col py-2">
                        <div className="bar-item__icon flex justify-center">
                            {!userN ? (
                                <i className="flex justify-center">
                                    <img src={userBlack} alt="My" className="w-9 h-9 sepia-0" />
                                </i>
                            ) : (
                                <i className="flex justify-center">
                                    <img src={userBlack} alt="My" className="w-9 h-9 sepia-0" />
                                </i>
                            )}
                            {/* <RiUserStarLine size={25} color={userN ? '#e0e300' : ''} /> */}
                        </div>
                        <div
                            className="text-xl lg:text-2xl mt-[3px] font-bold"
                            style={{ color: `rgb(${!userN ? '114,114,114' : '224,227,0'})` }}
                        >
                            Tài khoản
                        </div>
                    </div>
                </Link>
            </div>
            <Outlet />
        </nav>
    );
}

export default memo(Navbar);
