import Banks from '@/components/dashboard/Banks';
import BuyCards from '@/components/dashboard/BuyCards';
import Cards from '@/components/dashboard/Cards';
import ChangeCards from '@/components/dashboard/ChangeCards';
import Prices from '@/components/dashboard/Prices';
import DashboardProfile from '@/components/dashboard/Profile';
import DashboardSystems from '@/components/dashboard/Systems';
import DashboardUsers from '@/components/dashboard/Users';
import DashboardWithdraw from '@/components/dashboard/Withdraw';
import { UserSelector } from '@/redux/selector/UserSelector';
import { LoadingDataAdminSuccess, LogoutAdminSuccess, SignOutAdminSuccess } from '@/redux/slice/admin';
import { LogoutUserSuccess } from '@/redux/slice/user';
import { DataAdminApi } from 'data/api/admin/data';
import { CreateAxiosInstance } from 'data/api/axiosClient/createAxiosInstance';
import { ApiUsers } from 'data/api/users';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardRefill from '@/components/dashboard/Refill';
import DashboardEvents from '@/components/dashboard/Events';
import { Badge, Button, ListGroup } from 'react-bootstrap';
import { AdminSelector } from '@/redux/selector/AdminSelector';
import { AuthApi } from 'data/api/auth';

function Dashboard(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const User = useSelector(UserSelector.Auth.User);
    const AccessToken = useSelector(UserSelector.Auth.AccessToken);
    const axiosJwt = CreateAxiosInstance(dispatch, AccessToken);
    //GetData
    useEffect(() => {
        const handleGetDataAdmin = async () => {
            await DataAdminApi.LoadingDataAdmin(dispatch, LoadingDataAdminSuccess, axiosJwt, AccessToken)
        };
        if (User.admin && AccessToken) {
            handleGetDataAdmin();
        }
    }, [User, AccessToken]);
    //Data
    const Refills = useSelector(AdminSelector.Data.Refills);
    const RefillPending = Refills?.filter(item => item.status === "Pending");

    const [views, setViews] = useState("Systems");

    const handleRenderViewsDashboard = () => {
        switch (views) {
            case "Users": return <DashboardUsers
                axiosJwt={axiosJwt}
                accessToken={AccessToken}
            />
            case "Prices": return <Prices
                axiosJwt={axiosJwt}
                accessToken={AccessToken}
            />
            case "Cards": return <Cards
                axiosJwt={axiosJwt}
                accessToken={AccessToken}
            />
            case "ChangeCards": return <ChangeCards
                axiosJwt={axiosJwt}
                accessToken={AccessToken}
            />
            case "BuyCards": return <BuyCards
                axiosJwt={axiosJwt}
                accessToken={AccessToken}
            />
            case "Banks": return <Banks />
            case "Withdraws": return <DashboardWithdraw
                axiosJwt={axiosJwt}
                accessToken={AccessToken}
            />
            case "Refills": return <DashboardRefill
                axiosJwt={axiosJwt}
                accessToken={AccessToken}
            />
            case "Profile": return <DashboardProfile
                axiosJwt={axiosJwt}
                accessToken={AccessToken}
            />
            case "Events": return <DashboardEvents
                axiosJwt={axiosJwt}
                accessToken={AccessToken}
            />

            default:
                return <DashboardSystems />
        }
    };

    const handleLogout = async () => {
        await AuthApi.Logout(dispatch, SignOutAdminSuccess, router);
        dispatch(LogoutUserSuccess());
    }

    return (
        User?.admin && AccessToken ?
            <div id='Dashboard'>
                <div className='dashboard_content'>

                    <div className='dashboard_menu bgr_white p-0'>

                        <div className='menu_hearder'>
                            <div className='avatar'>
                                <img src={User?.Img?.path} alt={User?.userName} className='img-fluid' />
                            </div>
                            <p>{User?.displayName ? User?.displayName : User?.userName}</p>
                        </div>

                        <div className='menu_content'>
                            <ListGroup as="ol" numbered>
                                <ListGroup.Item as="li" className={views === "Systems" ? "menu_active menu_item d-flex justify-content-between align-items-start" : "menu_item d-flex justify-content-between align-items-start"} onClick={() => setViews("Systems")}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Systems</div>
                                    </div>
                                    <div className='menu_icon'>
                                        <span className="material-symbols-outlined">
                                            dns
                                        </span>
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item as="li" className={views === "Users" ? "menu_active menu_item d-flex justify-content-between align-items-start" : "menu_item d-flex justify-content-between align-items-start"} onClick={() => setViews("Users")}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Users</div>
                                    </div>
                                    <div className='menu_icon'>
                                        <span className="material-symbols-outlined">
                                            group
                                        </span>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className={views === "Events" ? "menu_active menu_item d-flex justify-content-between align-items-start" : "menu_item d-flex justify-content-between align-items-start"} onClick={() => setViews("Events")}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Events</div>
                                    </div>
                                    <div className='menu_icon'>
                                        <span className="material-symbols-outlined">
                                            event
                                        </span>
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item as="li" className={views === "Prices" ? "menu_active menu_item d-flex justify-content-between align-items-start" : "menu_item d-flex justify-content-between align-items-start"} onClick={() => setViews("Prices")}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Prices</div>
                                    </div>
                                    <div className='menu_icon'>
                                        <span className="material-symbols-outlined">
                                            price_check
                                        </span>
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item as="li" className={views === "Refills" ? "menu_active menu_item d-flex justify-content-between align-items-start" : "menu_item d-flex justify-content-between align-items-start"} onClick={() => setViews("Refills")}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Refills</div>
                                    </div>
                                    <div className='menu_icon'>
                                        {
                                            RefillPending?.length > 0 ?
                                                <Badge bg="danger" pill>
                                                    {RefillPending?.length}
                                                </Badge>
                                                :
                                                <span className="material-symbols-outlined">
                                                    local_atm
                                                </span>
                                        }

                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item as="li" className={views === "Withdraws" ? "menu_active menu_item d-flex justify-content-between align-items-start" : "menu_item d-flex justify-content-between align-items-start"} onClick={() => setViews("Withdraws")}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Withdraws</div>
                                    </div>
                                    <div className='menu_icon'>
                                        {
                                            RefillPending?.length > 0 ?
                                                <Badge bg="danger" pill>
                                                    {RefillPending?.length}
                                                </Badge>
                                                :
                                                <span className="material-symbols-outlined">
                                                    local_atm
                                                </span>
                                        }

                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item as="li" className={views === "ChangeCards" ? "menu_active menu_item d-flex justify-content-between align-items-start" : "menu_item d-flex justify-content-between align-items-start"} onClick={() => setViews("ChangeCards")}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">ChangeCards</div>
                                    </div>
                                    <div className='menu_icon'>
                                        <span className="material-symbols-outlined">
                                            price_check
                                        </span>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className={views === "BuyCards" ? "menu_active menu_item d-flex justify-content-between align-items-start" : "menu_item d-flex justify-content-between align-items-start"} onClick={() => setViews("BuyCards")}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">BuyCards</div>
                                    </div>
                                    <div className='menu_icon'>
                                        <span className="material-symbols-outlined">
                                            price_check
                                        </span>
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item as="li" className={views === "Profile" ? "menu_active menu_item d-flex justify-content-between align-items-start" : "menu_item d-flex justify-content-between align-items-start"} onClick={() => setViews("Profile")}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Profile</div>
                                    </div>
                                    <div className='menu_icon'>
                                        <span className="material-symbols-outlined">
                                            price_check
                                        </span>
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item as="li" className={"menu_item d-flex justify-content-between align-items-start"} onClick={() => handleLogout()}>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Sign Out</div>
                                    </div>
                                    <div className='menu_icon'>
                                        <span className="material-symbols-outlined">
                                            price_check
                                        </span>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>

                    <div className='dashboard_views '>

                        <div className='dashboard_views_hearder'>
                            <div className='views_hearder_item bgr_white'>
                                <div className='hearder_left'>
                                    <span>Dashboard</span> - <span>{views}</span>
                                </div>
                                <div className='hearder_right'>
                                    <Link className='btn btn-primary me-3' href={"/"}>Back to home</Link>
                                    <Button>RefreshData</Button>
                                </div>
                            </div>

                        </div>

                        <div className='views_items'>
                            {handleRenderViewsDashboard()}
                        </div>

                    </div>

                </div>
            </div>
            :
            <h1>Bạn Cần Đăng Nhập</h1>
    );
}

export default Dashboard;