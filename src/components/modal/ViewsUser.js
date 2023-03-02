import { formatMoney } from '@/config/formatMoney';
import { AdminSelector } from '@/redux/selector/AdminSelector';
import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function ModalViewsUser({ show, setShow, user }) { 
    const ChangeCards = useSelector(AdminSelector.Data.ChangeCards);
    const BuyCards = useSelector(AdminSelector.Data.BuyCards);

    const ChangeCardsRender = ChangeCards?.filter(item => item.idUser === user.id && item.status !== "Error");
    const BuyCardsRender = BuyCards?.filter(item => item.idUser === user.id && item.status !== "Error");

    const [totalChange, setTotalChange] = useState({
        change: 0,
        receive: 0
    });

    const [totalBuy, setTotalBuy] = useState({
        buy: 0,
        receive: 0
    });
    useEffect(() => {
        let a = 0;
        let b = 0;
        for (let index = 0; index < ChangeCardsRender.length; index++) {
            a += Number(ChangeCardsRender[index].Price?.Value?.name);
            b += Number(ChangeCardsRender[index].Price?.Value?.name) - (Number(ChangeCardsRender[index].Price?.Value?.name) * Number(ChangeCardsRender[index].Price?.feesChange) / 100)
            setTotalChange({
                change: a,
                receive: b
            });
        };

        let c = 0;
        let d = 0;

        for (let index = 0; index < BuyCardsRender.length; index++) {
            c += Number(BuyCardsRender[index].Price?.Value?.name);
            d += Number(BuyCardsRender[index].Price?.Value?.name) - (Number(BuyCardsRender[index].Price?.Value?.name) * Number(BuyCardsRender[index].Price?.feesBuy) / 100)
            setTotalBuy({
                buy: c,
                receive: d
            });
        };
    }, [user]);

    return (
        <div id='modal_views_user'>
            <Modal
                show={show}
                size="xl"
                onHide={() => {
                    setShow(false);
                    setTotalBuy({
                        buy: 0,
                        receive: 0
                    });
                    setTotalChange({
                        change: 0,
                        receive: 0
                    })
                }}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className='hearder_hag'>
                            <h1 className='txt_black'>Doanh Thu User : <span className='text-danger'>{user?.userName}</span></h1>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='txt_dark_100 bgr_linear'>
                    <div className='change_cards layot_wrapter'>
                        <div className='hearder_hag'>
                            <h1>Change Cards</h1>
                        </div>
                        <div className='total_price d-flex justify-content-between align-items-center'>
                            <p> Total Change: {formatMoney(totalChange.change)}</p>
                            <p> Total Receive: {formatMoney(totalChange.receive)}</p>
                            <p> FreeMoney: {formatMoney(totalChange.change - totalChange.receive)}</p>
                        </div>
                        {
                            ChangeCardsRender?.length > 0 ?
                                <Table bordered size="sm">
                                    <thead>
                                        <tr className='txt_center'>
                                            <th>#</th>
                                            <th>Telco</th>
                                            <th>Value</th>
                                            <th>Code</th>
                                            <th>Serial</th>
                                            <th>FeesChange</th>
                                            <th>Receive</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ChangeCardsRender?.map((item, index) => {
                                                return (
                                                    <tr key={index} className="txt_center">
                                                        <td>{index + 1}</td>
                                                        <td>{item.Price?.Card?.telco}</td>
                                                        <td>{formatMoney(item.Price?.Value?.name)}</td>
                                                        <td>{item.code}</td>
                                                        <td>{item.serial}</td>
                                                        <td>{item.Price?.feesChange} %</td>
                                                        <td>{formatMoney(item.Price?.Value?.name - (item.Price?.Value?.name * item.Price?.feesChange / 100))}</td>
                                                        <td className={item.status === "Success" ? "text-success" : item.status === "Penanty" ? "text-warning" : item.status === "Error" ? "text-danger" : ""}>{item.status}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                :
                                <p className='text-danger'>Chưa Có Dữ Liệu</p>
                        }

                    </div>

                    <div className='change_cards layot_wrapter'>
                        <div className='hearder_hag'>
                            <h1>Buy Cards</h1>
                        </div>
                        <div className='total_price d-flex justify-content-between align-items-center'>
                            <p> Total Change: {formatMoney(totalChange.change)}</p>
                            <p> Total Receive: {formatMoney(totalChange.receive)}</p>
                            <p> FreeMoney: {formatMoney(totalChange.change - totalChange.receive)}</p>
                        </div>
                        {
                            BuyCardsRender?.length > 0 ?
                                <Table bordered size="sm">
                                    <thead>
                                        <tr className='txt_center'>
                                            <th>#</th>
                                            <th>Telco</th>
                                            <th>Value</th>
                                            <th>Code</th>
                                            <th>Serial</th>
                                            <th>FeesChange</th>
                                            <th>Receive</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            BuyCardsRender?.map((item, index) => {
                                                return (
                                                    <tr key={index} className="txt_center">
                                                        <td>{index + 1}</td>
                                                        <td>{item.Price?.Card?.telco}</td>
                                                        <td>{formatMoney(item.Price?.Value?.name)}</td>
                                                        <td>{item.code}</td>
                                                        <td>{item.serial}</td>
                                                        <td>{item.Price?.feesBuy} %</td>
                                                        <td>{formatMoney(item.Price?.Value?.name - (item.Price?.Value?.name * item.Price?.feesBuy / 100))}</td>
                                                        <td className={item.status === "Success" ? "text-success" : item.status === "Penanty" ? "text-warning" : item.status === "Error" ? "text-danger" : ""}>{item.status}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                :
                                <p className='text-danger'>Chưa Có Dữ Liệu</p>
                        }

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalViewsUser;