import AuthenAdminApi from 'data/api/admin/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

function AdminRegister(props) {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [fullName, setFullName] = useState("");
    const [adress, setAdress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [key, setKey] = useState("");

    const handleRegister = async () => {
        await AuthenAdminApi.Register(userName, displayName, fullName, adress, pass1, pass2, email, phone, key, router)
    }
    return (
        <div id='admin_register'>
            <Container>
                <div className='register_content bgr_white mt-2'>
                    <div className='register_hearder'>
                        <div className='hearder_hag'>
                            <h1>ADMIN REGISTER</h1>
                        </div>
                    </div>
                    <div className='register_main p-5'>
                        <Form className='register_form'>
                            <div className='d-flex'>
                                <Form.Group className="mb-3 me-3">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" placeholder="Your user name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3 ms-3">
                                    <Form.Label>Display Name</Form.Label>
                                    <Form.Control type="text" placeholder="Your display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                            </div>

                            <div className='d-flex'>
                                <Form.Group className="mb-3 me-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control className='w-100' type="text" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3 ms-3">
                                    <Form.Label>Adress</Form.Label>
                                    <Form.Control type="text" placeholder="Adress" value={adress} onChange={(e) => setAdress(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                            </div>

                            <div className='d-flex'>
                                <Form.Group className="mb-3 me-3">
                                    <Form.Label>Email Adress</Form.Label>
                                    <Form.Control className='w-100' type="email" placeholder="Email Adress" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3 ms-3">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control type="text" placeholder="Your mobile" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                            </div>
                            <div className='d-flex'>
                                <Form.Group className="mb-3 me-3">
                                    <Form.Label>Password 1</Form.Label>
                                    <Form.Control className='w-100' type="password" placeholder="Password 1" value={pass1} onChange={(e) => setPass1(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
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
                            </div>
                            <Button variant="primary" onClick={handleRegister}>
                                Register
                            </Button>
                        </Form>

                    </div>
                </div>
            </Container>

        </div>
    );
}

export default AdminRegister;