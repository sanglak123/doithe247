//Action
import { LogoutUserSuccess } from "@/redux/slice/user";
import { LogoutAdminSuccess } from '@/redux/slice/admin';
//Lib
import React from 'react';
//Components
import News from '../news';
//Handle
import { formatMoney2 } from '@/config/formatMoney';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { AdminSelector } from '@/redux/selector/AdminSelector';
import { UserSelector } from '@/redux/selector/UserSelector';
//Api
import { AuthApi } from 'data/api/auth';
//Bs5
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
//Next
import { useRouter } from 'next/router';
import Link from 'next/link';


function Hearder(props) {
    //LoginAdmin?
    const LoginAdmin = useSelector(AdminSelector.LoginAdmin);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = router.pathname;
    const route = router.route;
    const User = useSelector(UserSelector.Auth.User);
    const AccessToken = useSelector(UserSelector.Auth.AccessToken)
    const Store = useSelector(UserSelector.Store);

    const handleLogout = async () => {
        if (User?.admin) {
            await AuthApi.Logout(dispatch, LogoutAdminSuccess, route);
            dispatch(LogoutUserSuccess());
        } else {
            await AuthApi.Logout(dispatch, LogoutUserSuccess, route);
        }

    }

    return (
        pathname !== "/login" && pathname !== "/admin/dashboard" && pathname !== "/admin" &&
        <>
            <div id='hearder'>
                <div className='container'>
                    <Navbar expand="lg">
                        <Container>
                            <Navbar.Brand className='link_logo' href="/">
                                <div className='logo'>
                                    <h1>DOITHE247</h1>
                                    <span>www.doithe247.hag.com.vn</span>
                                </div>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link className={route === "/changecard" ? "active me-3" : "me-3"} href="/changecard">Đổi Thẻ</Nav.Link>
                                    <Nav.Link className={route === "/buycard/[telco]" ? "active me-3" : "me-3"} href="/buycard/viettel">Mua Thẻ</Nav.Link>
                                    <Nav.Link className={route === "/[userName]/refill" ? "active me-3" : "me-3"} href={`/${User?.userName}/refill`}>Nạp Tiền</Nav.Link>
                                    <Nav.Link className={route === "/[userName]/withdraw" ? "active me-3" : "me-3"} href={`/${User?.userName}/withdraw`}>Rút Tiền</Nav.Link>
                                    <Nav.Link className={route === "/connectapi" ? "active me-3" : "me-3"} href="/connectapi">Kết Nối Api</Nav.Link>
                                    <Nav.Link className={route === "/usemanual" ? "active me-3" : "me-3"} href="/usemanual">Hướng Dẫn</Nav.Link>
                                </Nav>
                                <Nav>
                                    {
                                        AccessToken ?
                                            <>
                                                <Nav.Link disabled className='nav_logo_user'><i className="fa fa-user"></i></Nav.Link>

                                                <NavDropdown title={User?.displayName !== null ? User?.displayName : User?.userName} id="user_dropdown">
                                                    <NavDropdown.Item className='txt_black' href={`/${User?.userName}/profile`}><i className="fa fa-user-cog me-2"></i>Thông tin tài khoản</NavDropdown.Item>

                                                    <NavDropdown.Item className='txt_black' href={`/${User?.userName}/payment`}><i className="fa fa-donate me-2"></i>Quỹ số dư</NavDropdown.Item>
                                                    <NavDropdown.Item className='txt_black' href={`/${User?.userName}/payment`}><i className="fa fa-dollar-sign me-2"></i>Nạp tiền</NavDropdown.Item>
                                                    <NavDropdown.Item className='txt_black' href={`/${User?.userName}/payment`}><i className="fa fa-hand-holding-usd me-2"></i>Rút tiền</NavDropdown.Item>
                                                    <NavDropdown.Item className='txt_black' href={`/${User?.userName}/bank`}><i className="fa fa-university me-2"></i>Tài khoản ngân hàng</NavDropdown.Item>
                                                    <NavDropdown.Item className='txt_black' href={`/${User?.userName}/payment`}><i className="fa fa-exchange-alt me-2"></i>Lịch sữ đổi thẻ cào</NavDropdown.Item>
                                                    <NavDropdown.Item className='txt_black' href={`/${User?.userName}/payment`}><i className="fa fa-audio-description me-2"></i>Lịch sữ mua thẻ cào</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item className='txt_black' href={`/${User?.userName}/payment`}><i className="fa fa-project-diagram me-2"></i>Kết nối Api</NavDropdown.Item>
                                                    {
                                                        User?.admin &&
                                                        <NavDropdown.Item className='txt_black' href={LoginAdmin ? "/admin/dashboard" : "/admin/auth/login"}><i className="fa fa-grip-horizontal me-2"></i>Dashboard</NavDropdown.Item>
                                                    }
                                                    <NavDropdown.Item className='txt_black' onClick={() => handleLogout()}><i className="fa fa-sign-out-alt me-2"></i>Logout</NavDropdown.Item>

                                                </NavDropdown>
                                                <Nav.Link disabled className='nav_surlpus'>
                                                    <i className="fa fa-donate me-2"></i>
                                                    {formatMoney2(User?.surplus)}
                                                </Nav.Link>
                                            </>

                                            :
                                            <>
                                                <Nav.Link className='btn_authen btn btn-outline-success me-2' href="/login">Sign in</Nav.Link>
                                                <Nav.Link className='btn_authen btn btn-outline-success' href="/login">Register now</Nav.Link>
                                            </>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
            <News />
            {
                Store?.length > 0 && AccessToken &&
                <div id='store_user'>
                    <div className='btn_show_store'>
                        <i className="fa fa-shopping-cart"></i>
                        <span className='noti'>{Store.length}</span>
                    </div>
                    <div className='store_item bgr_white'>
                        <p className='m-0 p-0 txt_bold'>Giỏ hàng</p>
                        <p className='text-danger'><span className='txt_bold'>{Store.length}</span> sản phẩm</p>
                        <Link className='btn btn-success' href={`/${User.userName}/store`}>Thanh toán ngay</Link>
                    </div>
                </div>

            }
        </>

    );
}

export default Hearder;