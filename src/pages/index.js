import BankOfUser from '@/components/pages/BankOfUser';
import BuyCards from '@/components/pages/BuyCards';
import ConnectApi from '@/components/pages/ConnectApi';
import HomePage from '@/components/pages/HomePage';
import ModalLogin from '@/components/pages/modal/Login';
import ModalLoginAdmin from '@/components/pages/modal/LoginAdmin';
import ModalRegister from '@/components/pages/modal/Register';
import PostCards from '@/components/pages/PostCards';
import Profile from '@/components/pages/Profile';
import Refills from '@/components/pages/Refills';
import UseManual from '@/components/pages/UseManual';
import Withdraws from '@/components/pages/Withdraws';
import { formatMoney } from '@/config/formatMoney';
import { handleEvents, SockeContext } from '@/config/socketInit';
import { UserSelector } from '@/redux/selector/UserSelector';
import { SignOutAdminSuccess } from '@/redux/slice/admin';
import { LogoutUserSuccess } from '@/redux/slice/user';
import { UserAuthApi } from 'data/api/users/auth';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ChatBox from './chat';

function MainApp(props) {
  //User
  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken = useSelector(UserSelector.Auth.AccessToken);
  const User = useSelector(UserSelector.Auth.User);

  const [view, setView] = useState("Trang chủ");
  const handleRenderViews = () => {
    switch (view) {
      case "Đổi thẻ": return <PostCards />

      case "Mua thẻ": return <BuyCards />

      case "Nạp tiền": return <Refills />

      case "Rút tiền": return <Withdraws />

      case "Ngân hàng": return <BankOfUser />

      case "Api": return <ConnectApi />

      case "Message": return <ChatBox />

      case "Thông tin tài khoản": return <Profile />

      case "Hướng dẫn": return <UseManual />

      default: return <HomePage />
    }
  };

  //Socket    
  const socket = useContext(SockeContext)
  useEffect(() => {
    if (accessToken) {
      handleEvents(socket, User, dispatch, accessToken)
    } else {
      socket.emit("socket_off", socket.id)
    }
  }, [accessToken, socket, User]);

  //Menu Show
  const [showMenu, setShowMenu] = useState(true);

  const handleLogout = async () => {
    if (User?.admin) {
      await UserAuthApi.Logout(dispatch, SignOutAdminSuccess, router);
      dispatch(LogoutUserSuccess());
      socket.disconnect();
      setView("Trang chủ")
    } else {
      await UserAuthApi.Logout(dispatch, LogoutUserSuccess, router);
      socket.disconnect();
      setView("Trang chủ")
    }

  };

  //Login
  const [Login, setLogin] = useState(false);
  const [Register, setRegister] = useState(false);
  const [LoginAdmin, setLoginAdmin] = useState(false);

  return (
    <div id='main_app'>

      <div className={showMenu ? "left_sidenav" : "left_sidenav menu_short"}>

        <div className="app_menu">

          <div className='menu_header'>
            <div className='navbar_logo'>
              {
                showMenu ?
                  <div className='logo'>
                    <h1>DOITHE247</h1>
                    <span>www.hag.doithe247.com.vn</span>
                  </div>
                  :
                  <div className='logo_short'>
                    <span className="material-symbols-outlined">
                      iframe
                    </span>
                  </div>
              }


            </div>
          </div>

          <div className="menu_body">
            <div className="menu_content">


              {
                accessToken &&
                <div className='menu_avarta'>
                  <div className='avatar'>
                    <img src={User?.Img?.path} className="img-fluid" alt={User?.userName} />
                  </div>
                </div>
              }


              <div className='menu_main'>

                <div className="menu_items">

                  <div className={view === "Trang chủ" ? "menu_item menu_active" : "menu_item"} onClick={() => setView("Trang chủ")}>
                    <p className='m-0'>Trang chủ</p>
                    <div className='menu_icon'>
                      <span className="material-symbols-outlined">
                        house
                      </span>
                    </div>
                  </div>



                  <div className={view === "Đổi thẻ" ? "menu_item menu_active" : "menu_item"} onClick={() => setView("Đổi thẻ")}>
                    <p className='m-0'>Đổi thẻ</p>
                    <div className='menu_icon'>
                      <span className="material-symbols-outlined">
                        credit_score
                      </span>
                    </div>
                  </div>

                  <div className={view === "Mua thẻ" ? "menu_item menu_active" : "menu_item"} onClick={() => setView("Mua thẻ")}>
                    <p className='m-0'>Mua thẻ</p>
                    <div className='menu_icon'>
                      <span className="material-symbols-outlined">
                        add_card
                      </span>
                    </div>
                  </div>


                  <div className={view === "Nạp tiền" ? "menu_item menu_active" : "menu_item"} onClick={() => setView("Nạp tiền")}>
                    <p className='m-0'>Nạp tiền<Badge bg="danger">9</Badge></p>
                    <div className='menu_icon'>
                      <span className="material-symbols-outlined me-2">
                        currency_exchange
                      </span>
                    </div>
                  </div>
                  <div className={view === "Rút tiền" ? "menu_item menu_active" : "menu_item"} onClick={() => setView("Rút tiền")}>
                    <p className='m-0'>Rút tiền<Badge bg="danger">1</Badge></p>
                    <div className='menu_icon'>
                      <span className="material-symbols-outlined">
                        payments
                      </span>
                    </div>
                  </div>

                  {
                    accessToken &&
                    <>
                      <div className={view === "Ngân hàng" ? "menu_item menu_active" : "menu_item"} onClick={() => setView("Ngân hàng")}>
                        <p className='m-0'>Ngân hàng</p>
                        <div className='menu_icon'>
                          <span className="material-symbols-outlined">
                            account_balance
                          </span>
                        </div>
                      </div>
                      <div className={view === "Message" ? "menu_item menu_active" : "menu_item"} onClick={() => setView("Message")}>
                        <p className='m-0'>Message<Badge bg="danger">2</Badge></p>
                        <div className='menu_icon'>
                          <span className="material-symbols-outlined">
                            chat
                          </span></div>
                      </div>
                    </>
                  }

                  <div className={view === "Api" ? "menu_item menu_active" : "menu_item"} onClick={() => setView("Api")}>
                    <p className='m-0'>Api</p>
                    <div className='menu_icon'>
                      <span className="material-symbols-outlined">
                        family_history
                      </span>
                    </div>
                  </div>
                  <div className={view === "Hướng dẫn" ? "menu_item menu_active" : "menu_item"} onClick={() => setView("Hướng dẫn")}>
                    <p className='m-0'>Hướng dẫn</p>
                    <div className='menu_icon'>
                      <span className="material-symbols-outlined">
                        chat
                      </span></div>
                  </div>

                  {
                    accessToken &&
                    <>
                      <div className={view === "Thông tin tài khoản" ? "menu_item menu_active" : "menu_item"} onClick={() => setView("Thông tin tài khoản")}>
                        <p className='m-0'>Thông tin tài khoản</p>
                        <div className='menu_icon'>
                          <span className="material-symbols-outlined">
                            manage_accounts
                          </span>
                        </div>
                      </div>

                      <div className={view === "Message" ? "menu_item menu_active" : "menu_item"} onClick={() => handleLogout()}>
                        <p className='m-0'>Đăng xuất</p>
                        <div className='menu_icon'>
                          <span className="material-symbols-outlined">
                            logout
                          </span>
                        </div>
                      </div>
                    </>
                  }               

                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      <div className={showMenu ? "page_wrapper" : "page_wrapper page_short"}>

        <div className='topbar d-flex justify-content-between align-items-center'>
          <div className='header_left'>
            <Button onClick={() => setShowMenu(!showMenu)} id='btn_showMenu'>
              {
                showMenu ?
                  <span className="material-symbols-outlined">
                    keyboard_return
                  </span>
                  :
                  <span className="material-symbols-outlined">
                    keyboard_tab
                  </span>
              }

            </Button>
            {
              view === "Trang chủ" ?
                <p className='m-0'>Trang chủ</p>
                :
                <p className='m-0'>Trang chủ / {view}</p>
            }
          </div>
          <div className='header_right'>
            {
              accessToken ?
                <div className='user_info'>

                  <div className='user_item me-2'>
                    <span className="material-symbols-outlined me-2">
                      account_circle
                    </span>
                    <span>
                      {User?.displayName !== "null" ? User.displayName : User?.userName}
                    </span>
                  </div>

                  <div className='user_item ms-2'>
                    <span className="material-symbols-outlined">
                      monetization_on
                    </span>
                    <span>
                      {formatMoney(User?.surplus)}
                    </span>
                  </div>
                </div>
                :
                <div className='user_info'>
                  <Button onClick={() => setLogin(true)} variant='success' className='me-2'>Đăng nhập</Button>
                  <Button onClick={() => setRegister(true)} className='me-2'>Đăng ký</Button>
                </div>
            }
          </div>
        </div>

        <div className='app_view'>
          <div className='container_app'>
            <div className='view_body'>
              {handleRenderViews()}
            </div>
            <div className='view_footer'>
              <p className='m-0 txt_center'>Bản quyền thuộc về www.hag.doithe247.com.vn - Hotline: 0943830707 - Email:admin@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalLogin
        show={Login}
        setShow={setLogin}
      />
      <ModalRegister
        show={Register}
        setShow={setRegister}
      />
      <ModalLoginAdmin
        show={LoginAdmin}
        setShow={setLoginAdmin}
      />
    </div>
  );
}

export default MainApp;