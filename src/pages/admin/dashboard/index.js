import Link from "next/link"
import {useRouter} from "next/router"
import {useContext, useEffect, useState} from "react"
import {Badge, Button} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {UserAuthApi} from "../../../../data/api/users/auth"
import AdminCards from "../../../components/dashboard/Cards"
import AdminMessage from "../../../components/dashboard/Message"
import AdminPrices from "../../../components/dashboard/Prices"
import AdminListRefills from "../../../components/dashboard/Refill"
import DashboardSystems from "../../../components/dashboard/Systems"
import DashboardUsers from "../../../components/dashboard/Users"
import AdminListWithdraws from "../../../components/dashboard/Withdraw"
import ErrorLogin from "../../../components/pages/layout/ErrorLogin"
import ModalLogin from "../../../components/pages/modal/Login"
import ModalLoginAdmin from "../../../components/pages/modal/LoginAdmin"
import Profile from "../../../components/pages/Profile"
import {formatMoney2} from "../../../config/formatMoney"
import {handleEvents, SockeContext} from "../../../config/socketInit"
import {UserSelector} from "../../../redux/selector/UserSelector"
import {SignOutAdminSuccess} from "../../../redux/slice/admin"
import {LogoutUserSuccess} from "../../../redux/slice/user"

function DashboardAdmin(props) {
    //User
    const dispatch = useDispatch()
    const router = useRouter()
    const accessToken = useSelector(UserSelector.Auth.AccessToken)
    const User = useSelector(UserSelector.Auth.User)

    const [view, setView] = useState("Systems")
    const handleRenderViews = () => {
        switch (view) {
            case "Message":
                return <AdminMessage />

            case "Khách hàng":
                return <DashboardUsers accessToken={accessToken} />

            case "Chiết khấu":
                return <AdminPrices accessToken={accessToken} />

            case "Loại thẻ":
                return <AdminCards accessToken={accessToken} />

            case "Lệnh nạp":
                return <AdminListRefills accessToken={accessToken} />

            case "Lệnh rút":
                return <AdminListWithdraws accessToken={accessToken} />

            case "Hổ trợ":
                return <AdminMessage accessToken={accessToken} />

            case "Thông tin tài khoản":
                return <Profile accessToken={accessToken} />

            default:
                return <DashboardSystems accessToken={accessToken} />
        }
    }

    //Socket
    const socket = useContext(SockeContext)
    useEffect(() => {
        if (accessToken) {
            handleEvents(socket, User, dispatch, accessToken)
        } else {
            socket.emit("socket_off", socket.id)
        }
    }, [accessToken, socket, User])

    //Menu Show
    const [showMenu, setShowMenu] = useState(true)

    const handleLogout = async () => {
        if (User?.admin) {
            await UserAuthApi.Logout(dispatch, SignOutAdminSuccess, router)
            dispatch(LogoutUserSuccess())
            socket.disconnect()
            setView("Trang chủ")
        } else {
            await UserAuthApi.Logout(dispatch, LogoutUserSuccess, router)
            socket.disconnect()
            setView("Trang chủ")
        }
    }

    //Login
    const [Login, setLogin] = useState(false)
    const [Register, setRegister] = useState(false)
    const [LoginAdmin, setLoginAdmin] = useState(false)

    return accessToken ? (
        <div id="main_app">
            <div
                className={
                    showMenu ? "left_sidenav" : "left_sidenav menu_short"
                }
            >
                <div className="app_menu">
                    <div className="menu_header">
                        <div className="navbar_logo">
                            {showMenu ? (
                                <div className="logo">
                                    <h1>DOITHE247</h1>
                                    <span>www.hag.doithe247.com.vn</span>
                                </div>
                            ) : (
                                <div className="logo_short">
                                    <span className="material-symbols-outlined">
                                        iframe
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="menu_body">
                        <div className="menu_content">
                            {accessToken && (
                                <div className="menu_avarta">
                                    <div className="avatar">
                                        <img
                                            src={User?.Img?.path}
                                            className="img-fluid"
                                            alt={User?.userName}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="menu_main">
                                <div className="menu_items">
                                    <div
                                        className={
                                            view === "Systems"
                                                ? "menu_item menu_active"
                                                : "menu_item"
                                        }
                                        onClick={() => setView("Systems")}
                                    >
                                        <p className="m-0">Hệ thống</p>
                                        <div className="menu_icon">
                                            <span className="material-symbols-outlined">
                                                dns
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            view === "Khách hàng"
                                                ? "menu_item menu_active"
                                                : "menu_item"
                                        }
                                        onClick={() => setView("Khách hàng")}
                                    >
                                        <p className="m-0">Khách hàng</p>
                                        <div className="menu_icon">
                                            <span className="material-symbols-outlined">
                                                group
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            view === "Chiết khấu"
                                                ? "menu_item menu_active"
                                                : "menu_item"
                                        }
                                        onClick={() => setView("Chiết khấu")}
                                    >
                                        <p className="m-0">Chiết khấu</p>
                                        <div className="menu_icon">
                                            <span className="material-symbols-outlined">
                                                add_card
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            view === "Loại thẻ"
                                                ? "menu_item menu_active"
                                                : "menu_item"
                                        }
                                        onClick={() => setView("Loại thẻ")}
                                    >
                                        <p className="m-0">Thẻ cào</p>
                                        <div className="menu_icon">
                                            <span className="material-symbols-outlined">
                                                credit_card
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            view === "Lệnh rút"
                                                ? "menu_item menu_active"
                                                : "menu_item"
                                        }
                                        onClick={() => setView("Lệnh rút")}
                                    >
                                        <p className="m-0">
                                            Lệnh rút<Badge bg="danger">1</Badge>
                                        </p>
                                        <div className="menu_icon">
                                            <span className="material-symbols-outlined">
                                                payments
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            view === "Lệnh nạp"
                                                ? "menu_item menu_active"
                                                : "menu_item"
                                        }
                                        onClick={() => setView("Lệnh nạp")}
                                    >
                                        <p className="m-0">
                                            Lệnh nạp<Badge bg="danger">1</Badge>
                                        </p>
                                        <div className="menu_icon">
                                            <span className="material-symbols-outlined">
                                                payments
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            view === "Hổ trợ"
                                                ? "menu_item menu_active"
                                                : "menu_item"
                                        }
                                        onClick={() => setView("Hổ trợ")}
                                    >
                                        <p className="m-0">
                                            Hổ trợ<Badge bg="danger">1</Badge>
                                        </p>
                                        <div className="menu_icon">
                                            <span className="material-symbols-outlined">
                                                payments
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            view === "Message"
                                                ? "menu_item menu_active"
                                                : "menu_item"
                                        }
                                        onClick={() => handleLogout()}
                                    >
                                        <p className="m-0">Đăng xuất</p>
                                        <div className="menu_icon">
                                            <span className="material-symbols-outlined">
                                                logout
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={
                    showMenu ? "page_wrapper" : "page_wrapper page_short"
                }
            >
                <div className="topbar d-flex justify-content-between align-items-center">
                    <div className="header_left">
                        <Button
                            onClick={() => setShowMenu(!showMenu)}
                            id="btn_showMenu"
                        >
                            {showMenu ? (
                                <span className="material-symbols-outlined">
                                    keyboard_return
                                </span>
                            ) : (
                                <span className="material-symbols-outlined">
                                    keyboard_tab
                                </span>
                            )}
                        </Button>
                        {view === "Trang chủ" ? (
                            <p className="m-0">Trang chủ</p>
                        ) : (
                            <p className="m-0">Trang chủ / {view}</p>
                        )}
                        <Link href={"/"}>Home</Link>
                    </div>
                    <div className="header_right">
                        {accessToken ? (
                            <div className="user_info">
                                <div className="user_item me-2">
                                    <span className="material-symbols-outlined me-2">
                                        account_circle
                                    </span>
                                    <span>
                                        {User?.displayName !== "null"
                                            ? User.displayName
                                            : User?.userName}
                                    </span>
                                </div>

                                <div className="user_item ms-2">
                                    <span className="material-symbols-outlined">
                                        monetization_on
                                    </span>
                                    <span>{formatMoney2(User?.surplus)}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="user_info">
                                <Button
                                    onClick={() => setLogin(true)}
                                    variant="success"
                                    className="me-2"
                                >
                                    Đăng nhập
                                </Button>
                                <Button className="me-2">Đăng ký</Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="app_view">
                    <div className="container_app">
                        <div className="view_body">{handleRenderViews()}</div>
                        <div className="view_footer">
                            <p className="m-0 txt_center">
                                Bản quyền thuộc về www.hag.doithe247.com.vn -
                                Hotline: 0943830707 - Email:admin@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <ModalLogin show={Login} setShow={setLogin} />
            <ModalLoginAdmin show={LoginAdmin} setShow={setLoginAdmin} />
        </div>
    ) : (
        <ErrorLogin />
    )
}

export default DashboardAdmin
