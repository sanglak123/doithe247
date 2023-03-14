import { DataSelector } from '@/redux/selector/DataSelector';
import { UserSelector } from '@/redux/selector/UserSelector';
import { LoadingDataPublicSuccess } from '@/redux/slice/dataPublic';
import { LoadingDataUserSuccess } from '@/redux/slice/user';
import { UserDataApi } from 'data/api/users/data';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardsHot from './layout/CardHot';
import TablePrices from './layout/TablePrices';
import PostCard from './PostCards';


function HomePage(props) {
    const User = useSelector(UserSelector.Auth.User);
    const accessToken = useSelector(UserSelector.Auth.AccessToken);
    const dispatch = useDispatch();

    //LoadingDataPublic
    useEffect(() => {
        const LoadingData = async () => {
            await UserDataApi.LoadingData(dispatch, LoadingDataPublicSuccess)
        };
        LoadingData()
    }, []);

    //Data  
    useEffect(() => {
        const GetDataUser = async () => {
            await UserDataApi.LoadingDataUser(dispatch, accessToken, User?.id, LoadingDataUserSuccess)
        }
        if (User, accessToken) {
            GetDataUser();
        }

    }, [accessToken])
    const Cards = useSelector(DataSelector.Cards);


    return (
        <div id='home_page'>
            <CardsHot />
            <PostCard />         
        </div>
    );
}

export default HomePage;