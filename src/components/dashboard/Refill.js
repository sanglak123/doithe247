import { formatDate, formatMoney2 } from '@/config/formatMoney';
import { AdminSelector } from '@/redux/selector/AdminSelector';
import { UserSelector } from '@/redux/selector/UserSelector';
import { HandlePaymentSuccess } from '@/redux/slice/admin';
import { PaymentAdminApi } from 'data/api/admin/payments';
import { CreateAxiosInstance } from 'data/api/axiosClient/createAxiosInstance';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ModalImage from '../modal/ModalImage';

function DashboardRefill(props) {
    //User   
    const accessToken = useSelector(UserSelector.Auth.AccessToken);
    const dispatch = useDispatch();
    const axiosJwt = CreateAxiosInstance(dispatch, accessToken);
    //Data
    const Payments = useSelector(AdminSelector.Data.Payments);
    const ListPaymentPending = Payments?.filter((item) => item.status === "Pending");
    const ListPaymentHistory = Payments?.filter((item) => item.status !== "Pending");

    const Users = useSelector(AdminSelector.Data.Users)

    const [PaymentPendings, setPaymentPendings] = useState([]);

    console.log(Payments)
    //Data Render
    const limit = 10;

    //Pending   
    const [pagePending, setPagePending] = useState(1);
    useEffect(() => {
        const offsetPending = (pagePending - 1) * limit;
        const list = ListPaymentPending.slice(offsetPending, (offsetPending + limit))

        setPaymentPendings(list)
    }, [Payments, pagePending]);

    const handlePrevPending = () => {
        if (pagePending > 1) {
            setPagePending((pre) => pre - 1)
        }
    };
    const handleNextPending = () => {
        if (ListPaymentPending.length > pagePending * limit) {
            setPagePending(prev => prev + 1)
        }
    };

    //Filter History
    const [userName, setUserName] = useState("All");
    //History
    const [PaymentHistorys, setPaymentHistorys] = useState([]);
    const [pageHistory, setPageHistory] = useState(1);
    useEffect(() => {
        if (userName === "All") {
            const listHisstory = Payments?.filter((item) => item.status !== "Pending");
            const offsetHistory = (pageHistory - 1) * limit;
            const list = listHisstory.slice(offsetHistory, (offsetHistory + limit));

            setPaymentHistorys(list);
        } else {
            const listHisstory = Payments?.filter((item) => item.status !== "Pending" && item.User?.userName === userName);
            const offsetHistory = (pageHistory - 1) * limit;
            const list = listHisstory.slice(offsetHistory, (offsetHistory + limit));

            setPaymentHistorys(list);
        }

    }, [Payments, pageHistory, userName]);

    const handlePrevHistory = () => {
        if (pageHistory > 1) {
            setPageHistory((pre) => pre - 1)
        }
    };
    const handleNextHistory = () => {
        if (ListPaymentHistory.length > pageHistory * limit) {
            setPageHistory(pre => pre + 1)
        }

    };

    //Modal Image
    const [payment, setPayment] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Handle Payments
    const handleAccessPayment = async (payment) => {
        await PaymentAdminApi.HandlePayment(accessToken, axiosJwt, dispatch, HandlePaymentSuccess, payment?.id, "Success")
    };

    const handleCanclePayment = async (payment) => {
        await PaymentAdminApi.HandlePayment(accessToken, axiosJwt, dispatch, HandlePaymentSuccess, payment?.id, "Error")
    };

    const handleDeletePayments = async (payment) => {
        alert(payment.id)
    };

    return (
        <div id='dashboard_Refill'>
            <div className='bgr_white mt-2 refill_content'>

                {
                    PaymentPendings.length > 0 ?
                        <div className='refill_item'>
                            <div className='hearder_hag'>
                                <h1>Payments Pending</h1>
                            </div>
                            <div className='table_refill'>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr className="txt_center">
                                            <th>#</th>
                                            <th>Sign</th>
                                            <th>User</th>
                                            <th>Amount</th>
                                            <th>BankUser</th>
                                            <th>BankReceive</th>
                                            <th>Status</th>
                                            <th>Image</th>
                                            <th>CreatedAt</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            PaymentPendings?.map((item, index) => {
                                                return (
                                                    <tr key={index} className="txt_center">
                                                        <td>{index + 1}</td>
                                                        <td>{item.sign}</td>
                                                        <td>{item.User?.userName}</td>
                                                        <td>{formatMoney2(item.amount)}</td>
                                                        <td>{`${item.BankOfUser?.Bank?.sign} - ${item.BankOfUser?.number}`} </td>
                                                        <td>{`${item.ReceiveBank?.Bank?.sign} - ${item.ReceiveBank?.number}`} </td>
                                                        <td className={item.status === "Pending" ? "text-info" : item.status === "Success" ? "text-success" : item.status === "Error" ? "text-danger" : ""}>{item.status}</td>
                                                        <td>
                                                            <Button onClick={() => {
                                                                setPayment(item)
                                                                handleShow();
                                                            }}>Check</Button>
                                                        </td>
                                                        <td>{formatDate(item.createdAt)}</td>
                                                        <td>
                                                            <ButtonGroup>
                                                                <Button onClick={() => handleAccessPayment(item)} variant='success'>Accept</Button>
                                                                <Button onClick={() => handleCanclePayment(item)} variant='danger'>Cancle</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                <ModalImage
                                    show={show}
                                    handleClose={handleClose}
                                    payment={payment}
                                />
                            </div>
                            <div className='pagination'>
                                <ButtonGroup>
                                    <Button onClick={handlePrevPending}>Prev</Button>
                                    <Button disabled variant='primary'>Trang: {pagePending}</Button>
                                    <Button onClick={handleNextPending}>Next</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                        :
                        <div className='refill_item'>
                            <div className='hearder_hag'>
                                <h1>Payments Pending</h1>
                            </div>

                            <p className='text-danger'>
                                Chưa có dữ liệu.
                            </p>
                        </div>
                }

                <div className='refill_item'>
                    <div className='hearder_hag'>
                        <h1>Payments History</h1>
                    </div>
                    <div className='table_refill'>
                        <div className='filter'>
                            <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                                <Form.Label>Find by user</Form.Label>
                                <Form.Select defaultValue={"All"} onChange={(e) => setUserName(e.target.value)}>
                                    <option value={"All"}>All</option>
                                    {
                                        Users?.map((item, index) => {
                                            return (
                                                <option key={index} value={item.userName}>{item.userName}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                        </div>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr className="txt_center">
                                    <th>STT</th>
                                    <th>Sign</th>
                                    <th>User</th>
                                    <th>Amount</th>
                                    <th>BankUser</th>
                                    <th>BankReceive</th>
                                    <th>Status</th>
                                    <th>Image</th>
                                    <th>CreatedAt</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    PaymentHistorys?.map((item, index) => {
                                        return (
                                            <tr key={index} className="txt_center">
                                                <td>{index + 1}</td>
                                                <td>{item.sign}</td>
                                                <td>{item.User?.userName}</td>
                                                <td>{formatMoney2(item.amount)}</td>
                                                <td>{`${item.BankOfUser?.Bank?.sign} - ${item.BankOfUser?.number}`} </td>
                                                <td>{`${item.ReceiveBank?.Bank?.sign} - ${item.ReceiveBank?.number}`} </td>
                                                <td className={item.status === "Pending" ? "text-info" : item.status === "Success" ? "text-success" : item.status === "Error" ? "text-danger" : ""}>{item.status}</td>
                                                <td>
                                                    <Button onClick={() => {
                                                        setPayment(item)
                                                        handleShow();
                                                    }}>Check</Button>
                                                </td>
                                                <td>{formatDate(item.createdAt)}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Button onClick={() => handleDeletePayments(item)} variant='danger'>Delete</Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <ModalImage
                            show={show}
                            handleClose={handleClose}
                            payment={payment}
                        />
                    </div>
                    <div className='pagination'>
                        <ButtonGroup>
                            <Button onClick={handlePrevHistory}>Prev</Button>
                            <Button disabled variant='primary'>Trang: {pageHistory}</Button>
                            <Button onClick={handleNextHistory}>Next</Button>
                        </ButtonGroup>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default DashboardRefill;