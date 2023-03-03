import { formatDate } from '@/config/formatMoney';
import { DataSelector } from '@/redux/selector/DataSelector';
import { UpdateEventSuccess } from '@/redux/slice/dataPublic';
import { EventsAdminApi } from 'data/api/admin/events';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function DashboardEvents({ axiosJwt, accessToken }) {
    const dispatch = useDispatch();
    //Data
    const Events = useSelector(DataSelector.Events);

    //Add
    const [name, setName] = useState("");
    const [discount, setDiscount] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");

    const handleCreateEvents = async () => {
        const s = new Date(timeStart);

        await EventsAdminApi.Create(accessToken, axiosJwt, dispatch, UpdateEventSuccess, name, discount, timeStart, timeEnd);
    }

    return (
        <div id='DashboardEvents'>
            <div className='bgr_white mt-2'>

                <div className='event_content'>
                    <div className='create_event'>
                        <div className='hearder_hag'>
                            <h1>Thêm Mới Sự Kiện</h1>
                        </div>
                        <Row>
                            <Col>
                                <div className='create_event_items'>
                                    <Form.Label>Tên Sự Kiện</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder='Tên sự kiện'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </InputGroup>
                                </div>
                            </Col>
                            <Col>
                                <div className='create_event_items'>
                                    <Form.Label>Giảm giá</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder='% discount'
                                            value={discount}
                                            onChange={(e) => setDiscount(e.target.value)}
                                        />
                                    </InputGroup>
                                </div>
                            </Col>
                            <Col>
                                <div className='create_event_items'>
                                    <Form.Label>Thời Gian Bắt Đầu</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type='datetime-local'
                                            value={timeStart}
                                            onChange={(e) => setTimeStart(e.target.value)}
                                        />
                                    </InputGroup>
                                </div>
                            </Col>
                            <Col>
                                <div className='create_event_items'>
                                    <Form.Label>Thời Gian Kết Thúc</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type='datetime-local'
                                            value={timeEnd}
                                            onChange={(e) => setTimeEnd(e.target.value)}
                                        />
                                        <Button disabled={name === "" || discount === "" || timeStart === "" || timeEnd === ""} onClick={handleCreateEvents}>Add</Button>
                                    </InputGroup>

                                </div>
                            </Col>
                        </Row>


                    </div>

                    <div className='event_item'>
                        <div className='hearder_hag'>
                            <h1>Sự Kiện</h1>
                        </div>
                        <div className='event_item_table'>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr className='txt_center'>
                                        <th>STT</th>
                                        <th>Tên sự kiện</th>
                                        <th>% Giảm giá</th>
                                        <th>Bắt đầu</th>
                                        <th>Kết thúc</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Events?.map((item, index) => {
                                            return (
                                                <tr key={index} className='txt_center'>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.discount}</td>
                                                    <td>{item.timeStart}</td>
                                                    <td>{formatDate(item.timeEnd)}</td>
                                                    <td><Button variant='danger'>Xóa</Button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DashboardEvents;