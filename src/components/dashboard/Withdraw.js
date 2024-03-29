import React, {useContext, useEffect, useState} from "react"
import {Button, ButtonGroup, Table} from "react-bootstrap"
import {toast} from "react-hot-toast"
import {useDispatch, useSelector} from "react-redux"
import {AdminPaymentApi} from "../../../data/api/admin/payments"
import {CreateAxiosInstance} from "../../../data/api/axiosClient/createAxiosInstance"
import {formatDate3, formatMoney2} from "../../config/formatMoney"
import {handleEvents, SockeContext} from "../../config/socketInit"
import PaginationHag from "../../layout/pagination"
import {AdminSelector} from "../../redux/selector/AdminSelector"
import {UserSelector} from "../../redux/selector/UserSelector"
import {
    RefreshListRefillSuccess,
    RefreshListWithdrawSuccess,
} from "../../redux/slice/admin"
import ModalShowPayments from "../pages/modal/ModalShowPayments"

function AdminListWithdraws(props) {
    //User
    const User = useSelector(UserSelector.Auth.User)
    const accessToken = useSelector(UserSelector.Auth.AccessToken)
    const dispatch = useDispatch()
    const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
    //Data
    const WithdrawPending = useSelector(AdminSelector.Data.WithdrawPending)

    const [PendingRender, setPendingRender] = useState([])

    //Data Render
    const limit = 10

    //Pending
    const [pagePending, setPagePending] = useState(1)
    useEffect(() => {
        const offsetPending = (pagePending - 1) * limit
        const list = WithdrawPending.slice(offsetPending, offsetPending + limit)
        setPendingRender(list)
    }, [WithdrawPending, pagePending])

    //Filter History
    const [userName, setUserName] = useState("All")

    const handleCanclePayment = async payment => {
        await AdminPaymentApi.HandlePayment(
            accessToken,
            axiosJwt,
            dispatch,
            RefreshListRefillSuccess,
            payment?.id,
            "Error"
        )
    }

    const handleDeletePayments = async payment => {
        alert(payment.id)
    }

    //Modal Show Payment
    const [showPayment, setShowPayment] = useState(false)
    const [paymentShow, setPaymentShow] = useState("")

    //Socket
    const socket = useContext(SockeContext)
    useEffect(() => {
        if (accessToken) {
            handleEvents(socket, User, dispatch, accessToken)
        } else {
            socket.emit("socket_off", socket.id)
        }
    }, [accessToken, socket, User])

    const handlePayWithdraw = async payment => {
        if (accessToken) {
            if (accessToken) {
                await AdminPaymentApi.Withdraws.PayWithdraw(
                    accessToken,
                    dispatch,
                    payment.id
                )
                await AdminPaymentApi.Withdraws.GetAll(
                    accessToken,
                    dispatch,
                    RefreshListWithdrawSuccess
                )
                socket.emit("_events", {
                    from: User?.userName,
                    to: payment.User.userName,
                    action: "Success_Withdraw",
                })
            } else {
                toast.error("Bạn chưa đăng nhập!")
            }
        }
    }

    return (
        <div id="dashboard_Refill">
            <div className="bgr_white mt-2 refill_content">
                {PendingRender.length > 0 ? (
                    <div className="refill_item">
                        <div className="hearder_hag">
                            <h1>Withdraws Pending</h1>
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
                                        <th>Status</th>
                                        <th>CreatedAt</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PendingRender?.map((item, index) => {
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
                                                    {formatDate3(
                                                        item.createdAt
                                                    )}
                                                </td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Button
                                                            onClick={() => {
                                                                setPaymentShow(
                                                                    item
                                                                )
                                                                setShowPayment(
                                                                    true
                                                                )
                                                            }}
                                                            variant="success"
                                                        >
                                                            Pay
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                handlePayWithdraw(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            Xác nhận
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
                            <ModalShowPayments
                                show={showPayment}
                                onHide={() => setShowPayment(false)}
                                payment={paymentShow}
                            />
                        </div>
                        {Math.floor(WithdrawPending.length) / limit > 1 && (
                            <PaginationHag
                                page={pagePending}
                                setPage={setPagePending}
                                length={WithdrawPending.length}
                                limit={limit}
                            />
                        )}
                    </div>
                ) : (
                    <div className="refill_item">
                        <div className="hearder_hag">
                            <h1>Whithdraws Pending</h1>
                        </div>

                        <p className="text-danger">Chưa có dữ liệu.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminListWithdraws
