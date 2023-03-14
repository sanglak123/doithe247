import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalShowImage({ show, setShow, card }) {
    return (
        <div id='ShowImageCards'>
            <Modal
                show={show}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='txt_black'
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {card.telco}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={card?.img} alt={card?.telco} className='img-fluid' />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalShowImage;