import TableWithdraw from '@/components/withdraw/TableWithdraw';
import { formatMoney } from '@/config/formatMoney';
import ErrorLogin from '@/layout/errorLogin/ErrorLogin';
import PaginationHag from '@/layout/pagination';
import { DataSelector } from '@/redux/selector/DataSelector';
import { UserSelector } from '@/redux/selector/UserSelector';
import { RefreshUserSuccess, UpdateWithdrawSuccess } from '@/redux/slice/user';
import { CreateAxiosInstance } from 'data/api/axiosClient/createAxiosInstance';
import { UserPaymentsApi } from 'data/api/users/payments';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Form, ListGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function UserWithdraw(props) {
    const dispatch = useDispatch();

    const AccessToken = useSelector(UserSelector.Auth.AccessToken);
    const axiosJwt = CreateAxiosInstance(dispatch, AccessToken);
    const User = useSelector(UserSelector.Auth.User);
    //Data  
    const WithdrawPending = useSelector(UserSelector.Payments.WithdrawPending);
    const WithdrawHistory = useSelector(UserSelector.Payments.WithdrawHistory);
    console.log(WithdrawHistory)

    const BankUser = useSelector(UserSelector.Payments.BankOfUsers);
    const BankPublic = useSelector(DataSelector.ReceiveBanks);

    const [idBankUser, setIdBankUser] = useState("");
    const [amount, setAmount] = useState("");



    const handleCreateWithdraw = async () => {
        const surplus = Number(User?.surplus) - Number(amount);
        if (surplus > 0) {
            await UserPaymentsApi.Money.CreateWithdraw(AccessToken, axiosJwt, User?.id, amount, idBankUser, dispatch, UpdateWithdrawSuccess, RefreshUserSuccess);
        } else {
            toast.error("Số dư không đủ!");
        };
    }

    return (
        <div id='withdraw'>
            <Container>
                {
                    AccessToken ?
                        <div className='withdraw_content bgr_white mt-2'>
                            <div className='note_whithdraw'>
                                <div className='hearder_hag'>
                                    <h1>Lưu Ý Rút Tiền</h1>
                                </div>
                                <ul>
                                    <li>- Rút tiền về ví MOMO Chỉ Xử Lý Cho Đơn Nhỏ Hơn 200.001đ Quá Sẽ Bị Hủy Đơn.</li>
                                    <li>- Trạng Thái Đơn Chờ xử lý Là Đơn Chuyển Đang Trong Quá Trình Xử Lý.</li>
                                    <li>- Trạng Thái Đơn Chờ kiểm tra lại Là Đơn Chuyển Tiền Thất Bại, Admin sẽ xử lý trong vòng 24h , có thể liên hệ Tại Đây để được xử lý nhanh hơn.</li>
                                    <li>- Trạng Thái Đơn Hoàn Thành Là Đơn Đơn Chuyển Tiền Thành Công.</li>
                                    <li>Tiền Rút Viết Liền, Trừ Phí Trước Khi Rút</li>
                                </ul>
                            </div>
                            <div className='withdraw_item'>
                                <Row>
                                    <Col xs={6}>
                                        <div className='create_withdraw'>
                                            <div className='hearder_hag'>
                                                <h1>Tạo Phiếu Rút Tiền</h1>
                                            </div>
                                            <div className='create_withdraw_content'>
                                                <div className='create_withdraw_item'>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Số tiền rút</Form.Label>
                                                        <Form.Control type="text" placeholder="Số tiền xxx.000đ" name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                                                        <Form.Text className="text-danger">
                                                            Tối thiểu 10,000đ , Tối đa 100,000,000đ - Bỏ 3 số "0" cuối cùng. Vd: Rút 1,000,000đ {"=>"} Nhập: "1000"
                                                        </Form.Text>
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Ngân hàng rút</Form.Label>
                                                        <Form.Select defaultValue={""} onChange={(e) => setIdBankUser(e.target.value)}>
                                                            <option value={""}>Chọn ngân hàng rút</option>
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
                                                <h1>Hạn Mức - Mức Phí</h1>
                                            </div>
                                            <div className='limit_content'>
                                                <ListGroup horizontal>
                                                    <div>
                                                        <ListGroup.Item>Tổng hạn mức ngày</ListGroup.Item>
                                                        <ListGroup.Item className='txt_bold text-danger'>Không hạn chế</ListGroup.Item>
                                                    </div>
                                                    <div>
                                                        <ListGroup.Item>Số tiền tối thiểu</ListGroup.Item>
                                                        <ListGroup.Item className='txt_bold text-danger'>10,000đ</ListGroup.Item>
                                                    </div>
                                                    <div>
                                                        <ListGroup.Item>Số tiền tối đa</ListGroup.Item>
                                                        <ListGroup.Item className='txt_bold text-danger'>100,000,000đ</ListGroup.Item>
                                                    </div>
                                                </ListGroup>
                                            </div>
                                            <div className='table_limit mt-4'>
                                                <Table striped bordered hover size="sm">
                                                    <thead>
                                                        <tr className='txt_center'>
                                                            <th>Cổng thanh toán</th>
                                                            <th>Phí cố định</th>
                                                            <th>Mức phí %</th>
                                                            <th>Mức rút không phí</th>
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
                                        <h1>Lệnh Nạp Đang Xử Lý</h1>
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
                                                <p className='text-danger'>Chưa có dữ liệu</p>
                                            </div>
                                    }
                                </div>

                                <div className='table_history'>
                                    <div className='hearder_hag'>
                                        <h1>Lịch Sữ Rút Tiền</h1>
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
                                                <p className='text-danger'>Chưa có dữ liệu</p>
                                            </div>
                                    }
                                </div>


                            </div>
                        </div>
                        :
                        <ErrorLogin />
                }
            </Container>


        </div>
    );
}

export default UserWithdraw;

