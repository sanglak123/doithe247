import ErrorLogin from '@/layout/errorLogin/ErrorLogin';
import { UserSelector } from '@/redux/selector/UserSelector';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DashboardProfile from "@/components/dashboard/Profile";

function UserProfile(props) {

    const AccessToken = useSelector(UserSelector.Auth.AccessToken);


    return (
        AccessToken ?
            <div id='profile'>
                <Container>
                    <DashboardProfile />
                </Container>

            </div>
            :
            <ErrorLogin />
    );
}

export default UserProfile;