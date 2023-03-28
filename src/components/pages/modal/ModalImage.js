import React from "react"
import {Button, Modal} from "react-bootstrap"
import {formatMoney2} from "../../../config/formatMoney"

function ModalImage({show, handleClose, payment}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>MGD: {payment?.sign?.split("_")[4]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="payment_infomation">
                    <p>
                        User:{" "}
                        <span className="text-danger txt_bold">
                            {payment?.User?.userName}
                        </span>
                    </p>
                    <p>
                        Amount:{" "}
                        <span className="text-danger txt_bold">
                            {formatMoney2(payment?.amount)}
                        </span>
                    </p>
                    <p>
                        BankUser:{" "}
                        <span className="text-danger txt_bold">{`${payment?.BankOfUser?.Bank?.sign} - ${payment?.BankOfUser?.number}`}</span>
                    </p>
                    <p>
                        BankReceive:{" "}
                        <span className="text-danger txt_bold">{`${payment?.ReceiveBank?.Bank?.sign} - ${payment?.ReceiveBank?.number}`}</span>
                    </p>
                    <p>CreatedAt: {payment?.createdAt}</p>
                </div>
                <div className="img">
                    <img
                        src={payment?.Img?.path}
                        alt={payment?.sign}
                        className="img-fluid w-100"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">Accept</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalImage
