import {useRouter} from "next/router"
import React, {useState} from "react"
import {Button, Form, Modal} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import AdminAutheApi from "../../../../data/api/admin/auth"
import {UserSelector} from "../../../redux/selector/UserSelector"
import {LoginAdminSuccess} from "../../../redux/slice/admin"

function ModalLoginAdmin({show, setShow}) {
    const dispatch = useDispatch()
    const User = useSelector(UserSelector.Auth.User)
    const accessToken = useSelector(UserSelector.Auth.AccessToken)
    const router = useRouter()

    const onhide = () => setShow(false)

    const [pass2, setPass2] = useState("")
    const [keyAdmin, setKeyAdmin] = useState("")

    const handleLoginAdmin = async () => {
        await AdminAutheApi.Login(
            accessToken,
            dispatch,
            User?.id,
            pass2,
            keyAdmin,
            router,
            LoginAdminSuccess
        )
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
                    Đăng nhập Admin
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu cấp 2</Form.Label>
                    <Form.Control
                        placeholder="Mật khẩu cấp 2"
                        type="password"
                        autoFocus
                        value={pass2}
                        onChange={e => setPass2(e.target.value)}
                    />
                    {pass2 === "" && (
                        <Form.Text className="text-danger">
                            Mật khẩu cấp 2 không được để trống.
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Key Admin</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Key ADMIN"
                        value={keyAdmin}
                        onChange={e => setKeyAdmin(e.target.value)}
                    />
                    {keyAdmin === "" && (
                        <Form.Text className="text-danger">
                            Key Admin không được để trống.
                        </Form.Text>
                    )}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onhide}>
                    Hủy
                </Button>
                <Button
                    disabled={pass2 === "" || keyAdmin === ""}
                    variant="primary"
                    onClick={handleLoginAdmin}
                >
                    Đăng nhập
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalLoginAdmin
