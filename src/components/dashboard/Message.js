import React from 'react';
import { Container } from 'react-bootstrap';

function AdminMessage(props) {
    return (
        <div id='admin_message' className='bgr_white mt-2'>
            <div className='message_content'>
                <div className='users'></div>
                <div className='message'></div>
            </div>
        </div>
    );
}

export default AdminMessage;