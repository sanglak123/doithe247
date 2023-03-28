import Link from "next/link"
import {useRouter} from "next/router"
import React, {useState} from "react"
import {Button, Form} from "react-bootstrap"
import {useDispatch} from "react-redux"
import AdminAutheApi from "../../../data/api/admin/auth"
import {LoginSuccess} from "../../redux/slice/user"

function AdminLogin(props) {
    const dispatch = useDispatch()
    const router = useRouter()

    const [userName, setUserName] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")
    const [keyAdmin, setKeyAdmin] = useState("")

    const handleLoginAdmin = async () => {
        await AdminAutheApi.Login(
            userName,
            pass,
            pass2,
            keyAdmin,
            dispatch,
            LoginSuccess,
            router
        )
    }

    return (
        <div id="AdminLogin">
            <div className="login_content">
                <div className="login_main">
                    <div className="login_header">
                        <div className="hearder_hag">
                            <h1>LOGIN ADMIN</h1>
                        </div>
                    </div>
                    <div className="login_body">
                        <Form.Group className="mb-3">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control
                                placeholder="Tên đăng nhập"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu cấp 1</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Mật khẩu cấp 1"
                                value={pass}
                                onChange={e => setPass(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu cấp 2</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Mật khẩu cấp 2"
                                value={pass2}
                                onChange={e => setPass2(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Key Admin</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Key admin"
                                value={keyAdmin}
                                onChange={e => setKeyAdmin(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </div>
                    <div className="login_footer">
                        <Link className="btn btn-danger btn_login" href={"/"}>
                            Cancle
                        </Link>
                        <Button
                            className="btn_login"
                            onClick={() => handleLoginAdmin()}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
