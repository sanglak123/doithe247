import { formatMoney, formatMoney2 } from '@/config/formatMoney';
import { UserSelector } from '@/redux/selector/UserSelector';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function HistoryChangeCard(props) {
    //User
    const accessToken = useSelector(UserSelector.Auth.AccessToken);
    const Products = useSelector(UserSelector.Payments.Products);
    const HistoryChangeCards = Products.filter(item => item.command === "change" && item.status !== "Pending")

    const handleDelete = async (product) => {
        alert(product.id)
    }
    return (
        accessToken &&
        <div id='HistoryChangeCard' className='bgr_dark mt-3'>
            <div className='HistoryChangeCard_header'>
                <div className='hearder_hag'>
                    <h1>Lịch Sử Đổi Thẻ</h1>
                </div>
            </div>
            <div className='HistoryChangeCard_body'>
                <Table bordered>
                    <thead>
                        <tr className="txt_white txt_center">
                            <th>STT</th>
                            <th>Nhà mạng</th>
                            <th>Mã thẻ</th>
                            <th>Serial</th>
                            <th>Mệnh giá</th>
                            <th>Chiết khấu</th>
                            <th>Thực nhận</th>
                            <th>Trạng thái</th>
                            <th>Request_id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            HistoryChangeCards?.map((item, index) => {
                                return (
                                    <tr key={index} className="txt_white txt_center">
                                        <td>{index + 1}</td>
                                        <td>{item.Price?.Card?.telco}</td>
                                        <td>{item.code}</td>
                                        <td>{item.serial}</td>
                                        <td>{formatMoney(item.Price?.Value?.name)}</td>
                                        <td>{item.Price?.feesChange}</td>
                                        <td>{formatMoney2(item.receiveValue)}</td>
                                        <td className={item.status === "Success" ? "text-success" : item.status === "Error" ? "text-danger" : item.status === "Penanty" ? "text-warning" : ""}>{item.status}</td>
                                        <td>{item.request_id}</td>
                                        <td><Button onClick={() => handleDelete(item)} variant='danger'>Delete</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default HistoryChangeCard;