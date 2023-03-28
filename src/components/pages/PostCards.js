import {useState} from "react"
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"
import {formatMoney} from "../../config/formatMoney"
import Note from "../../layout/note/Note"
import {DataSelector} from "../../redux/selector/DataSelector"
import {UserSelector} from "../../redux/selector/UserSelector"
import TablePrices from "./layout/TablePrices"
import HistoryChangeCard from "./support/HistoryChangeCard"

function PostCards(props) {
    const dispatch = useDispatch()
    //Data
    const Cards = useSelector(DataSelector.Cards)
    const Values = useSelector(DataSelector.Values)
    //User
    const User = useSelector(UserSelector.Auth.User)
    const accessToken = useSelector(UserSelector.Auth.AccessToken)

    const listCardsChange = Cards?.filter(item => item.change === true)

    //ChangeCard
    const [telco, setTelco] = useState("VIETTEL")
    const [code, setCode] = useState("")
    const [serial, setSerial] = useState("")
    const [idValue, setIdValue] = useState(1)

    const handleChangeCard = async () => {
        if (code.length > 10 && serial.length > 10) {
            const idToast = toast.loading("Đang gửi thẻ...")
            await UserCardsApi.PostCards(
                accessToken,
                dispatch,
                telco,
                idValue,
                code,
                serial,
                User?.id,
                ChangeCar
            )
            setCode("")
            setSerial("")
        } else {
            toast.error("Mã thẻ - Serial không đúng định dạng!")
        }
    }
    return (
        <>
            <div
                id="change_card"
                className="bgr_dark mt-3 animate__animated animate__fadeInDown"
            >
                <div className="hearder_hag">
                    <h1>Đổi Thẻ</h1>
                </div>
                <Note />
                <Row>
                    <Col xs={12} sm={12} md={6} lg={3} xl={3} xxl={3}>
                        <div className="list_card">
                            <Form.Select
                                onChange={e => setTelco(e.target.value)}
                            >
                                {listCardsChange?.map((card, index) => {
                                    return (
                                        <option key={index} value={card.telco}>
                                            {card.telco}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                        </div>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={3} xl={3} xxl={3}>
                        <div className="code_card">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Code"
                                    minLength={13}
                                    maxLength={20}
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={3} xl={3} xxl={3}>
                        <div className="serial_card">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Serial"
                                    minLength={13}
                                    maxLength={20}
                                    value={serial}
                                    onChange={e => setSerial(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={3} xl={3} xxl={3}>
                        <div className="serial_card">
                            <Form.Select
                                onChange={e => setIdValue(e.target.value)}
                            >
                                {Values?.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {formatMoney(item.name)}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                        </div>
                    </Col>

                    <Col xs={12}>
                        <div className="txt_center">
                            <Button
                                onClick={handleChangeCard}
                                className="btn_send_card"
                                variant="success"
                                disabled={
                                    telco === "" ||
                                    code === "" ||
                                    serial === "" ||
                                    idValue === ""
                                }
                            >
                                <i className="me-2 fa fa-upload"></i>Gửi thẻ
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <TablePrices />
            <HistoryChangeCard />
        </>
    )
}

export default PostCards
