import React, {useEffect, useState} from "react"
import {Button, Col, Row} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {AdminApiCards} from "../../../data/api/admin/cards"
import {DataPublicApi} from "../../../data/api/datapublic"
import {DataSelector} from "../../redux/selector/DataSelector"
import {UserSelector} from "../../redux/selector/UserSelector"
import {
    ChangeTypeCardSuccess,
    UpdateCardSuccess,
} from "../../redux/slice/dataPublic"

function AdminCards({accessToken}) {
    const dispatch = useDispatch()

    //Admin
    const User = useSelector(UserSelector.Auth.User)

    //Data
    const Cards = useSelector(DataSelector.Cards)

    //List Card
    const limit = 10
    const [pageCard, setPageCard] = useState(1)
    const [ListCard, setListCard] = useState([])

    useEffect(() => {
        const offset = (pageCard - 1) * limit
        const lits = Cards?.slice(offset, offset + limit)
        setListCard(lits)
    }, [Cards, pageCard])

    const [edit, setEdit] = useState("")
    const [telco, setTelco] = useState("")
    const [photo, setPhoto] = useState("")

    const handleEditCard = async card => {
        await AdminApiCards.Edit(
            card.id,
            telco,
            photo,
            card.change,
            dispatch,
            accessToken
        )
        await DataPublicApi.Cards.GetAll(dispatch, UpdateCardSuccess)
        setEdit("")
    }
    const handleChangeTypeCard = async card => {
        await AdminApiCards.ChangeType(
            accessToken,
            dispatch,
            card.id,
            ChangeTypeCardSuccess
        )
    }
    //Delete
    const handleDeleteCard = async card => {
        await AdminApiCards.Delete(card.id)
    }
    //Edit_Icon
    const [edit_icon, setEdit_Icon] = useState("")
    const handleEditIcon = async card => {
        await AdminApiCards.Edit_Icon(
            accessToken,
            dispatch,
            User?.id,
            card?.id,
            photo
        )
        await DataPublicApi.Cards.GetAll(dispatch, UpdateCardSuccess)
        setPhoto("")
        setEdit_Icon("")
    }

    return (
        <div id="List_Cards">
            <div className="table_card_list bgr_white mt-2">
                <div className="hearder_hag">
                    <h1>Cards List</h1>
                </div>
                <div className="cars_items">
                    <Row>
                        {ListCard?.map((item, index) => {
                            return (
                                <Col>
                                    <div key={index} className="cars_items">
                                        <div className="item">
                                            <div className="item_icon">
                                                <img
                                                    src={item.Img?.path}
                                                    className="img-fluid"
                                                />
                                                <div className="item_title d-flex">
                                                    <div className="title_left">
                                                        <h6>{item.telco}</h6>
                                                    </div>
                                                    <div className="title_right"></div>
                                                </div>
                                            </div>
                                            <Button className="btn_change_icon">
                                                <span class="material-symbols-outlined">
                                                    settings
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
            <Button variant="outline-danger" className="btn_add_card txt_bold">
                +
            </Button>
        </div>
    )
}

export default AdminCards
