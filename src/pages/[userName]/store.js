import { useRouter } from 'next/router';
import React from 'react';

function UserStore(props) {
    const router = useRouter();
    const { user } = router.query;
    return (
        <div id='userStore'>
            {user} Store
        </div>
    );
}

export default UserStore;