import React, {useState} from "react"
import {Button, Form, Modal} from "react-bootstrap"
import {UserAuthApi} from "../../../../data/api/users/auth"

function ModalRegister({show, setShow}) {
    const onhide = () => setShow(false)

    const [userName, setUserName] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const handleRegister = async () => {
        await UserAuthApi.Register(userName, pass, pass2, phone, email)
        onhide()
    }
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Đăng ký
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                        placeholder="Tên đăng nhập"
                        autoFocus
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    {userName === "" && (
                        <Form.Text className="text-danger">
                            Tên đăng nhập không được để trống.
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Mật khẩu"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                    />
                    {pass === "" && (
                        <Form.Text className="text-danger">
                            Mật khẩu không được để trống.
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu cấp 2</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Mật khẩu cấp 2"
                        value={pass2}
                        onChange={e => setPass2(e.target.value)}
                    />
                    {pass === "" && (
                        <Form.Text className="text-danger">
                            Mật khẩu cấp 2 không được để trống.
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        placeholder="Địa chỉ email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {email === "" && (
                        <Form.Text className="text-danger">
                            Địa chỉ email không được để trống.
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Điện thoại</Form.Label>
                    <Form.Control
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    {phone === "" && (
                        <Form.Text className="text-danger">
                            Số điện thoại không được để trống.
                        </Form.Text>
                    )}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onhide}>
                    Hủy
                </Button>
                <Button
                    disabled={
                        userName === "" ||
                        pass === "" ||
                        email === "" ||
                        phone === ""
                    }
                    variant="primary"
                    onClick={handleRegister}
                >
                    Đăng ký
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalRegister
