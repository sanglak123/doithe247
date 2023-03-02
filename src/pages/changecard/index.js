import UserChangeCard from '@/components/changeCard/ChangeCard';
import TablePrices from '@/components/tablePrices';
import { formatMoney, formatDate } from '@/config/formatMoney';
import { UserSelector } from '@/redux/selector/UserSelector';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { socket } from "@/pages"
import { rootApi } from 'data/api/configApi';

function ChangeCardsPage(props) {
    //Data
    const ProductUser = useSelector(UserSelector.Payments.Products);

    //User   
    const accessToken = useSelector(UserSelector.Auth.AccessToken);

    const limit = 10;
    const [page, setPage] = useState(1);
    const [listProductRender, setListProductRender] = useState([]);

    const handlePrev = () => {
        if (page > 1) {
            setPage(pre => pre - 1)
        }
    }
    const handleNext = () => {
        if (page < ProductUser.length / limit) {
            setPage(pre => pre + 1)
        }
    }

    useEffect(() => {
        const offset = (page - 1) * limit;
        const list = ProductUser.slice(offset, offset + limit);
        setListProductRender(list)
    }, [ProductUser, page]);

    return (
        <div id='change_cards'>
            <Container>
                <UserChangeCard />
                <TablePrices />
                {
                    accessToken && ProductUser.length > 0 &&
                    <div className='history_change bgr_white mt-2'>
                        <div className='hearder_hag'>
                            <h1>Lịch Sử Đổi Thẻ Cào</h1>
                        </div>
                        <div className='table_change'>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr className='txt_center'>
                                        <th>#</th>
                                        <th>Nhà Mạng</th>
                                        <th>Mệnh Giá</th>
                                        <th>Mã Thẻ</th>
                                        <th>Serial</th>
                                        <th>Trạng Thái</th>
                                        <th>Chiết khấu</th>
                                        <th>Thực Nhận</th>
                                        <th>Ngày Tháng</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listProductRender?.map((item, index) => {
                                            return (
                                                <tr key={index} className='txt_center'>
                                                    <td>{index + 1}</td>
                                                    <td>{item.Price?.Card?.telco}</td>
                                                    <td>{formatMoney(item.Price?.Value?.name)}</td>
                                                    <td>{item?.code}</td>
                                                    <td>{item?.serial}</td>
                                                    <td className={item?.status === "Pending" ? "text-info" : item?.status === "Success" ? "text-success" : item?.status === "Penanty" ? "text-warning" : item?.status === "Error" ? "text-danger" : ""}>{item?.status}</td>
                                                    <td>{item?.feesChange}%</td>
                                                    <td>{formatMoney(item.receiveValue)}</td>
                                                    <td>{formatDate(item?.createdAt)}</td>
                                                    <td>
                                                        <ButtonGroup>
                                                            <Button variant='primary'>CallBack</Button>
                                                            <Button variant='info'>Check</Button>
                                                            <Button variant='danger'>Delete</Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            <div className='numberPage'>
                                <ButtonGroup>
                                    <Button onClick={handlePrev}>Prev</Button>
                                    <Button disabled>{page}</Button>
                                    <Button onClick={handleNext}>Next</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                }

            </Container >

        </div >
    );
}

export default ChangeCardsPage;