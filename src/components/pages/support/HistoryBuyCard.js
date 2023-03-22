import { formatMoney, formatMoney2 } from '@/config/formatMoney';
import { UserSelector } from '@/redux/selector/UserSelector';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function HistoryBuyCard(props) {
    //User
    const accessToken = useSelector(UserSelector.Auth.AccessToken);
    const Products = useSelector(UserSelector.Payments.Products);
    const BuyCards = Products.filter(item => item.command === "buy")

    const [ArraySign, setArraySign] = useState([]);
    const [HistoryBuyCards, setHistoryBuyCards] = useState([]);

    useEffect(() => {
        BuyCards.map((item) => {
            if (!ArraySign.includes(item.sign)) {
                ArraySign.push(item.sign)
            }
        });
    }, [Products, BuyCards]);

    useEffect(() => {
        for (let index = 0; index < ArraySign.length; index++) {
            const list = BuyCards.filter(item => item.sign === ArraySign[index]);
            const newObj = {
                sign: ArraySign[index],
                data: list
            };
            const index2 = HistoryBuyCards.findIndex(item => item.sign === newObj.sign);
            if (index2 < 0) {
                HistoryBuyCards.push(newObj)
            }
        }
    }, [Products])

    const handleDelete = async (product) => {
        alert(product.id)
    };
    const handleCoppy = (buycard) => {
        alert(buycard.code)
    }
    return (
        accessToken &&
        <div id='HistoryBuyCard' className='bgr_dark mt-3'>
            <div className='HistoryChangeCard_header'>
                <div className='hearder_hag'>
                    <h1>Lịch Sử Mua Thẻ</h1>
                </div>
            </div>
            <div className='HistoryChangeCard_body'>
                <Table bordered>
                    <thead>
                        <tr className="txt_white txt_center">
                            <th>Mã đơn</th>
                            <th>Nhà mạng</th>
                            <th>Mệnh giá</th>
                            <th>Chiết khấu</th>
                            <th>Mã thẻ</th>
                            <th>Serial</th>
                            <th>Thực chi</th>
                            <th>Trạng thái</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            HistoryBuyCards.map((item) => {
                                return (
                                    item.data?.map((data, index2) => {
                                        return (
                                            <tr key={index2} className="txt_white txt_center">
                                                {
                                                    index2 === 0 &&
                                                    <td rowSpan={item.data.length}>
                                                        <p className='p-4'>{data.sign}</p>
                                                    </td>
                                                }
                                                <td>{data.Price?.Card?.telco}</td>
                                                <td>{formatMoney(data.Price?.Value?.name)}</td>
                                                <td>{data.Price?.feesBuy}%</td>
                                                <td>{data.code}</td>
                                                <td>{data.serial}</td>
                                                <td>8.500đ</td>
                                                <td>{data.status}</td>
                                                <td>
                                                    <Button className='me-2' variant='danger'>Delete</Button>
                                                    <Button onClick={() => handleCoppy(data)} className='ms-2' variant='success'>Coppy</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default HistoryBuyCard;