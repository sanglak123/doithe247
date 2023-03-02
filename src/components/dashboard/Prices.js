import { formatMoney } from '@/config/formatMoney';
import TableCardsRender from '@/layout/tablePrice/TableCardsRender';
import { DataSelector } from '@/redux/selector/DataSelector';
import { LoadingDataSuccess, UpdatePriceSuccess } from '@/redux/slice/dataPublic';
import { ApiAdmins } from 'data/api/admins';
import { ApiUsers } from 'data/api/users';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function Prices({ axiosJwt, accessToken }) {
    const dispatch = useDispatch();
    //Data   
    const Cards = useSelector(DataSelector.Cards);
    const PhoneCards = Cards?.filter(item => item.TypeCard.name === "Phone");
    const GameCards = Cards?.filter(item => item.TypeCard.name === "Game");

    const [cardRender, setCardRender] = useState("VIETTEL");

    const handleUpdatePrice = async () => {
        await ApiAdmins.Prices.Update(dispatch, UpdatePriceSuccess, axiosJwt, accessToken);      
    };

    //Add
    const Values = useSelector(DataSelector.Values);
    const [feesBuy, setFeesBuy] = useState("");
    const [feesChange, setFeesChange] = useState("");
    const [idValue, setIdValue] = useState("");

    const handleAddPrice = async () => {
        const card = Cards.find((item) => item.telco === cardRender);
        await ApiAdmins.Prices.Add(card.id, idValue, feesChange, feesBuy, axiosJwt, accessToken);
        await ApiUsers.Data.LoadingData(dispatch, LoadingDataSuccess);
    };

    return (
        <div id='prices' className=''>

            <div className='price_content bgr_white mt-2'>
                <div className='hearder_hag'>
                    <h1>Bảng Giá Đổi Thẻ</h1>
                </div>
                <div className='table_change_cards'>
                    <Tabs>
                        <TabList>
                            <Tab onClick={() => setCardRender("VIETTEL")}>Cards Phone</Tab>
                            <Tab onClick={() => setCardRender("ZING")}>Cards Game</Tab>
                        </TabList>

                        <TabPanel>
                            <div className='card_item'>
                                <div className='card_hearder'>
                                    {
                                        PhoneCards?.map((card, index) => {
                                            return (
                                                <Button onClick={() => setCardRender(card.telco)} variant={cardRender === card.telco ? "danger" : "success"} key={index}>{card.telco}</Button>
                                            )
                                        })
                                    }
                                </div>
                                <div className='table_card_render'>
                                    <TableCardsRender
                                        telco={cardRender}
                                    />
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className='card_item'>
                                <div className='card_hearder'>
                                    {
                                        GameCards?.map((card, index) => {
                                            return (
                                                <Button onClick={() => setCardRender(card.telco)} variant={cardRender === card.telco ? "danger" : "primary"} key={index}>{card.telco}</Button>
                                            )
                                        })
                                    }
                                </div>
                                <div className='table_card_render'>
                                    <TableCardsRender
                                        telco={cardRender}
                                    />
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>

                </div>
            </div>

            <div className='add_price bgr_white mt-2'>
                <div className='hearder_hag'>
                    <h1>Thêm mới</h1>
                </div>
                <div className='add_price_content'>
                    <div className='add_price_hearder'>
                        <h4>Thẻ {cardRender}</h4>
                    </div>
                    <div className='add_price_main'>
                        <div className='price_item'>
                            <Row>
                                <Col>
                                    <Form.Select onChange={(e) => setIdValue(e.target.value)}>
                                        <option>Choose Value</option>
                                        {
                                            Values?.map((value, index) => {
                                                return (
                                                    <option key={index} value={value.id}>{formatMoney(value.name)}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text><i className="fa fa-exchange-alt"></i></InputGroup.Text>
                                        <Form.Control
                                            placeholder="FeesChange"
                                            value={feesChange}
                                            onChange={(e) => setFeesChange(e.target.value)}
                                        />
                                    </InputGroup>
                                </Col>

                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text><i className="fa fa-ad"></i></InputGroup.Text>
                                        <Form.Control
                                            placeholder="FeesBuy"
                                            value={feesBuy}
                                            onChange={(e) => setFeesBuy(e.target.value)}
                                        />
                                        <Button disabled={cardRender === "" || idValue === "" || feesBuy === ""} onClick={() => handleAddPrice()}>Add</Button>
                                    </InputGroup>
                                </Col>
                            </Row>

                        </div>
                    </div>

                </div>
            </div>

            <Button onClick={handleUpdatePrice} className='btn_update_prices'>Update FeesChange</Button>
        </div>
    );
}

export default Prices;