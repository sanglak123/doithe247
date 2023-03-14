import { formatMoney } from '@/config/formatMoney';
import { DataSelector } from '@/redux/selector/DataSelector';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function TableCardsRender({ telco }) {
    const dispatch = useDispatch();
    //Data  
    const Prices = useSelector(DataSelector.Prices);
    const [PriceRender, setPriceRender] = useState([]);

    useEffect(() => {
        const list = Prices?.filter(item => item?.Card?.telco === telco);
        setPriceRender(list)
    }, [Prices, telco]);

    //Edit
    const [edit, setEdit] = useState("");
    const [feesBuy, setFeesBuy] = useState("");

    const handleEditFeesBuy = async (id) => {
        await ApiAdmins.Prices.EditFeesBuy(id, feesBuy);
        setEdit("")
    }

    return (
        <div id='table_cards_render'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{telco}</th>
                        {
                            PriceRender?.map((price, index) => {
                                return (
                                    <th key={index} className='txt_center text_light txt_white'>{formatMoney(price.Value.name)}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* //Post */}
                    <tr>
                        <th className='text-danger'>Post Card</th>
                        {
                            PriceRender?.map((price, index) => {
                                return (
                                    <th key={index} className='txt_center txt_white txt_light'>{price.feesChange} %</th>

                                )
                            })
                        }
                    </tr>
                    {/* //Buy */}
                    <tr>
                        <th className='text-success'>Buy Card</th>
                        {
                            PriceRender?.map((price, index) => {
                                return (
                                    <th key={index} className='txt_center text_light txt_white'>
                                        {
                                            edit === `${price.telco}_${price.Value?.name}` ?
                                                <InputGroup>
                                                    <Form.Control
                                                        type='number'
                                                        step={0.1}
                                                        min={1}
                                                        max={100}
                                                        placeholder="FeesBuy"
                                                        value={feesBuy}
                                                        onChange={(e) => setFeesBuy(e.target.value)}
                                                        autoFocus
                                                    />
                                                    <Button onClick={() => setEdit("")} variant='danger'><i className="fa fa-times"></i></Button>
                                                    <Button onClick={() => handleEditFeesBuy(price.id)} variant='success'><i className="fa fa-check"></i></Button>
                                                </InputGroup>
                                                :
                                                <div className='feesBuy'>
                                                    <p> {price.feesBuy} %</p>
                                                    <i onClick={() => {
                                                        setEdit(`${price.telco}_${price.Value?.name}`);
                                                        setFeesBuy(price.feesBuy)
                                                    }} className="fa fa-cog text-success"></i>
                                                </div>
                                        }

                                    </th>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default TableCardsRender;