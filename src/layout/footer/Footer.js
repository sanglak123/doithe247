import { UserSelector } from '@/redux/selector/UserSelector';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Footer(props) {
    const router = useRouter();
    const pathname = router.pathname;
    const User = useSelector(UserSelector.Auth.User);
    return (
        pathname !== "/login" && pathname !== "/admin/dashboard" &&
        <div id='footer' className={router.pathname === "/login" ? "hide" : ""}>
            <div className='footer_content'>
                <div className='footer_main mt-3'>
                    <Container>
                        <div className='footer_main_content'>
                            <Row>
                                <Col xs={12} sm={6} lg={3}>
                                    <div className='footer_main_items'>
                                        <div className='logo'>
                                            <h1>DOITHE24/7</h1>
                                            <span>www.doithe247.hag.com.vn</span>
                                            <p>Hệ thống đổi thẻ cào sang tiền mặt, momo phí tốt nhất thị trường - tự động xử lý thẻ cực nhanh chóng !</p>
                                        </div>
                                    </div>

                                </Col>
                                <Col xs={12} sm={6} lg={3}>
                                    <div className='quick_link footer_main_items'>
                                        <div className='hearder_hag'>
                                            <h1>QUICK LINK</h1>
                                        </div>

                                        <ul>
                                            <li>
                                                <Link href={"/changecard"}><i className="fa fa-exchange-alt"></i>Đổi thẻ cào</Link>
                                            </li>
                                            <li>
                                                <Link href={"/buycard"}><i className="fa fa-money-check-alt"></i>Mua thẻ cào</Link>
                                            </li>
                                            <li>
                                                <Link href={`/${User?.userName}/topup`}><i className="fa fa-dollar-sign"></i>Nạp tiền</Link>
                                            </li>
                                            <li>
                                                <Link href={"/withdraw"}><i className="fa fa-donate"></i>Rút tiền</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} lg={3}>
                                    <div className='contact footer_main_items'>
                                        <div className='hearder_hag'>
                                            <h1>CONTACT</h1>
                                        </div>
                                        <ul>
                                            <li>
                                                <Link href={"tel:0943830707"}><i className="fa fa-phone-volume"></i>0943.83.07.07</Link>
                                            </li>
                                            <li>
                                                <Link href={"/buycard"}><i className="fab fa-facebook-f"></i>Facebook</Link>
                                            </li>
                                            <li>
                                                <Link href={"/topup"}><i className="fab fa-linkedin-in"></i>In</Link>
                                            </li>
                                            <li>
                                                <Link href={"/withdraw"}><i className="fab fa-telegram"></i>Telegram</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>

                                <Col xs={12} sm={6} lg={3}>
                                    <div className='feeback footer_main_items'>
                                        <div className='hearder_hag'>
                                            <h1>FEEBACK</h1>
                                        </div>

                                        <InputGroup className="mb-3 mt-3">
                                            <InputGroup.Text id="basic-addon1"><i className="text-success fa fa-envelope"></i></InputGroup.Text>
                                            <Form.Control
                                                placeholder="Your email"
                                            />
                                        </InputGroup>
                                        <InputGroup>
                                            <Form.Control rows={3} as="textarea" placeholder='Feeback' />
                                            <Button variant='success'>Send</Button>
                                        </InputGroup>
                                    </div>
                                </Col>
                            </Row>

                        </div>
                    </Container>
                </div>
                <div className='footer_bot'>
                    <Container>
                        <div className='footer_bot_items'>
                            <p className='m-0 p-0'>www.doithe247.hga.com.vn - Email: admin@gmail.com - Hotline: 0943.83.07.07 - Bản quyền thuộc về www.hga.com.vn &#169;</p>
                        </div>
                    </Container>
                </div>
            </div>

        </div>
    );
}

export default Footer;