import { formatMoney } from '@/config/formatMoney';
import { UserSelector } from '@/redux/selector/UserSelector';
import { DataSelector } from '@/redux/selector/DataSelector';
import { ChooseCardSuccess, DeleteCardSuccess, ClearAllStoreSuccess, AddCardSuccess, SubtractionCardSuccess } from '@/redux/slice/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { toast } from 'react-toastify';
import { ApiCardsPublic } from 'data/api/cardsPublic';

function BuyCardsUser(props) {
    //User
    const User = useSelector(UserSelector.Auth.User);
    const accesstoken = useSelector(UserSelector.Auth.AccessToken);

    const dispatch = useDispatch();
    const router = useRouter()
    const { telco } = router.query;

    const Cards = useSelector(DataSelector.Cards);
    const PhoneCards = Cards?.filter(item => item.idTypeCard === 1);
    const GameCards = Cards?.filter(item => item.idTypeCard === 2);

    //Store
    const Store = useSelector(UserSelector.Store)

    const Prices = useSelector(DataSelector.Prices);
    const [PriceRenders, setPriceRenders] = useState([]);
    useEffect(() => {
        const list = Prices?.filter(item => item.Card?.telco === telco?.toUpperCase());
        setPriceRenders(list)
    }, [telco]);


    const handleChooseCard = (price) => {
        const index = Store.findIndex(item => item.telco === price.Card?.telco && item.value === price.Value?.name);
        if (index === -1) {
            const item = {
                telco: price.Card?.telco,
                value: price.Value?.name,
                feesBuy: price.feesBuy,
                count: 1
            };
            dispatch(ChooseCardSuccess(item));
        }
    };

    const handleAddCard = (price) => {
        dispatch(AddCardSuccess(price));
    };

    const handleSubtractionCard = (price) => {
        dispatch(SubtractionCardSuccess(price))
    };

    const handleDeleteCard = (item) => {
        dispatch(DeleteCardSuccess(item));
    }

    const [totalPrice, setTotalPrice] = useState("");

    useEffect(() => {
        let a = 0;
        for (let index = 0; index < Store.length; index++) {
            a += Number(Store[index].value) - ((Number(Store[index].value) * Number(Store[index].feesBuy) / 100)) * Number(Store[index].count)
        };
        setTotalPrice(a)
    }, [Store]);

    const handleCheckCardInStore = (price) => {
        const item = Store.find(card => card.telco === price.Card?.telco && card.value === price.Value.name);
        if (item) {
            return "danger"
        } else {
            return "success"
        }

    };

    //BuyCard 
    const [email, setEmail] = useState("");
    const handleBuyCard = async () => {
        await ApiCardsPublic.BuyCarrd(User?.id, Store, email, accesstoken)
    };

    return (
        <div id='BuyCardsUser'>
            <Container>
                <div className='buy_card_container d-flex'>

                    <div className='buy_card bgr_white'>
                        <div className='buy_card_content p-3'>
                            <Tabs>
                                <TabList>
                                    <Tab onClick={() => { router.push("/buycard/viettel") }}>Thẻ Điện Thoại</Tab>
                                    <Tab onClick={() => { router.push("/buycard/zing") }}>Thẻ Game</Tab>
                                </TabList>

                                <TabPanel>
                                    <div className='phone_card card_item'>
                                        <div className='card_item_hearder'>
                                            <ul>
                                                {
                                                    PhoneCards?.map((item, index) => {
                                                        return (
                                                            <li key={index} className={telco === item.telco.toLowerCase() ? "li_active card_item" : "card_item"}>
                                                                <Link href={`/buycard/${item.telco.toLowerCase()}`}>
                                                                    <img src={item.Img?.path} alt={item.telco} />
                                                                </Link>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>


                                        </div>
                                        <div className='price_render'>
                                            <p>Chọn mệnh giá :</p>
                                            <ul>
                                                {
                                                    PriceRenders?.map((item, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <Button variant={handleCheckCardInStore(item)} onClick={() => handleChooseCard(item)}>
                                                                    <p className='m-0 p-0'>{item.Card?.telco}</p>
                                                                    <p className='m-0 p-0'> {formatMoney(item.Value?.name)}</p>
                                                                </Button>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div className='phone_card card_item'>
                                        <div className='card_item_hearder'>
                                            <ul>
                                                {
                                                    GameCards?.map((item, index) => {
                                                        return (
                                                            <li key={index} className={telco === item.telco.toLowerCase() ? "li_active card_item" : "card_item"}>
                                                                <Link href={`/buycard/${item.telco.toLowerCase()}`}>
                                                                    <img src={item.Img?.path} alt={item.telco} />
                                                                </Link>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>


                                        </div>
                                        <div className='price_render'>
                                            <p>Chọn mệnh giá :</p>
                                            <ul>
                                                {
                                                    PriceRenders?.map((item, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <Button variant={handleCheckCardInStore(item)} onClick={() => handleChooseCard(item)}>
                                                                    <p className='m-0 p-0'>{item.Card?.telco}</p>
                                                                    <p className='m-0 p-0'> {formatMoney(item.Value?.name)}</p>
                                                                </Button>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>

                    </div >

                    <div className='user_store bgr_white'>

                        <div className='store_content p-3'>
                            <div className='store_hearder d-flex justify-content-between align-items-center'>
                                <p className='p-0 m-0'>Store <i className="fa fa-shopping-cart ms-2"></i></p>
                                {
                                    Store.length > 0 &&
                                    <Button className='txt_bold' onClick={() => dispatch(ClearAllStoreSuccess())} variant='danger'>Clear All</Button>
                                }

                            </div>
                            <hr />

                            {
                                Store.length > 0 ?
                                    <>
                                        <div className='store_main'>
                                            {
                                                Store.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className='store_item d-flex justify-content-between align-items-center'>
                                                                <div>
                                                                    <p className='m-0 p-0'>{item.telco} - {formatMoney(item.value)}</p>
                                                                    <p className='m-0 p-0'>Chiết khấu: {item.feesBuy}%</p>
                                                                </div>
                                                                <div>
                                                                    <ButtonGroup>
                                                                        <Button onClick={() => handleAddCard(item)} variant='outline-success'><i className="fa fa-plus"></i></Button>
                                                                        <Button disabled variant='outline-success'>{item.count}</Button>
                                                                        <Button onClick={() => handleSubtractionCard(item)} variant='outline-success'><i className="fa fa-minus"></i></Button>
                                                                    </ButtonGroup>
                                                                </div>
                                                                <div>
                                                                    <span className='me-2'>  {formatMoney((item.value - (item.value * item.feesBuy / 100)) * item.count)}</span>
                                                                    <i onClick={() => handleDeleteCard(item)} className="fa fa-trash-alt"></i>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </div>

                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='store_total txt_right'>
                                            <h4>Tổng Cộng: <span className='txt_bold text-danger'>{formatMoney(totalPrice)}</span></h4>
                                        </div>
                                        <hr />
                                        <div className='store_receive'>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email nhận thẻ</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <Form.Text className="text-danger">
                                                    Email của bạn sẻ được bảo mật.
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Phương thức thanh toán</Form.Label>
                                                <Form.Select>
                                                    <option value={"wallet"}>Ví điện tử - {formatMoney(User?.surplus)}</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                        <hr />
                                        <div className='btn_payment'>
                                            <Button onClick={handleBuyCard} variant='success' className='w-100 p-3 txt_bold'>Thanh toán</Button>
                                        </div>
                                    </>
                                    :
                                    <p className='txt_bold text-danger'>Giỏ hàng đang trống.</p>
                            }


                        </div>

                    </div>

                </div >
            </Container >

        </div >
    );
}

export default BuyCardsUser;