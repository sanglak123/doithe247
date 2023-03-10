import { formatMoney } from '@/config/formatMoney';
import { handleEvents, SockeContext } from '@/config/socketInit';
import { DataSelector } from '@/redux/selector/DataSelector';
import { UserSelector } from '@/redux/selector/UserSelector';
import { RefreshUserSuccess, UpdateWithdrawSuccess } from '@/redux/slice/user';
import { UserAuthApi } from 'data/api/users/auth';
import { UserPaymentsApi } from 'data/api/users/payments';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ErrorLogin from './layout/ErrorLogin';
import TableWithdraw from './layout/TableWithdraw';

function Withdraws(props) {
    const dispatch = useDispatch();

    const AccessToken = useSelector(UserSelector.Auth.AccessToken);
    const User = useSelector(UserSelector.Auth.User);
    //Data  
    const WithdrawPending = useSelector(UserSelector.Payments.WithdrawPending);
    const WithdrawHistory = useSelector(UserSelector.Payments.WithdrawHistory);
    console.log(WithdrawHistory)

    const BankUser = useSelector(UserSelector.Payments.BankOfUsers);
    const BankPublic = useSelector(DataSelector.ReceiveBanks);

    const [idBankUser, setIdBankUser] = useState("");
    const [amount, setAmount] = useState("");

    //Socket    
    const socket = useContext(SockeContext)
    useEffect(() => {
        if (AccessToken) {
            handleEvents(socket, User, dispatch, AccessToken)
        } else {
            socket.emit("socket_off", socket.id)
        }

    }, [AccessToken, socket, User]);

    const handleCreateWithdraw = async () => {
        if (AccessToken) {
            if (AccessToken) {
                const surplus = Number(User?.surplus) - Number(amount);
                if (surplus > 0) {
                    await UserPaymentsApi.Withdraws.Create(AccessToken, dispatch, User?.id, amount, idBankUser);
                    await UserAuthApi.RefreshUser(dispatch, AccessToken, User?.id, RefreshUserSuccess);
                    await UserPaymentsApi.Withdraws.GettAll(AccessToken, dispatch, User?.id, UpdateWithdrawSuccess);
                    socket.emit("_events", {
                        from: User?.userName,
                        to: "admin",
                        action: "Create_withdraw"
                    })
                } else {
                    toast.error("S??? d?? kh??ng ?????!");
                }
            }
        }
    };

    return (
        <div id='withdraw'>
          
                {
                    AccessToken ?
                        <div className='withdraw_content bgr_white mt-2'>
                            <div className='note_whithdraw'>
                                <div className='hearder_hag'>
                                    <h1>L??u ?? R??t Ti???n</h1>
                                </div>
                                <ul>
                                    <li>- R??t ti???n v??? v?? MOMO Ch??? X??? L?? Cho ????n Nh??? H??n 200.001?? Qu?? S??? B??? H???y ????n.</li>
                                    <li>- Tr???ng Th??i ????n Ch??? x??? l?? L?? ????n Chuy???n ??ang Trong Qu?? Tr??nh X??? L??.</li>
                                    <li>- Tr???ng Th??i ????n Ch??? ki???m tra l???i L?? ????n Chuy???n Ti???n Th???t B???i, Admin s??? x??? l?? trong v??ng 24h , c?? th??? li??n h??? T???i ????y ????? ???????c x??? l?? nhanh h??n.</li>
                                    <li>- Tr???ng Th??i ????n Ho??n Th??nh L?? ????n ????n Chuy???n Ti???n Th??nh C??ng.</li>
                                    <li>Ti???n R??t Vi???t Li???n, Tr??? Ph?? Tr?????c Khi R??t</li>
                                </ul>
                            </div>
                            <div className='withdraw_item'>
                                <Row>
                                    <Col xs={6}>
                                        <div className='create_withdraw'>
                                            <div className='hearder_hag'>
                                                <h1>T???o Phi???u R??t Ti???n</h1>
                                            </div>
                                            <div className='create_withdraw_content'>
                                                <div className='create_withdraw_item'>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>S??? ti???n r??t</Form.Label>
                                                        <Form.Control type="text" placeholder="S??? ti???n xxx.000??" name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                                                        <Form.Text className="text-danger">
                                                            T???i thi???u 10,000?? , T???i ??a 100,000,000?? - B??? 3 s??? "0" cu???i c??ng. Vd: R??t 1,000,000?? {"=>"} Nh???p: "1000"
                                                        </Form.Text>
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Ng??n h??ng r??t</Form.Label>
                                                        <Form.Select defaultValue={""} onChange={(e) => setIdBankUser(e.target.value)}>
                                                            <option value={""}>Ch???n ng??n h??ng r??t</option>
                                                            {
                                                                BankUser?.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item.id}>{`${item.Bank?.name} - ${item.Bank?.sign}/STK: ${item.number} - ${item.owner}`}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </Form.Group>

                                                    <Button onClick={() => handleCreateWithdraw()} variant="primary" type="button">
                                                        Submit
                                                    </Button>

                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='limit_withdraw'>
                                            <div className='hearder_hag'>
                                                <h1>H???n M???c - M???c Ph??</h1>
                                            </div>
                                            <div className='limit_content'>
                                                <ListGroup horizontal>
                                                    <div>
                                                        <ListGroup.Item>T???ng h???n m???c ng??y</ListGroup.Item>
                                                        <ListGroup.Item className='txt_bold text-danger'>Kh??ng h???n ch???</ListGroup.Item>
                                                    </div>
                                                    <div>
                                                        <ListGroup.Item>S??? ti???n t???i thi???u</ListGroup.Item>
                                                        <ListGroup.Item className='txt_bold text-danger'>10,000??</ListGroup.Item>
                                                    </div>
                                                    <div>
                                                        <ListGroup.Item>S??? ti???n t???i ??a</ListGroup.Item>
                                                        <ListGroup.Item className='txt_bold text-danger'>100,000,000??</ListGroup.Item>
                                                    </div>
                                                </ListGroup>
                                            </div>
                                            <div className='table_limit mt-4'>
                                                <Table striped bordered hover size="sm">
                                                    <thead>
                                                        <tr className='txt_center'>
                                                            <th>C???ng thanh to??n</th>
                                                            <th>Ph?? c??? ?????nh</th>
                                                            <th>M???c ph?? %</th>
                                                            <th>M???c r??t kh??ng ph??</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            BankPublic?.map((item, index) => {
                                                                return (
                                                                    <tr key={index} className='txt_center'>
                                                                        <td>{item.Bank?.name}</td>
                                                                        <td>{formatMoney("500")}</td>
                                                                        <td>0%</td>
                                                                        <td>{formatMoney("500000")}</td>
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
                                <div className='table_pending'>
                                    <div className='hearder_hag'>
                                        <h1>L???nh R??t ??ang X??? L??</h1>
                                    </div>
                                    {
                                        WithdrawPending.length > 0 ?
                                            <div className='table_withdraw'>
                                                <TableWithdraw
                                                    Array={WithdrawPending}
                                                />
                                            </div>
                                            :
                                            <div className='table_withdraw'>
                                                <p className='text-danger'>Ch??a c?? d??? li???u</p>
                                            </div>
                                    }
                                </div>

                                <div className='table_history'>
                                    <div className='hearder_hag'>
                                        <h1>L???ch S??? R??t Ti???n</h1>
                                    </div>
                                    {
                                        WithdrawHistory.length > 0 ?
                                            <div className='table_withdraw'>
                                                <TableWithdraw
                                                    Array={WithdrawHistory}
                                                />
                                            </div>
                                            :
                                            <div className='table_withdraw'>
                                                <p className='text-danger'>Ch??a c?? d??? li???u</p>
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

export default Withdraws;

