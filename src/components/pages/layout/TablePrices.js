import { formatMoney } from '@/config/formatMoney';
import { DataSelector } from '@/redux/selector/DataSelector';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function TablePrices(props) {

    //Data   
    const Cards = useSelector(DataSelector.Cards);
    const listCardsChange = Cards?.filter(item => item.change === true);
    const Prices = useSelector(DataSelector.Prices);

    const [cardRender, setCardRender] = useState("VIETTEL");
    const [PriceRender, setPriceRender] = useState([]);
    useEffect(() => {
        const list = Prices?.filter(item => item.Card.telco === cardRender);
        setPriceRender(list);
    }, [cardRender]);

    //Date
    const handleRenderToday = () => {
        const date = new Date();
        const d = date.getDate();
        const m = date.getMonth();
        const y = date.getFullYear();
        if (d < 10) {
            if (m < 10) {
                return "0" + d + "-" + "0" + m + "-" + y
            } else {
                return "0" + d + "-" + m + "-" + y
            }

        } else {
            if (m < 10) {
                return d + "-" + "0" + m + "-" + y
            } else {
                return d + "-" + m + "-" + y
            }
        }
    }
    return (
        <div className='table_prices bgr_dark mt-3 animate__animated  animate__fadeInUp'>
            <div className='hearder_hag'>
                <h1>Bảng Phí Đổi Thẻ Ngày: <span className='text-danger'>{handleRenderToday()}</span></h1>
            </div>
            <div className='price_content'>
                <div className='prices_hearder'>
                    {
                        listCardsChange?.map((card, index) => {
                            return (
                                <Button onClick={() => setCardRender(card.telco)} variant={cardRender === card.telco ? "danger" : "success"} key={index}>{card.telco}</Button>
                            )
                        })
                    }
                </div>
                <div className='prices_table'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className='txt_white'>Thành viên</th>
                                {
                                    PriceRender?.map((price, index) => {
                                        return (
                                            <th key={index} className='txt_center txt_white'>{formatMoney(price.Value.name)}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {/* //Post */}
                            <tr>
                                <th className='txt_white'>FeesChange</th>
                                {
                                    PriceRender?.map((price, index) => {
                                        return (
                                            <th key={index} className='txt_center txt_white'>{price.feesChange} %</th>

                                        )
                                    })
                                }
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default TablePrices;