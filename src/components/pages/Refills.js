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
        toast.success("C???p nh???t th??nh c??ng!")
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
                    <div className='refill_content bgr_white'>
                        <div className='refill_item'>
                            <div className='refill_hearder'>
                                <div className='hearder_hag'>
                                    <h1>L??u ?? N???p Qu???</h1>
                                </div>
                                <ul>
                                    <li>
                                        - N???p qu??? b???ng t??i kho???n ng??n h??ng c???a b???n.L???i d???ng t??nh n??ng ????? R???A TI???N, N???P XONG R??T, KH??NG N???P CH??NH CH??? s??? b??? kh??a v??nh vi???n, kh??ng ho??n s??? d?? . Th???i gian ?????i thanh to??n ?????i ??a 15 ph??t.
                                    </li>
                                    <li>
                                        1. Ch??? cho ph??p N???p ti???n b???ng ATM/MOMO c???a ch??nh b???n ????? mua b??n card, chuy???n ti???n, giao d???ch h???p ph??p
                                    </li>
                                    <li>
                                        2. L???y ATM/MOMO c???a ng?????i kh??c n???p ti???n v??o web s??? b??? kh??a v??nh vi???n, t???ch thu ti???n
                                    </li>
                                    <li>
                                        3. Nghi??m c???m n???p ATM xong r??t Momo ho???c n???p Momo xong r??t ATM
                                    </li>
                                    <li>
                                        4. Th???i gian ?????i thanh to??n ?????i ??a 15 ph??t. H??? th???ng t??? ?????ng c???ng ti???n 24/24. Vui l??ng ghi ????ng STK, n???i dung chuy???n kho???n, S??? ti???n (sai s??? b??? ph???t 20%)
                                    </li>
                                </ul>
                            </div>
                            <Row>
                                <Col>
                                    <div className='refill_main'>
                                        <div className='hearder_hag'>
                                            <h1>T???o Phi???u N???p Qu???</h1>
                                        </div>
                                        <div className='refill_main_content'>
                                            <div className='refill_main_item'>
                                                <p>S??? d?? qu???: <span className='text-success txt_bold'>{formatMoney(User?.surplus)}</span></p>
                                                <p>S??? d?? qu??? kh??? d???ng: <span className='text-success txt_bold'>{formatMoney(User?.surplus)}</span></p>
                                            </div>
                                            <div className='refill_main_item'>
                                                <div className='b1'>
                                                    <h6 className='txt_bold'>
                                                        <Form.Check
                                                            type={"radio"}
                                                            label={"B?????c 1: S??? ti???n - Ph????ng th???c n???p"}
                                                            checked={step > 1}
                                                            readOnly
                                                        />
                                                    </h6>

                                                    <div className='b1_item'>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>S??? Ti???n N???p <span className='text-danger'>.000??</span></Form.Label>
                                                            <Form.Control type="text" placeholder="S??? ti???n n???p" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                                            <Form.Text className="text-danger">
                                                                T???i thi???u 10,000 VN?? - T??? ??a 200,000,000 VN?? (Ch?? ?? l?????t b??? 3 s??? "0" sau c??ng VD: N???p :10,000?? {"=>"} Ghi: 10)
                                                            </Form.Text>
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Ph????ng Th???c N???p</Form.Label>
                                                            <Form.Select defaultValue={""} onClick={(e) => setIdBankUser(e.target.value)}>
                                                                <option value={""}>Chon ph????ng th???c n???p</option>
                                                                {
                                                                    BankOfUsers?.map((item, index) => {
                                                                        return (
                                                                            <option value={item.id} key={index}>{item.Bank?.name} - {item.number}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Select>
                                                            <Form.Text className="text-danger">
                                                                T???i thi???u 10,000 VN?? - T??? ??a 200,000,000 VN??
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
                                                                label={"B?????c 2: Ch???n ng??n h??ng n???p ti???n"}
                                                                checked={step > 2}
                                                                readOnly
                                                            />
                                                        </h6>

                                                        <div className='b2_item'>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Ng??n h??ng n???p ti???n</Form.Label>
                                                                <Form.Select defaultValue={""} onChange={(e) => setIdBankPublic(e.target.value)}>
                                                                    <option value={""}>Chon ng??n h??ng n???p</option>
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
                                                                    label={"B?????c 3: T???i h??nh ???nh x??c minh"}
                                                                    checked={photo !== ""}
                                                                    readOnly
                                                                />
                                                            </h6>

                                                            <div className='b3_item'>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Label>Ch???n ???nh</Form.Label>
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
                                                            >X??c nh???n</Button>
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
                                                <h1>H???n M???c V?? M???c Ph??</h1>
                                            </div>
                                        </div>
                                        <div className='table_limit'>
                                            <Table striped bordered hover>
                                                <tbody>
                                                    <tr>
                                                        <td>T???ng h???n m???c ng??y</td>
                                                        <td className='txt_bold'>Kh??ng h???n ch???</td>
                                                    </tr>
                                                    <tr>
                                                        <td>S??? ti???n t???i thi???u</td>
                                                        <td className='txt_bold'>10,000 ??</td>
                                                    </tr>
                                                    <tr>
                                                        <td>S??? ti???n t???i ??a</td>
                                                        <td className='txt_bold'>10,000,000 ??</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                        <div>
                                            <Table striped bordered hover className='w-50'>
                                                <thead>
                                                    <tr>
                                                        <th>C???ng Thanh To??n</th>
                                                        <th>Ph?? c??? ?????nh</th>
                                                        <th>Ph??</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        Banks?.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{item.name} - {item.sign}</td>
                                                                    <td>0 ??</td>
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
                                            <h1>L???nh ??ang Ch???</h1>
                                        </div>
                                        <div className='table_history_refill'>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr className='txt_center'>
                                                        <th>#</th>
                                                        <td>M?? giao d???ch</td>
                                                        <th>Ng??n h??ng</th>
                                                        <th>S??? t??i kho???n</th>
                                                        <th>Value</th>
                                                        <th>ReceiveBank</th>
                                                        <th>Tr???ng th??i</th>
                                                        <th>Ng??y th??ng</th>
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
                                                                                "??ang x??? l??"
                                                                                :
                                                                                item.status === "Success" ?
                                                                                    "Th??nh c??ng"
                                                                                    :
                                                                                    "L???i"
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
                                            <h1>L???ch S??? N???p</h1>
                                        </div>
                                        <div className='table_history_refill'>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr className='txt_center'>
                                                        <th>#</th>
                                                        <td>M?? giao d???ch</td>
                                                        <th>Ng??n h??ng</th>
                                                        <th>S??? t??i kho???n</th>
                                                        <th>Value</th>
                                                        <th>ReceiveBank</th>
                                                        <th>Tr???ng th??i</th>
                                                        <th>Ng??y th??ng</th>
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
                                                                                "??ang x??? l??"
                                                                                :
                                                                                item.status === "Success" ?
                                                                                    "Th??nh c??ng"
                                                                                    :
                                                                                    "L???i"
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