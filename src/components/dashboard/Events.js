import { CheckDate, formatDate, formatDate2, formatDate3 } from '@/config/formatMoney';
import PaginationHag from '@/layout/pagination';
import { DataSelector } from '@/redux/selector/DataSelector';
import { UpdateEventSuccess } from '@/redux/slice/dataPublic';
import { EventsAdminApi } from 'data/api/admin/events';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function DashboardEvents({ axiosJwt, accessToken }) {
    const dispatch = useDispatch();
    //Data
    const Events = useSelector(DataSelector.Events);
    const [EventRender, setEventRender] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;
    useEffect(() => {
        const offset = (page - 1) * limit;
        const list = Events.slice(offset, (offset + limit));
        setEventRender(list)
    }, [Events, page])

    //Add
    const [name, setName] = useState("");
    const [discount, setDiscount] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");

    const handleCreateEvents = async () => {
        const today = new Date().getTime();
        const ts = new Date(timeStart).getTime();
        const te = new Date(timeEnd).getTime();
        if (te > today) {
            if (te > ts) {
                await EventsAdminApi.Create(accessToken, axiosJwt, dispatch, UpdateEventSuccess, name, discount, timeStart, timeEnd);
                setName("");
                setTimeStart("");
                setTimeEnd("");
                setDiscount("");
            } else {
                toast.error("Thời gian kết thúc không được sớm hơn bắt đầu!")
            }

        } else {
            toast.error("Thời gian kết thúc sự kiện không hợp lệ!")
        }

    };

    const handleRenderStatusEvent = (event) => {
        console.log(new Date(event.timeEnd) > new Date(event.timeStart))
        const d = new Date().getTime();

        const e = new Date(event.timeEnd).getTime();

        if (e > d) {
            return "Đang diễn ra"
        } else {
            return "Đã kết thúc"
        }
    };

    const handleDeleteEvent = async (event) => {
        await EventsAdminApi.Delete(accessToken, axiosJwt, dispatch, UpdateEventSuccess, event.id)
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
                                    <div className='time_start'>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                type='datetime-local'
                                                value={timeStart}
                                                onChange={(e) => setTimeStart(e.target.value)}
                                            />
                                        </InputGroup>
                                    </div>

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
                                        <th>Trạng thái</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        EventRender?.map((item, index) => {
                                            return (
                                                <tr key={index} className='txt_center'>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.discount}</td>
                                                    <td className='text-success'>{(item.timeStart)}</td>
                                                    <td className='text-danger'>{(item.timeEnd)}</td>
                                                    <td className={handleRenderStatusEvent(item) === "Offline" ? "text-danger" : "text-success"}>{handleRenderStatusEvent(item.timeEnd)}</td>
                                                    <td><Button onClick={() => handleDeleteEvent(item)} variant='danger'>Xóa</Button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            <PaginationHag
                                page={page}
                                setPage={setPage}
                                length={EventRender.length}
                                limit={limit}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DashboardEvents;