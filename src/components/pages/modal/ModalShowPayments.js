import React from "react"
import {Button, Col, Form, Modal, Row} from "react-bootstrap"
import {formatDate, formatMoney2} from "../../../config/formatMoney"

function ModalShowPayments({show, onHide, payment}) {
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Mã đơn:{" "}
                    <span className="txt_bold text-danger">
                        {payment.sign?.split("_")[4]}
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={6}>
                        <div className="hearder_hag">
                            <h1>Thông tin</h1>
                        </div>
                        <Row>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="txt_bold">
                                        Khách hàng
                                    </Form.Label>
                                    <Form.Control
                                        readOnly
                                        value={`${
                                            payment.User?.userName
                                        } - ${formatMoney2(
                                            payment.User?.surplus
                                        )}`}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="txt_bold">
                                        Số tiền rút
                                    </Form.Label>
                                    <Form.Control
                                        readOnly
                                        value={formatMoney2(payment.amount)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="txt_bold">
                                        Ngân hàng yêu cầu
                                    </Form.Label>
                                    <Form.Control
                                        readOnly
                                        value={payment.BankOfUser?.Bank?.name}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="txt_bold">
                                        Số tài khoản
                                    </Form.Label>
                                    <Form.Control
                                        readOnly
                                        value={payment.BankOfUser?.number}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="txt_bold">
                                        Chủ tài khoản
                                    </Form.Label>
                                    <Form.Control
                                        readOnly
                                        value={payment.BankOfUser?.owner}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="txt_bold">
                                        Ngày gửi
                                    </Form.Label>
                                    <Form.Control
                                        readOnly
                                        value={formatDate(payment.createdAt)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="txt_bold">
                                        Trạng thái
                                    </Form.Label>
                                    <Form.Control
                                        readOnly
                                        value={payment.status}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6}>
                        <div className="access_pay">
                            <div className="hearder_hag">
                                <h1>Xác nhận thanh toán</h1>
                            </div>
                            <div className="review"></div>
                            <Form.Group className="mb-3">
                                <Form.Label className="txt_bold">
                                    Tải ảnh xác nhận
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/png, image/jpeg"
                                />
                            </Form.Group>
                            <div className="txt_right">
                                {" "}
                                <Button
                                    variant="success"
                                    className="mt-2"
                                    onClick={onHide}
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        </div>

                        <div className="cancle_pay">
                            <div className="hearder_hag">
                                <h1>Hủy đơn hàng</h1>
                            </div>
                            <div className="review"></div>
                            <Form.Group className="mb-3">
                                <Form.Label className="txt_bold">
                                    Lý do đi kèm
                                </Form.Label>
                                <Form.Select>
                                    <option>Lý do đi kèm</option>
                                    <option>
                                        Chưa nhận được tiền thanh toán
                                    </option>
                                    <option>Thời gian chờ quá lâu</option>
                                    <option>Giao dịch bị ngân hàng hủy</option>
                                </Form.Select>
                            </Form.Group>

                            <div className="txt_right">
                                {" "}
                                <Button
                                    variant="danger"
                                    className="mt-2"
                                    onClick={onHide}
                                >
                                    Hủy đơn
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalShowPayments
