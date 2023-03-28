import React, {useState} from "react"
import {Button, Form, Modal} from "react-bootstrap"
import {useDispatch} from "react-redux"
import {UserAuthApi} from "../../../../data/api/users/auth"
import {LoginSuccess} from "../../../redux/slice/user"

function ModalLogin({show, setShow}) {
    const dispatch = useDispatch()

    const onhide = () => setShow(false)

    const [userName, setUserName] = useState("")
    const [pass, setPass] = useState("")

    const handleLogin = async () => {
        await UserAuthApi.Login(userName, pass, dispatch, LoginSuccess)
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
                    Đăng nhập
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onhide}>
                    Hủy
                </Button>
                <Button
                    disabled={userName === "" || pass === ""}
                    variant="primary"
                    onClick={handleLogin}
                >
                    Đăng nhập
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalLogin
