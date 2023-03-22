import { formatDate, formatMoney, formatMoney2 } from '@/config/formatMoney';
import { handleEvents, SockeContext } from '@/config/socketInit';
import PaginationHag from '@/layout/pagination';
import { DataSelector } from '@/redux/selector/DataSelector';
import { UserSelector } from '@/redux/selector/UserSelector';
import { UpdateRefillSuccess } from '@/redux/slice/user';
import { UserPaymentsApi } from 'data/api/users/payments';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ErrorLogin from './layout/ErrorLogin';


function Refills(props) {

    const dispatch = useDispatch();
    //Data  
    const Banks = useSelector(DataSelector.Banks);
    const BankPublics = useSelector(DataSelector.ReceiveBanks);

    //DataUser
    const RefillPending = useSelector(UserSelector.Payments.RefillPending);
    const RefillHistory = useSelector(UserSelector.Payments.RefillHistory);

    //User
    const AccessToken = useSelector(UserSelector.Auth.AccessToken);
    const User = useSelector(UserSelector.Auth.User);
    const BankOfUsers = useSelector(UserSelector.Payments.BankOfUsers);

    const [amount, setAmount] = useState("");
    const [idBankUser, setIdBankUser] = useState("");
    const [idBankPublic, setIdBankPublic] = useState("");
    const [photo, setPhoto] = useState("");

    //Step
    const [step, setStep] = useState(1)
    useEffect(() => {
        if (amount > 9.9999 && idBankUser !== "") {
            setStep(2)
        } else {
            setStep(1);
            setPhoto("");
            setIdBankPublic("")
        }
    }, [amount, idBankUser])

    useEffect(() => {
        if (amount !== "" && idBankPublic !== "") {
            setStep(3)
        } else {
            setPhoto("")
        }
    }, [amount, idBankPublic]);

    //Socket    
    const socket = useContext(SockeContext)
    useEffect(() => {
        if (AccessToken) {
            handleEvents(socket, User, dispatch, AccessToken)
        } else {
            socket.emit("socket_off", socket.id)
        }
    }, [AccessToken, socket, User]);

    const hadleCreateRefill = async () => {
        if (AccessToken) {
            await UserPaymentsApi.Refills.Create(AccessToken, dispatch, User?.id, amount, idBankUser, idBankPublic, photo);
            await UserPaymentsApi.Refills.GetAll(AccessToken, dispatch, User.id, UpdateRefillSuccess);
            socket.emit("_events", {
                from: User?.userName,
                to: "admin",
                action: "Create_refill"
            })
        }
    };

    const handleDeletePayment = async (payment) => {
        await UserPaymentsApi.Refills.Delete(AccessToken, dispatch, payment.id);
        await UserPaymentsApi.Refills.GetAll(AccessToken, dispatch, User.id, UpdateRefillSuccess);
    };

    const handleRefreshPayment = async () => {
        await UserPaymentsApi.Refills.GetAll(AccessToken, dispatch, User.id, UpdateRefillSuccess);
        toast.success("Cập nhật thành công!")
    };

    //limit
    const limit = 10;
    //Pending 
    const [PendingRender, setPendingRender] = useState([]);
    const [pageRending, setPageRending] = useState(1);
    useEffect(() => {
        const offset = (pageRending - 1) * limit;

        const filter = RefillPending?.slice(offset, (offset + limit));
        setPendingRender(filter);
    }, [RefillPending, pageRending]);

    //History  
    const [HistoryRender, setHistoryRender] = useState([]);
    const [pageHistory, setPageHistory] = useState(1);
    useEffect(() => {
        const offset = (pageHistory - 1) * limit;
        const filter = RefillHistory?.slice(offset, (offset + limit));
        setHistoryRender(filter);
    }, [RefillHistory, pageHistory]);
    return (
        <div id='topup'>
            {
                AccessToken ?
                    <div className='refill_content bgr_dark'>
                        <div className='refill_item'>
                            <div className='refill_hearder'>
                                <div className='hearder_hag'>
                                    <h1>Lưu Ý Nạp Quỹ</h1>
                                </div>
                                <ul>
                                    <li>
                                        - Nạp quỹ bằng tài khoản ngân hàng của bạn.Lợi dụng tính năng để RỬA TIỀN, NẠP XONG RÚT, KHÔNG NẠP CHÍNH CHỦ sẽ bị khóa vĩnh viễn, không hoàn số dư . Thời gian đợi thanh toán đối đa 15 phút.
                                    </li>
                                    <li>
                                        1. Chỉ cho phép Nạp tiền bằng ATM/MOMO của chính bạn để mua bán card, chuyển tiền, giao dịch hợp pháp
                                    </li>
                                    <li>
                                        2. Lấy ATM/MOMO của người khác nạp tiền vào web sẽ bị khóa vĩnh viễn, tịch thu tiền
                                    </li>
                                    <li>
                                        3. Nghiêm cấm nạp ATM xong rút Momo hoặc nạp Momo xong rút ATM
                                    </li>
                                    <li>
                                        4. Thời gian đợi thanh toán đối đa 15 phút. Hệ thống tự động cộng tiền 24/24. Vui lòng ghi đúng STK, nội dung chuyển khoản, Số tiền (sai sẽ bị phạt 20%)
                                    </li>
                                </ul>
                            </div>
                            <Row>
                                <Col>
                                    <div className='refill_main'>
                                        <div className='hearder_hag'>
                                            <h1>Tạo Phiếu Nạp Quỹ</h1>
                                        </div>
                                        <div className='refill_main_content'>
                                            <div className='refill_main_item'>
                                                <p>Số dư quỹ: <span className='text-success txt_bold'>{formatMoney(User?.surplus)}</span></p>
                                                <p>Số dư quỹ khả dụng: <span className='text-success txt_bold'>{formatMoney(User?.surplus)}</span></p>
                                            </div>
                                            <div className='refill_main_item'>
                                                <div className='b1'>
                                                    <h6 className='txt_bold'>
                                                        <Form.Check
                                                            type={"radio"}
                                                            label={"Bước 1: Số tiền - Phương thức nạp"}
                                                            checked={step > 1}
                                                            readOnly
                                                        />
                                                    </h6>

                                                    <div className='b1_item'>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Số Tiền Nạp <span className='text-danger'>.000đ</span></Form.Label>
                                                            <Form.Control type="text" placeholder="Số tiền nạp" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                                            <Form.Text className="text-danger">
                                                                Tối thiểu 10,000 VNĐ - Tố đa 200,000,000 VNĐ (Chú ý lượt bỏ 3 số "0" sau cùng VD: Nạp :10,000đ {"=>"} Ghi: 10)
                                                            </Form.Text>
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Phương Thức Nạp</Form.Label>
                                                            <Form.Select defaultValue={""} onClick={(e) => setIdBankUser(e.target.value)}>
                                                                <option value={""}>Chon phương thức nạp</option>
                                                                {
                                                                    BankOfUsers?.map((item, index) => {
                                                                        return (
                                                                            <option value={item.id} key={index}>{item.Bank?.name} - {item.number}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Select>
                                                            <Form.Text className="text-danger">
                                                                Tối thiểu 10,000 VNĐ - Tố đa 200,000,000 VNĐ
                                                            </Form.Text>
                                                        </Form.Group>
                                                    </div>
                                                </div>

                                                {
                                                    step > 1 &&
                                                    <div className='b2'>
                                                        <h6 className='txt_bold'>
                                                            <Form.Check
                                                                type={"radio"}
                                                                label={"Bước 2: Chọn ngân hàng nạp tiền"}
                                                                checked={step > 2}
                                                                readOnly
                                                            />
                                                        </h6>

                                                        <div className='b2_item'>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Ngân hàng nạp tiền</Form.Label>
                                                                <Form.Select defaultValue={""} onChange={(e) => setIdBankPublic(e.target.value)}>
                                                                    <option value={""}>Chon ngân hàng nạp</option>
                                                                    {
                                                                        BankPublics?.map((item, index) => {
                                                                            return (
                                                                                <option value={item.id} key={index}>{item.Bank?.name} - {item.number}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                }

                                                {
                                                    step > 2 &&
                                                    <>

                                                        <div className='b3'>
                                                            <h6 className='txt_bold'>
                                                                <Form.Check
                                                                    type={"radio"}
                                                                    label={"Bước 3: Tải hình ảnh xác minh"}
                                                                    checked={photo !== ""}
                                                                    readOnly
                                                                />
                                                            </h6>

                                                            <div className='b3_item'>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Label>Chọn ảnh</Form.Label>
                                                                    <Form.Control accept='image/*' type='file' onChange={(e) => setPhoto(e.target.files[0])} />
                                                                </Form.Group>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Button type='button'
                                                                disabled={
                                                                    amount < 10 || idBankPublic === "" || photo === ""
                                                                }
                                                                onClick={() => hadleCreateRefill()}
                                                            >Xác nhận</Button>
                                                        </div>
                                                    </>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='refill_limit'>
                                        <div className='refill_bot'>
                                            <div className='hearder_hag'>
                                                <h1>Hạn Mức Và Mức Phí</h1>
                                            </div>
                                        </div>
                                        <div className='table_limit'>
                                            <Table striped bordered hover>
                                                <tbody>
                                                    <tr>
                                                        <td>Tổng hạn mức ngày</td>
                                                        <td className='txt_bold'>Không hạn chế</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Số tiền tối thiểu</td>
                                                        <td className='txt_bold'>10,000 đ</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Số tiền tối đa</td>
                                                        <td className='txt_bold'>10,000,000 đ</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                        <div>
                                            <Table striped bordered hover className='w-50'>
                                                <thead>
                                                    <tr>
                                                        <th>Cổng Thanh Toán</th>
                                                        <th>Phí cố định</th>
                                                        <th>Phí</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        Banks?.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{item.name} - {item.sign}</td>
                                                                    <td>0 đ</td>
                                                                    <td>0 %</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </Col>
                            </Row>



                            <div className='refill_pending'>
                                {
                                    PendingRender?.length > 0 &&
                                    <div className='refill_history_content'>
                                        <div className='hearder_hag'>
                                            <h1>Lệnh Đang Chờ</h1>
                                        </div>
                                        <div className='table_history_refill'>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr className='txt_center'>
                                                        <th>#</th>
                                                        <td>Mã giao dịch</td>
                                                        <th>Ngân hàng</th>
                                                        <th>Số tài khoản</th>
                                                        <th>Value</th>
                                                        <th>ReceiveBank</th>
                                                        <th>Trạng thái</th>
                                                        <th>Ngày tháng</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        PendingRender?.map((item, index) => {
                                                            return (
                                                                <tr className='txt_center' key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.sign?.split("_")[4]}</td>
                                                                    <td>{item.BankOfUser?.Bank?.name}</td>
                                                                    <td>{item.BankOfUser?.number}</td>
                                                                    <td>{formatMoney2(item.amount)}</td>
                                                                    <td>{item.ReceiveBank?.Bank?.sign} - {item.ReceiveBank?.number}</td>
                                                                    <td className={item.status === "Pending" ? "text-info" : item.status === "Success" ? "text-success" : "text-danger"}>
                                                                        {
                                                                            item.status === "Pending" ?
                                                                                "Đang xử lý"
                                                                                :
                                                                                item.status === "Success" ?
                                                                                    "Thành công"
                                                                                    :
                                                                                    "Lỗi"
                                                                        }
                                                                    </td>
                                                                    <td>{formatDate(item.createdAt)}</td>
                                                                    <td>
                                                                        <Button disabled={item.status !== "Pending"} onClick={(e) => handleRefreshPayment()} variant='success'>Refresh</Button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                            {
                                                PendingRender.length > limit &&
                                                <PaginationHag
                                                    page={pageRending}
                                                    setPage={setPageRending}
                                                    length={PendingRender.length}
                                                    limit={limit}
                                                />
                                            }

                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='refill_history'>
                                {
                                    HistoryRender?.length > 0 &&
                                    <div className='refill_history_content'>
                                        <div className='hearder_hag'>
                                            <h1>Lịch Sử Nạp</h1>
                                        </div>
                                        <div className='table_history_refill'>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr className='txt_center'>
                                                        <th>#</th>
                                                        <td>Mã giao dịch</td>
                                                        <th>Ngân hàng</th>
                                                        <th>Số tài khoản</th>
                                                        <th>Value</th>
                                                        <th>ReceiveBank</th>
                                                        <th>Trạng thái</th>
                                                        <th>Ngày tháng</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        HistoryRender?.map((item, index) => {
                                                            return (
                                                                <tr className='txt_center' key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.sign?.split("_")[4]}</td>
                                                                    <td>{item.BankOfUser?.Bank?.name}</td>
                                                                    <td>{item.BankOfUser?.number}</td>
                                                                    <td>{formatMoney2(item.amount)}</td>
                                                                    <td>{item.ReceiveBank?.Bank?.sign} - {item.ReceiveBank?.number}</td>
                                                                    <td className={item.status === "Pending" ? "text-info" : item.status === "Success" ? "text-success" : "text-danger"}>
                                                                        {
                                                                            item.status === "Pending" ?
                                                                                "Đang xử lý"
                                                                                :
                                                                                item.status === "Success" ?
                                                                                    "Thành công"
                                                                                    :
                                                                                    "Lỗi"
                                                                        }
                                                                    </td>
                                                                    <td>{formatDate(item.createdAt)}</td>
                                                                    <td>
                                                                        <ButtonGroup>
                                                                            <Button disabled={item.status === "Pending"} onClick={(e) => handleDeletePayment(item)} variant='danger'>Delete</Button>
                                                                        </ButtonGroup>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                            {
                                                HistoryRender.length > limit &&
                                                <PaginationHag
                                                    page={pageHistory}
                                                    setPage={setPageHistory}
                                                    length={HistoryRender.length}
                                                    limit={limit}
                                                />
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <ErrorLogin />
            }

        </div>
    );
}

export default Refills;