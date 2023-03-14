import { DataSelector } from '@/redux/selector/DataSelector';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '@/config/formatMoney';
import { Button, Container, Form } from 'react-bootstrap';
import { AddCardSuccess, ChooseCardSuccess, ClearAllStoreSuccess, DeleteCardSuccess, SubtractionCardSuccess } from '@/redux/slice/user';
import { UserSelector } from '@/redux/selector/UserSelector';
import { toast } from 'react-toastify';

function BuyCards(props) {
    //User
    const User = useSelector(UserSelector.Auth.User);
    const accessToken = useSelector(UserSelector.Auth.AccessToken);
    const BankOfUsers = useSelector(UserSelector.Payments.BankOfUsers);
    const dispatch = useDispatch();
    const Prices = useSelector(DataSelector.Prices);
    const Cards = useSelector(DataSelector.Cards);

    const PhoneCards = Cards.filter(item => item.idTypeCard === 1);
    const GameCards = Cards.filter(item => item.idTypeCard === 2);
    const [typeCard, setTypeCard] = useState("phone");

    const [cardRender, setCardRender] = useState("VIETTEL");
    const [PriceRender, setPriceRender] = useState([]);

    useEffect(() => {
        const list = Prices.filter(item => item.Card?.telco === cardRender);
        setPriceRender(list)
    }, [cardRender, Cards, Prices]);

    //Store
    //Choose
    const handleChooseCard = (price) => {
        const newPrice = { ...price, count: 1 }
        dispatch(ChooseCardSuccess(newPrice))
    };

    const Store = useSelector(UserSelector.Store);

    const handleRenderClass = (price) => {
        const index = Store.findIndex(item => item.id === price.id);
        if (index >= 0) {
            return "card_name p-3 value_active"
        } else {
            return "card_name p-3"
        }
    };
    //Delete
    const handleDeleteCard = (price) => {
        dispatch(DeleteCardSuccess(price))
    };
    //Add
    const handleAddCard = (price) => {
        dispatch(AddCardSuccess(price))
    };
    //Subtrack
    const handleSubtrackCard = (price) => {
        dispatch(SubtractionCardSuccess(price))
    }
    //Clear All Card
    const handleClearStore = () => {
        dispatch(ClearAllStoreSuccess())
    }
    //Total Price
    const [totalPrice, setTotalPrice] = useState(0);
    let total = 0;
    useEffect(() => {
        for (let index = 0; index < Store.length; index++) {
            total += (parseFloat(Store[index].Value?.name) - parseFloat(Store[index].Value?.name) * parseFloat(Store[index].feesBuy) / 100) * parseFloat(Store[index].count)

        }
        setTotalPrice(total)
    }, [Store]);

    const [payment, setPayment] = useState("");
    const [email, setEmail] = useState("");

    const handleBuyCard = async () => {
        if (accessToken) {
            if (payment !== "") {
                if (Store.length > 0) {
                    const array = payment.split("$$");
                    if (array[0] === "Bank") {
                        console.log("Thanh toán ngân hàng", array[1])
                    } else if (array[0] === "wallet_number")
                        if (parseFloat(User?.surplus) - parseFloat(totalPrice) > 0) {
                            console.log("Thanh toán")
                        } else {
                            toast.error("Số dư không khả dụng.")
                        }
                } else {
                    toast.error("Không có sản phẩm nào được chọn.")
                }
            } else {
                toast.error("Phương thức thanh toán không được để trống.")
            }
        } else {
            toast.error("Bạn chưa đăng nhập!")
        }
    };

    return (
        <div id='BuyCards' className='bgr_white'>
            <div className='buycard_container d-flex'>
                <div className='buycard'>
                    <div className='buycard_content'>
                        <div className='buycard_header'>
                            <Button variant={typeCard === "phone" ? "danger" : "success"} className={typeCard === "phone" ? "type_card_active" : ""} onClick={() => { setTypeCard("phone"); setCardRender("VIETTEL") }}>Thẻ điện thoại</Button>

                            <Button variant={typeCard === "game" ? "danger" : "success"} className={typeCard === "game" ? "type_card_active" : ""} onClick={() => { setTypeCard("game"); setCardRender("ZING") }}>Thẻ game</Button>
                        </div>
                        <div className='buycard_tabs'>
                            <div className='card_render'>
                                {
                                    typeCard === "phone" ?
                                        <>
                                            {
                                                PhoneCards?.map((item, index) => {
                                                    return (
                                                        <div key={index} className={cardRender === item.telco ? "card_item card_active" : "card_item"} onClick={() => setCardRender(item.telco)}>
                                                            <img src={item.Img?.path} alt={item.Card?.telco} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                GameCards?.map((item, index) => {
                                                    return (
                                                        <div key={index} className='card_item p-2'>
                                                            <img src={item.Img?.path} alt={item.Card?.telco} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                }
                            </div>
                            <div className='value_render'>
                                {
                                    PriceRender?.map((item, index) => {
                                        return (
                                            <div key={index} className={"value_item"} onClick={() => handleChooseCard(item)}>
                                                <div className={handleRenderClass(item)}>
                                                    <p className='m-0'>{item.Card?.telco}</p>
                                                    <p className='m-0'>{formatMoney(item.Value?.name)}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
                <div className='store'>
                    <div className='store_hearder'>

                        <div className='hearder_left'>
                            <p>Giỏ hàng</p>
                            <span class="material-symbols-outlined">
                                shopping_cart
                            </span>
                        </div>
                        {
                            Store.length > 0 &&
                            <div className='hearder_right'>
                                <Button variant='danger' onClick={() => handleClearStore()}>Clear All</Button>
                            </div>

                        }


                    </div>
                    {
                        Store.length > 0 ?
                            <>
                                <div className='store_body'>
                                    <div className='store_items'>
                                        <Container>
                                            {
                                                Store?.map((item, index) => {
                                                    return (
                                                        <div key={index} className='store_item'>
                                                            <div className='item_left'>
                                                                <p className='m-0'>{item.Card?.telco} - {formatMoney(item.Value?.name)}</p>
                                                                <p className='m-0'>Chiết khấu: <span>{item.feesBuy}%</span></p>
                                                            </div>
                                                            <div className='item_center'>
                                                                <div className='count'>
                                                                    <span class="material-symbols-outlined add_count" onClick={() => handleAddCard(item)}>
                                                                        add
                                                                    </span>
                                                                    <span className='number_count'>
                                                                        {
                                                                            item.count < 10 ?
                                                                                `0${item.count}`
                                                                                :
                                                                                item.count
                                                                        }
                                                                    </span>
                                                                    <span class="material-symbols-outlined sub_count" onClick={() => handleSubtrackCard(item)}>
                                                                        remove
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className='item_right d-flex align-items-center'>
                                                                <div className='price'>
                                                                    <p className='m-0 me-2'>Thành tiền</p>
                                                                    <p className='m-0 ms-2'>{formatMoney((parseFloat(item.Value?.name) - parseFloat(item.Value?.name) * parseFloat(item.feesBuy) / 100) * parseFloat(item.count))}</p>
                                                                </div>
                                                                <div className='delete_item ms-4' onClick={() => handleDeleteCard(item)}>
                                                                    <span class="material-symbols-outlined">
                                                                        delete
                                                                    </span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </Container>

                                    </div>
                                </div>
                                <div className='store_receive_card p-4'>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email nhận thẻ.</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Phương thức thành toán</Form.Label>
                                        <Form.Select defaultValue={""} onChange={(e) => setPayment(e.target.value)}>
                                            <option className='text-mute' value={""}>Phương thức thanh toán</option>
                                            {
                                                accessToken &&
                                                <option className='text-success' value={`wallet_number$$${User?.id}`}>
                                                    Ví điện tử: {User.wallet_number.split(" ")[1]} - Số dư khả dụng: {formatMoney(User?.surplus)}
                                                </option>
                                            }
                                            {
                                                BankOfUsers.length > 0 &&
                                                BankOfUsers.map((item, index) => {
                                                    return (
                                                        <option className='text-primary' value={`Bank$$${item.id}`} key={index}>{item.Bank?.name} {`(${item.Bank?.sign})`} - {item.number}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Button onClick={() => handleBuyCard()} variant='success' className='w-100 p-3'>Thanh Toán</Button>
                                </div>
                                <div className='store_footer'>
                                    <p>Tổng cộng :</p>
                                    <h4>{formatMoney(totalPrice)}</h4>
                                </div>
                            </>
                            :
                            <p className='text-danger p-4'>Giỏ hàng đang trống.</p>
                    }

                </div>
            </div>
        </div>
    );
}

export default BuyCards;