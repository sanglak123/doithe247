import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {UserDataApi} from "../../../data/api/users/data"
import {UserSelector} from "../../redux/selector/UserSelector"
import {LoadingDataPublicSuccess} from "../../redux/slice/dataPublic"
import {LoadingDataUserSuccess} from "../../redux/slice/user"
import CardsHot from "./layout/CardHot"
import PostCards from "./PostCards"

function HomePage(props) {
    const User = useSelector(UserSelector.Auth.User)
    const accessToken = useSelector(UserSelector.Auth.AccessToken)
    const dispatch = useDispatch()

    //LoadingDataPublic
    useEffect(() => {
        const LoadingData = async () => {
            await UserDataApi.LoadingData(dispatch, LoadingDataPublicSuccess)
        }
        LoadingData()
    }, [])

    //Data
    useEffect(() => {
        const GetDataUser = async () => {
            await UserDataApi.LoadingDataUser(
                dispatch,
                accessToken,
                User?.id,
                LoadingDataUserSuccess
            )
        }
        if ((User, accessToken)) {
            GetDataUser()
        }
    }, [accessToken])

    return (
        <div id="home_page">
            <CardsHot />
            <PostCards />
        </div>
    )
}

export default HomePage
