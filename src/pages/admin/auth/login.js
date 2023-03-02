import { UserSelector } from '@/redux/selector/UserSelector';
import { LoginAdminSuccess } from '@/redux/slice/admin';

import AuthenAdminApi from 'data/api/admin/auth';
import { CreateAxiosInstance } from 'data/api/axiosClient/createAxiosInstance';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function AdminLogin(props) {
    //User
    const User = useSelector(UserSelector.Auth.User);
    const accessToken = useSelector(UserSelector.Auth.AccessToken);
    const dispatch = useDispatch();
    const router = useRouter();

    const axiosJwt = CreateAxiosInstance(dispatch, accessToken)
    const [pass2, setPass2] = useState("");
    const [key, setKey] = useState("");

    const handleAdminLogin = async () => {
        await AuthenAdminApi.Login(User?.id, axiosJwt, accessToken, pass2, key, router, dispatch, LoginAdminSuccess)
    }
    return (
        <div id='admin_register'>
            <Container>
                <div className='register_content bgr_white mt-2'>
                    <div className='register_hearder'>
                        <div className='hearder_hag'>
                            <h1>ADMIN SIGN IN</h1>
                        </div>
                    </div>
                    <div className='register_main p-5'>
                        <Form className='register_form'>
                            <Form.Group className="mb-3 ms-3">
                                <Form.Label>Password 2</Form.Label>
                                <Form.Control className='w-100' type="password" placeholder="Password 2" value={pass2} onChange={(e) => setPass2(e.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3 ms-3">
                                <Form.Label>Key Admin</Form.Label>
                                <Form.Control className='w-100' type="password" placeholder="Key Admin" value={key} onChange={(e) => setKey(e.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" onClick={handleAdminLogin}>
                                Sign in
                            </Button>
                        </Form>

                    </div>
                </div>
            </Container>

        </div>
    );
}

export default AdminLogin;