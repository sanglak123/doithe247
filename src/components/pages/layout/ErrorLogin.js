import React from 'react';
import { Container } from 'react-bootstrap';

function ErrorLogin(props) {
    return (
        <div id='error_login'>
            <Container>
                <div className='error_content'>
                    <div className='error_item'>
                        <h1 className='text-danger'>Bạn chưa đăng nhập!</h1>                                      
                    </div>

                </div>
            </Container>

        </div>
    );
}

export default ErrorLogin;