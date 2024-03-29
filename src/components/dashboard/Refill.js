import React, {useContext, useEffect, useState} from "react"
import {Button, Form, InputGroup, Table} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {AdminPaymentApi} from "../../../data/api/admin/payments"
import {CreateAxiosInstance} from "../../../data/api/axiosClient/createAxiosInstance"
import {formatDate, formatMoney2} from "../../config/formatMoney"
import {handleEvents, SockeContext} from "../../config/socketInit"
import PaginationHag from "../../layout/pagination"
import {AdminSelector} from "../../redux/selector/AdminSelector"
import {UserSelector} from "../../redux/selector/UserSelector"
import {RefreshListRefillSuccess} from "../../redux/slice/admin"
import ModalImage from "../pages/modal/ModalImage"

function AdminListRefills(props) {
    //User
    const User = useSelector(UserSelector.Auth.User)
    const accessToken = useSelector(UserSelector.Auth.AccessToken)
    const dispatch = useDispatch()
    const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
    //Data
    const RefillPending = useSelector(AdminSelector.Data.RefillPending)
    const RefillHistorys = useSelector(AdminSelector.Data.RefillHistory)

    const Users = useSelector(AdminSelector.Data.Users)

    const [RefillPendingRender, setRefillPendingRender] = useState([])

    //Data Render
    const limit = 10

    //Pending
    const [pagePending, setPagePending] = useState(1)
    useEffect(() => {
        const offsetPending = (pagePending - 1) * limit
        const list = RefillPending.slice(offsetPending, offsetPending + limit)
        setRefillPendingRender(list)
    }, [RefillPending, pagePending])

    //Filter History
    const [userName, setUserName] = useState("All")
    const [sign, setSign] = useState("")

    //History
    const [PaymentHistorys, setPaymentHistorys] = useState([])
    const [pageHistory, setPageHistory] = useState(1)
    useEffect(() => {
        const offsetHistory = (pageHistory - 1) * limit
        if (userName === "All") {
            const list = RefillHistorys.slice(
                offsetHistory,
                offsetHistory + limit
            )
            setPaymentHistorys(list)
        } else {
            const listHisstory = RefillHistorys?.filter(
                item => item.User?.userName === userName
            )
            const list = listHisstory.slice(
                offsetHistory,
                offsetHistory + limit
            )
            setPaymentHistorys(list)
        }
    }, [RefillHistorys, pageHistory, userName])

    //Modal Image
    const [payment, setPayment] = useState(null)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    //Socket
    const socket = useContext(SockeContext)
    useEffect(() => {
        if (accessToken) {
            handleEvents(socket, User, dispatch, accessToken)
        } else {
            socket.emit("socket_off", socket.id)
        }
    }, [accessToken, socket, User])

    const handleAccessPayment = async payment => {
        if (accessToken) {
            await AdminPaymentApi.HandlePayment(
                accessToken,
                dispatch,
                RefreshListRefillSuccess,
                payment.id,
                "Success"
            )
            await AdminPaymentApi.Refills.GetAll(
                accessToken,
                dispatch,
                RefreshListRefillSuccess
            )
            socket.emit("_events", {
                from: User?.userName,
                to: payment.User.userName,
                action: "Success_Refills",
            })
        }
    }

    const handleCanclePayment = async payment => {
        await AdminPaymentApi.HandlePayment(
            accessToken,
            axiosJwt,
            dispatch,
            RefreshListRefillSuccess,
            payment?.id,
            "Error"
        )
        await AdminPaymentApi.Refills.GetAll(
            accessToken,
            axiosJwt,
            dispatch,
            RefreshListRefillSuccess
        )
    }

    const handleDeletePayments = async payment => {
        alert(payment.id)
    }

    //find by sign
    useEffect(() => {
        const offsetHistory = (pageHistory - 1) * limit
        if (sign !== "") {
            const list = RefillHistorys.filter(
                item => item.sign?.toLowerCase().indexOf(sign) > -1
            )
            const listrender = list.slice(offsetHistory, offsetHistory + limit)
            setPaymentHistorys(listrender)
        } else {
            const listrender = RefillHistorys.slice(
                offsetHistory,
                offsetHistory + limit
            )
            setPaymentHistorys(listrender)
        }
    }, [RefillHistorys, sign])

    return (
        <div id="dashboard_Refill">
            <div className="bgr_white mt-2 refill_content">
                {RefillPendingRender.length > 0 ? (
                    <div className="refill_item">
                        <div className="hearder_hag">
                            <h1>Lệnh Đang Chờ</h1>
                        </div>
                        <div className="table_refill">
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
                                    {RefillPendingRender?.map((item, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className="txt_center"
                                            >
                                                <td>{index + 1}</td>
                                                <td>
                                                    {item.sign?.split("_")[4]}
                                                </td>
                                                <td>{item.User?.userName}</td>
                                                <td>
                                                    {formatMoney2(item.amount)}
                                                </td>
                                                <td>
                                                    {`${item.BankOfUser?.Bank?.sign} - ${item.BankOfUser?.number}`}{" "}
                                                </td>
                                                <td>
                                                    {`${item.ReceiveBank?.Bank?.sign} - ${item.ReceiveBank?.number}`}{" "}
                                                </td>
                                                <td
                                                    className={
                                                        item.status ===
                                                        "Pending"
                                                            ? "text-info"
                                                            : item.status ===
                                                              "Success"
                                                            ? "text-success"
                                                            : item.status ===
                                                              "Error"
                                                            ? "text-danger"
                                                            : ""
                                                    }
                                                >
                                                    {item.status}
                                                </td>
                                                <td>
                                                    <Button
                                                        onClick={() => {
                                                            setPayment(item)
                                                            handleShow()
                                                        }}
                                                    >
                                                        Check
                                                    </Button>
                                                </td>
                                                <td>
                                                    {formatDate(item.createdAt)}
                                                </td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Button
                                                            onClick={() =>
                                                                handleAccessPayment(
                                                                    item
                                                                )
                                                            }
                                                            variant="success"
                                                        >
                                                            Accept
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                handleCanclePayment(
                                                                    item
                                                                )
                                                            }
                                                            variant="danger"
                                                        >
                                                            Cancle
                                                        </Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            <ModalImage
                                show={show}
                                handleClose={handleClose}
                                payment={payment}
                            />
                        </div>
                        {Math.floor(RefillPending.length) / limit > 1 && (
                            <PaginationHag
                                page={pagePending}
                                setPage={setPagePending}
                                length={RefillPending.length}
                                limit={limit}
                            />
                        )}
                    </div>
                ) : (
                    <div className="refill_item">
                        <div className="hearder_hag">
                            <h1>Lệnh Đang Chờ</h1>
                        </div>

                        <p className="text-danger">Chưa có dữ liệu.</p>
                    </div>
                )}

                <div className="refill_item">
                    <div className="hearder_hag">
                        <h1>Lích Sữ Nạp</h1>
                    </div>
                    <div className="table_refill">
                        <div className="filter d-flex">
                            <Form.Group
                                className="mb-3 w-50 me-2"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Lọc theo tên</Form.Label>
                                <Form.Select
                                    defaultValue={"All"}
                                    onChange={e => setUserName(e.target.value)}
                                >
                                    <option value={"All"}>All</option>
                                    {Users?.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.userName}
                                            >
                                                {item.userName}
                                            </option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 w-50 ms-2"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Lọc theo MGD</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Mã giao dịch"
                                        value={sign}
                                        onChange={e => setSign(e.target.value)}
                                    />
                                </InputGroup>
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
                                {PaymentHistorys?.map((item, index) => {
                                    return (
                                        <tr key={index} className="txt_center">
                                            <td>{index + 1}</td>
                                            <td>{item.sign?.split("_")[4]}</td>
                                            <td>{item.User?.userName}</td>
                                            <td>{formatMoney2(item.amount)}</td>
                                            <td>
                                                {`${item.BankOfUser?.Bank?.sign} - ${item.BankOfUser?.number}`}{" "}
                                            </td>
                                            <td>
                                                {`${item.ReceiveBank?.Bank?.sign} - ${item.ReceiveBank?.number}`}{" "}
                                            </td>
                                            <td
                                                className={
                                                    item.status === "Pending"
                                                        ? "text-info"
                                                        : item.status ===
                                                          "Success"
                                                        ? "text-success"
                                                        : item.status ===
                                                          "Error"
                                                        ? "text-danger"
                                                        : ""
                                                }
                                            >
                                                {item.status}
                                            </td>
                                            <td>
                                                <Button
                                                    onClick={() => {
                                                        setPayment(item)
                                                        handleShow()
                                                    }}
                                                >
                                                    Check
                                                </Button>
                                            </td>
                                            <td>
                                                {formatDate(item.createdAt)}
                                            </td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button
                                                        onClick={() =>
                                                            handleDeletePayments(
                                                                item
                                                            )
                                                        }
                                                        variant="danger"
                                                    >
                                                        Delete
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <ModalImage
                            show={show}
                            handleClose={handleClose}
                            payment={payment}
                        />
                    </div>
                    <PaginationHag
                        page={pageHistory}
                        setPage={setPageHistory}
                        length={PaymentHistorys.length}
                        limit={limit}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminListRefills
