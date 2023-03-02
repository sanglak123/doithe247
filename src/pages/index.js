import UserChangeCard from '@/components/changeCard/ChangeCard';
import TablePrices from '@/components/tablePrices';
import CardsHot from '@/layout/cardHot';
import { DataSelector } from '@/redux/selector/DataSelector';
import { LoadingDataPublicSuccess } from '@/redux/slice/dataPublic';
import { UserDataApi } from 'data/api/users/data';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function ChangeCard(props) {
  const dispatch = useDispatch();

  //LoadingDataPublic
  useEffect(() => {
    const LoadingData = async () => {
      await UserDataApi.LoadingData(dispatch, LoadingDataPublicSuccess)
    };
    LoadingData()
  }, []);

  //Data  
  const Cards = useSelector(DataSelector.Cards);

  return (
    <div id='home_page'>
      <Container>
        <div className='home_page_content'>
          <CardsHot />
          <UserChangeCard />
          {/* //TableChangeCarrd */}
          <TablePrices />

          <div className='buycard bgr_white mt-3'>
            <div className='buycard_content'>
              <div className='hearder_hag'>
                <h1>Mua Mã Thẻ Nhanh Chóng - Giá Rẻ</h1>
              </div>
              <div className='buycard_note p-3'>
                <p className='m-0 p-0'><i className="fa fa-angle-right me-2"></i>Nếu thẻ bị dạng chờ Xử lý, Quý khách hãy báo ở góc trái màn hình để admin hủy đơn cho bạn thực hiện lại!</p>
              </div>
              <div className='list_cards '>
                <Row>
                  {
                    Cards?.map((item, index) => {
                      return (
                        <Col key={index} xs={6} sm={6} md={4} lg={3} xl={2} xxl={2} >
                          <Card className='m-2'>
                            <Card.Img variant="top" src={item.Img?.path} />
                            <Card.Body>
                              <Card.Title>
                                <Link href={`/buycard/${item.telco?.toLowerCase()}`}>Thẻ {item.telco}</Link>
                              </Card.Title>

                            </Card.Body>
                          </Card>
                        </Col>
                      )
                    })
                  }
                </Row>
              </div>
            </div>
          </div>


        </div>
      </Container>
      <div className='socket_test'>
        {/* <input onChange={(e) => setMessage(e.target.value)} value={message} type={"text"} />
        <Button onClick={handleSubmit}>Send</Button> */}
        <Container>
          <div>
            {/* <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>UserName</Form.Label>
                <Form.Control type="text" placeholder="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="button" onClick={() => handleLoginSocket()}>
                Submit
              </Button>
            </Form> */}
          </div>
        </Container>
      </div>

    </div>
  );
}

export default ChangeCard;