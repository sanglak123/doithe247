import { formatMoney } from '@/config/formatMoney';
import { AdminSelector } from '@/redux/selector/AdminSelector';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function ChangeCards(props) {
    //Data   
    const ChangeCards = useSelector(AdminSelector.Data.ChangeCards);

    const [total, setTotal] = useState({
        change: 0,
        receive: 0,
        freeMoney: 0
    });

    useEffect(() => {
        let a = 0;
        let b = 0;
        let c = 0;
        for (let index = 0; index < ChangeCards.length; index++) {
            a += Number(ChangeCards[index].Price?.Value?.name);
            b += Number(ChangeCards[index].Price?.Value?.name) - (Number(ChangeCards[index].Price?.Value?.name) * Number(ChangeCards[index].Price?.feesChange) / 100);
            c = (a - b);
        };
        setTotal({
            change: a,
            receive: b,
            freeMoney: c
        })
    }, [ChangeCards]);

    return (
        <div id='change_card'>
            <div className='change_card_content bgr_white mt-2'>
                <div className='hearder_hag'>
                    <h1>ChangeCards</h1>
                </div>
                <div className='table_change_card'>
                    <div className='total_price d-flex justify-content-between align-items-center'>
                        <p>Total Change Cards : <span className='text-danger txt_bold'>{formatMoney(total.change)}</span></p>
                        <p>Total Receive : <span className='text-danger txt_bold'>{formatMoney(total.receive)}</span></p>
                        <p>Total Free Money : <span className='text-danger txt_bold'>{formatMoney(total.freeMoney)}</span></p>
                    </div>
                    {
                        ChangeCards.length > 0 &&
                        <Table bordered hover striped size="sm">
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
                                    ChangeCards?.map((item, index) => {
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

export default ChangeCards;