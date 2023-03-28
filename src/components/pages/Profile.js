import React, {useState} from "react"
import {
    Button,
    ButtonGroup,
    Col,
    Container,
    Form,
    Row,
    Table,
} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {UserAuthApi} from "../../../data/api/users/auth"
import {UserPaymentsApi} from "../../../data/api/users/payments"
import {UserProfileApi} from "../../../data/api/users/profile"
import {formatMoney} from "../../config/formatMoney"
import {UserSelector} from "../../redux/selector/UserSelector"
import {AddBankOfUserSuccess, RefreshUserSuccess} from "../../redux/slice/user"
import UploadImage from "./support/UploadImage"

function Profile(props) {
    const User = useSelector(UserSelector.Auth.User)
    const dispatch = useDispatch()

    const accessToken = useSelector(UserSelector.Auth.AccessToken)

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [adress, setAdress] = useState("")
    const [active, setActive] = useState(false)
    const [keyActiveEmail, setKeyActiveEmail] = useState("")

    const [edit, setEdit] = useState(false)

    //Auth Email
    const handleSendAuthEmail = async () => {
        await UserAuthApi.SendAuthEmail(dispatch, accessToken, User?.id)
    }

    const handleSendKeyAuthEmail = async () => {
        await UserAuthApi.SendKeyAuthEmail(
            accessToken,
            dispatch,
            keyActiveEmail
        )
    }

    //Change Pass
    const [action, setAction] = useState("pass")

    const [newPass, setNewPass] = useState("")
    const [reNewPass, setReNewPass] = useState("")
    const [pass, setPass] = useState("")

    //Change avatar
    const [photo, setPhoto] = useState("")
    const handlerChangeAvatar = async () => {
        await UserProfileApi.ChangeAvatar(
            accessToken,
            dispatch,
            User?.id,
            photo
        )
        await UserAuthApi.RefreshUser(
            dispatch,
            accessToken,
            User?.id,
            RefreshUserSuccess
        )
        setAction("pass")
    }

    //Bank
    const BankOfUsers = useSelector(UserSelector.Payments.BankOfUsers)
    const Banks = useSelector(DataSelector.Banks)
    const [idBank, setIdBank] = useState("")
    const [number, setNumber] = useState("")
    const [owner, setOwner] = useState("")
    const [branch, setBranch] = useState("")

    const [editBank, setEditBank] = useState("")

    const handleAddBank = async () => {
        await UserPaymentsApi.BankOfUser.Add(
            dispatch,
            accessToken,
            idBank,
            number,
            owner,
            branch,
            User?.id,
            AddBankOfUserSuccess
        )
        setIdBank("")
        setNumber("")
        setOwner("")
        setBranch("")
    }

    return (
        <div id="profile" className="animate__animated animate__fadeIn">
            <div className="profile_content bgr_black">
                <div className="user_number">
                    <div className="number_item">
                        <span className="material-symbols-outlined number_icon">
                            credit_score
                        </span>
                        <div className="number_intro">
                            <h6>112</h6>
                            <span>Đổi thẻ</span>
                        </div>
                    </div>
                    <div className="number_item">
                        <span className="material-symbols-outlined number_icon">
                            add_card
                        </span>
                        <div className="number_intro">
                            <h6>06</h6>
                            <span>Mua thẻ</span>
                        </div>
                    </div>
                    <div className="number_item">
                        <span className="material-symbols-outlined number_icon">
                            currency_exchange
                        </span>
                        <div className="number_intro">
                            <h6>85</h6>
                            <span>Nạp tiền</span>
                        </div>
                    </div>
                    <div className="number_item">
                        <span className="material-symbols-outlined number_icon">
                            payments
                        </span>
                        <div className="number_intro">
                            <h6>10</h6>
                            <span>Rút tiền</span>
                        </div>
                    </div>
                </div>

                <hr className="m-0" />

                <div className="profile_items">
                    <div className="profile_right  me-2">
                        <div className="profile_User">
                            <div className="hearder_hag">
                                <h1>PROFILE</h1>
                            </div>
                            {edit === true ? (
                                <>
                                    <ButtonGroup className="btn_edit_profile">
                                        <Button
                                            variant="success"
                                            onClick={() => setEdit(false)}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                setEdit(false)
                                                setEmail("")
                                                setDisplayName("")
                                                setAdress(User?.adress)
                                            }}
                                        >
                                            Cancle
                                        </Button>
                                    </ButtonGroup>
                                </>
                            ) : (
                                <Button
                                    variant="success"
                                    onClick={() => {
                                        setEdit(true)
                                        setEmail(User?.email.split("$$")[0])
                                        setDisplayName(User?.displayName)
                                        setPhone(User?.phone.split("$$")[0])
                                    }}
                                    className="btn_edit_profile"
                                >
                                    Edit
                                </Button>
                            )}

                            <div className="profile_User_content">
                                <Container>
                                    <Row>
                                        <Col
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            xl={6}
                                            xxl={4}
                                        >
                                            <div className="profile_User_item">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>
                                                        Tên đăng nhập
                                                    </Form.Label>
                                                    <Form.Control
                                                        className={
                                                            edit === true
                                                                ? "txt_block"
                                                                : ""
                                                        }
                                                        readOnly
                                                        value={User.userName}
                                                    />
                                                    {edit === true && (
                                                        <Form.Text className="text-danger">
                                                            Thông tin cố định.
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                            </div>
                                        </Col>

                                        <Col
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            xl={6}
                                            xxl={4}
                                        >
                                            <div className="profile_User_item">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>
                                                        Tên hiển thị
                                                    </Form.Label>
                                                    <Form.Control
                                                        readOnly={
                                                            edit === false
                                                        }
                                                        placeholder="Tên hiển thị"
                                                        value={
                                                            edit === false
                                                                ? User?.displayName
                                                                    ? User?.displayName
                                                                    : ""
                                                                : displayName
                                                        }
                                                        onChange={e =>
                                                            setDisplayName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Col>

                                        <Col
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            xl={6}
                                            xxl={4}
                                        >
                                            <div className="profile_User_item">
                                                <Form.Group className="mb-3">
                                                    {User?.email?.split(
                                                        "$$"
                                                    )[1] === "active" ? (
                                                        <>
                                                            <Form.Label>
                                                                Địa chỉ email
                                                            </Form.Label>
                                                            <InputGroup>
                                                                <Form.Control
                                                                    readOnly
                                                                    className={
                                                                        edit ===
                                                                        true
                                                                            ? "txt_block"
                                                                            : ""
                                                                    }
                                                                    value={
                                                                        User?.email.split(
                                                                            "$$"
                                                                        )[0]
                                                                    }
                                                                />
                                                            </InputGroup>
                                                            <Form.Text className="text-success">
                                                                Email đã được
                                                                kích hoạt.
                                                            </Form.Text>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {edit === true ? (
                                                                <>
                                                                    <Form.Label>
                                                                        Địa chỉ
                                                                        email
                                                                    </Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            type="email"
                                                                            placeholder="Địa chỉ email"
                                                                            value={
                                                                                email
                                                                            }
                                                                            onChange={e =>
                                                                                setEmail(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                    </InputGroup>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {active ===
                                                                    true ? (
                                                                        <>
                                                                            <Form.Label>
                                                                                Mã
                                                                                kích
                                                                                hoạt
                                                                                email
                                                                            </Form.Label>
                                                                            <InputGroup>
                                                                                <Form.Control
                                                                                    value={
                                                                                        keyActiveEmail
                                                                                    }
                                                                                    onChange={e =>
                                                                                        setKeyActiveEmail(
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    placeholder="Mã kích hoạt email."
                                                                                />
                                                                                <Button
                                                                                    onClick={() => {
                                                                                        handleSendKeyAuthEmail()
                                                                                        setActive(
                                                                                            false
                                                                                        )
                                                                                    }}
                                                                                >
                                                                                    Xác
                                                                                    thực
                                                                                </Button>
                                                                            </InputGroup>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Form.Label>
                                                                                Địa
                                                                                chỉ
                                                                                email
                                                                            </Form.Label>
                                                                            <InputGroup>
                                                                                <Form.Control
                                                                                    readOnly
                                                                                    value={
                                                                                        User?.email?.split(
                                                                                            "$$"
                                                                                        )[0]
                                                                                    }
                                                                                />
                                                                                {User?.email?.split(
                                                                                    "$$"
                                                                                )[1] ===
                                                                                    "block" && (
                                                                                    <Button
                                                                                        onClick={() => {
                                                                                            setActive(
                                                                                                true
                                                                                            )
                                                                                            setKeyActiveEmail(
                                                                                                ""
                                                                                            )
                                                                                            handleSendAuthEmail()
                                                                                        }}
                                                                                    >
                                                                                        Auth
                                                                                    </Button>
                                                                                )}
                                                                            </InputGroup>
                                                                            {User?.email?.split(
                                                                                "$$"
                                                                            )[1] ===
                                                                                "block" && (
                                                                                <Form.Text className="text-danger">
                                                                                    Email
                                                                                    chưa
                                                                                    được
                                                                                    xác
                                                                                    thực.
                                                                                </Form.Text>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} sm={12} md={6} xl={4}>
                                            <div className="profile_User_item">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>
                                                        Ví điện tử
                                                    </Form.Label>
                                                    <Form.Control
                                                        className={
                                                            edit === true
                                                                ? "txt_block"
                                                                : ""
                                                        }
                                                        readOnly
                                                        value={
                                                            User?.wallet_number?.split(
                                                                " "
                                                            )[1]
                                                        }
                                                    />
                                                    {edit === true && (
                                                        <Form.Text className="text-danger">
                                                            Thông tin cố định.
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                            </div>
                                        </Col>

                                        <Col xs={12} sm={12} md={6} xl={4}>
                                            <div className="profile_User_item">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>
                                                        Số dư
                                                    </Form.Label>
                                                    <Form.Control
                                                        className={
                                                            edit === true
                                                                ? "txt_block"
                                                                : ""
                                                        }
                                                        readOnly
                                                        value={formatMoney(
                                                            User?.surplus
                                                        )}
                                                    />
                                                    {edit === true && (
                                                        <Form.Text className="text-danger">
                                                            Thông tin cố định.
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} sm={12} md={12} xl={6}>
                                            <div className="profile_User_item">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>
                                                        Partner_Key
                                                    </Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            className="txt_block"
                                                            readOnly
                                                            value={
                                                                User?.partner_key
                                                            }
                                                        />
                                                        <Button
                                                            onClick={() =>
                                                                navigator.clipboard.writeText(
                                                                    User?.partner_key
                                                                )
                                                            }
                                                        >
                                                            <span className="material-symbols-outlined">
                                                                content_copy
                                                            </span>
                                                        </Button>
                                                    </InputGroup>

                                                    {edit === true && (
                                                        <Form.Text className="text-danger">
                                                            Thông tin cố định.
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                            </div>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} xl={6}>
                                            <div className="profile_User_item">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>
                                                        Api_Key
                                                    </Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            className="txt_block"
                                                            readOnly
                                                            value={
                                                                User?.api_key
                                                                    ? User?.api_key
                                                                    : "Chưa khởi tạo."
                                                            }
                                                        />
                                                        <Button
                                                            onClick={() =>
                                                                navigator.clipboard.writeText(
                                                                    User?.api_key
                                                                )
                                                            }
                                                        >
                                                            <span className="material-symbols-outlined">
                                                                content_copy
                                                            </span>
                                                        </Button>
                                                    </InputGroup>

                                                    {edit === true && (
                                                        <Form.Text className="text-danger">
                                                            Thông tin cố định.
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} sm={12} md={12} xl={6}>
                                            <div className="profile_User_item">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>
                                                        Địa chỉ
                                                    </Form.Label>
                                                    <Form.Control
                                                        readOnly={
                                                            edit === false
                                                        }
                                                        value={
                                                            edit === true
                                                                ? adress
                                                                : User?.adress
                                                                ? User?.adress
                                                                : ""
                                                        }
                                                        onChange={e =>
                                                            setAdress(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Địa chỉ"
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} xl={6}>
                                            <div className="profile_User_item">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>
                                                        Điện thoại
                                                    </Form.Label>
                                                    <Form.Control
                                                        readOnly={
                                                            edit === false
                                                        }
                                                        value={
                                                            edit === true
                                                                ? phone
                                                                : User?.phone
                                                                ? User?.phone.split(
                                                                      "$$"
                                                                  )[0]
                                                                : ""
                                                        }
                                                        onChange={e =>
                                                            setPhone(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Điện thoại"
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr />
                                </Container>
                            </div>
                        </div>

                        <div className="bank_user">
                            <div className="hearder_hag">
                                <h1>NGÂN HÀNG</h1>
                            </div>
                            {BankOfUsers.length > 0 && (
                                <div className="table_bank">
                                    <Table bordered size="sm">
                                        <thead>
                                            <tr className="txt_white txt_center">
                                                <th>#</th>
                                                <th>Ngân hàng</th>
                                                <th>Số tài khoản</th>
                                                <th>Chủ tài khoản</th>
                                                <th>Chi nhánh</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {BankOfUsers?.map((item, index) => {
                                                return (
                                                    <tr
                                                        key={index}
                                                        className="txt_white txt_center"
                                                    >
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {item.Bank?.name} -{" "}
                                                            {item.Bank?.sign}
                                                        </td>
                                                        <td>
                                                            {editBank ===
                                                            item.id ? (
                                                                <InputGroup className="mb-3">
                                                                    <Form.Control
                                                                        placeholder="Số tài khoản"
                                                                        value={
                                                                            number
                                                                        }
                                                                        onChange={e =>
                                                                            setNumber(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        autoFocus
                                                                    />
                                                                </InputGroup>
                                                            ) : (
                                                                item.number
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editBank ===
                                                            item.id ? (
                                                                <InputGroup className="mb-3">
                                                                    <Form.Control
                                                                        placeholder="Chủ tài khoản"
                                                                        value={
                                                                            owner
                                                                        }
                                                                        onChange={e =>
                                                                            setOwner(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            ) : (
                                                                item.owner
                                                            )}
                                                        </td>
                                                        <td>
                                                            {editBank ===
                                                            item.id ? (
                                                                <InputGroup className="mb-3">
                                                                    <Form.Control
                                                                        placeholder="Chi nhánh"
                                                                        value={
                                                                            branch
                                                                        }
                                                                        onChange={e =>
                                                                            setBranch(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </InputGroup>
                                                            ) : (
                                                                item.branch
                                                            )}
                                                        </td>
                                                        <td>
                                                            <ButtonGroup>
                                                                {editBank ===
                                                                item.id ? (
                                                                    <>
                                                                        <Button
                                                                            onClick={() =>
                                                                                setEditBank(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                            variant="success"
                                                                        >
                                                                            Lưu
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() =>
                                                                                setEditBank(
                                                                                    ""
                                                                                )
                                                                            }
                                                                            variant="danger"
                                                                        >
                                                                            Hủy
                                                                        </Button>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Button
                                                                            onClick={() => {
                                                                                setEditBank(
                                                                                    item.id
                                                                                )
                                                                                setNumber(
                                                                                    item.number
                                                                                )
                                                                                setOwner(
                                                                                    item.owner
                                                                                )
                                                                                setBranch(
                                                                                    item.branch
                                                                                )
                                                                            }}
                                                                            variant="success"
                                                                        >
                                                                            Sửa
                                                                        </Button>
                                                                        <Button variant="danger">
                                                                            Xóa
                                                                        </Button>
                                                                    </>
                                                                )}
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                            <div className="add_bank">
                                <Row>
                                    <Col md={12} xl={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Ngân hàng</Form.Label>
                                            <Form.Select
                                                onChange={e =>
                                                    setIdBank(e.target.value)
                                                }
                                            >
                                                <option value={""}>
                                                    Chọn ngân hàng
                                                </option>
                                                {Banks?.map((item, index) => {
                                                    return (
                                                        <option
                                                            value={item.id}
                                                            key={index}
                                                        >
                                                            {item.name} -{" "}
                                                            {item.sign}
                                                        </option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} xl={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                Số tài khoản
                                            </Form.Label>
                                            <Form.Control
                                                placeholder="Số tài khoản"
                                                value={number}
                                                onChange={e =>
                                                    setNumber(e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} xl={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                Chủ tài khoản
                                            </Form.Label>
                                            <Form.Control
                                                placeholder="Chủ tài khoản"
                                                value={owner}
                                                onChange={e =>
                                                    setOwner(e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} xl={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Chi nhánh</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    placeholder="Chi nhánh"
                                                    value={branch}
                                                    onChange={e =>
                                                        setBranch(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Button
                                                    variant="outline-success"
                                                    onClick={() =>
                                                        handleAddBank()
                                                    }
                                                >
                                                    Thêm
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>

                    <div className="profile_left">
                        <div className="avatar">
                            <div className="avatar_img">
                                <img
                                    src={User?.Img?.path}
                                    alt={User?.userName}
                                />
                            </div>
                        </div>

                        <hr />
                        <div className="profile_left_btn">
                            <Button
                                className={
                                    action === "pass" ? "btn_active" : ""
                                }
                                onClick={() => setAction("pass")}
                            >
                                Đổi mật khẩu
                            </Button>
                            <Button
                                className={
                                    action === "avatar" ? "btn_active" : ""
                                }
                                onClick={() => setAction("avatar")}
                            >
                                Đổi ảnh đại diện
                            </Button>
                        </div>
                        {action === "avatar" ? (
                            <div className="profile_left_action mt-4">
                                <UploadImage
                                    photo={photo}
                                    setPhoto={setPhoto}
                                    handle={handlerChangeAvatar}
                                />
                            </div>
                        ) : (
                            <div className="profile_left_action mt-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Mật khẩu mới</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Mật khẩu mới"
                                        value={newPass}
                                        onChange={e =>
                                            setNewPass(e.target.value)
                                        }
                                    />
                                    {newPass === "" && (
                                        <Form.Text className="text-danger">
                                            Mật khẩu mới không được để trống.
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Nhập lại mật khẩu mới
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập lại mật khẩu mới"
                                        value={reNewPass}
                                        onChange={e =>
                                            setReNewPass(e.target.value)
                                        }
                                    />
                                    {newPass !== reNewPass && (
                                        <Form.Text className="text-danger">
                                            Xác thực mật khẩu không chính xác.
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Mật khẩu củ</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Mật khẩu"
                                        value={pass}
                                        onChange={e => setPass(e.target.value)}
                                    />
                                </Form.Group>
                                <div className="txt_right">
                                    <Button
                                        disabled={
                                            newPass === "" ||
                                            reNewPass === "" ||
                                            pass === "" ||
                                            newPass !== reNewPass
                                        }
                                        className="me-2 btn_success"
                                        variant="success"
                                    >
                                        Thay đổi
                                    </Button>
                                    <Button
                                        className="ms-2 btn_cancle"
                                        onClick={() => setChange(false)}
                                        variant="danger"
                                        type="submit"
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
