import { formatMoney } from '@/config/formatMoney';
import { AdminSelector } from '@/redux/selector/AdminSelector';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function BuyCards(props) {
    //Data
    const BuyCards = useSelector(AdminSelector.Data.BuyCards);

    const [total, setTotal] = useState({
        change: 0,
        receive: 0,
        freeMoney: 0
    });

    useEffect(() => {
        let a = 0;
        let b = 0;
        let c = 0;
        for (let index = 0; index < BuyCards.length; index++) {
            a += Number(BuyCards[index].Price?.Value?.name);
            b += Number(BuyCards[index].Price?.Value?.name) - (Number(BuyCards[index].Price?.Value?.name) * Number(BuyCards[index].Price?.feesChange) / 100);
            c = (a - b);
        };
        setTotal({
            change: a,
            receive: b,
            freeMoney: c
        })
    }, [BuyCards])

    return (
        <div id='change_card'>
            <div className='change_card_content bgr_white mt-2'>
                <div className='hearder_hag'>
                    <h1>BuyCards</h1>
                </div>
                <div className='table_change_card'>
                    <div className='total_price d-flex justify-content-between align-items-center'>
                        <p>Total Change Cards : {formatMoney(total.change)}</p>
                        <p>Total Receive : {formatMoney(total.receive)}</p>
                        <p>Total Free Money : {formatMoney(total.freeMoney)}</p>
                    </div>
                    {
                        BuyCards.length > 0 &&
                        <Table bordered size="sm">
                            <thead>
                                <tr className='txt_center'>
                                    <th>#</th>
                                    <th>Telco</th>
                                    <th>Value</th>
                                    <th>FeesChange</th>
                                    <th>Receive</th>
                                    <th>Status</th>
                                    <th>CreateAt</th>
                                    <th>User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    BuyCards?.map((item, index) => {
                                        return (
                                            <tr key={index} className='txt_center'>
                                                <td>{index + 1}</td>
                                                <td>{item.Price?.Card?.telco}</td>
                                                <td>{formatMoney(item.Price?.Value?.name)}</td>
                                                <td>{item.Price?.feesChange} %</td>
                                                <td>{formatMoney(Number(item.Price?.Value?.name) - (Number(item.Price?.Value?.name) * Number(item.Price?.feesChange) / 100))}</td>
                                                <td>Success</td>
                                                <td>{item.createdAt}</td>
                                                <td>{item.User?.userName}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    }

                </div>
            </div>
        </div>
    );
}

export default BuyCards;