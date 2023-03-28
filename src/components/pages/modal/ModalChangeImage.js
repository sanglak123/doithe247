import React, {useState} from "react"
import {Modal} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {UserAuthApi} from "../../../../data/api/users/auth"
import {UserProfileApi} from "../../../../data/api/users/profile"
import {UserSelector} from "../../../redux/selector/UserSelector"
import {RefreshUserSuccess} from "../../../redux/slice/user"
import UploadImage from "../support/UploadImage"

function ModalChangeImage({show, setShow, title}) {
    //User
    const accessToken = useSelector(UserSelector.Auth.AccessToken)
    const User = useSelector(UserSelector.Auth.User)
    const dispatch = useDispatch()

    const [photo, setPhoto] = useState("")

    const onhide = () => {
        setShow(false)
    }
    const handleChangeAvatar = async () => {
        await UserProfileApi.ChangeAvatar(
            accessToken,
            dispatch,
            User?.id,
            photo
        )
        onhide()
        await UserAuthApi.RefreshUser(
            dispatch,
            accessToken,
            User?.id,
            RefreshUserSuccess
        )
    }

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => setShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UploadImage
                    photo={photo}
                    setPhoto={setPhoto}
                    handle={handleChangeAvatar}
                    setShow={setShow}
                />
            </Modal.Body>
        </Modal>
    )
}

export default ModalChangeImage
