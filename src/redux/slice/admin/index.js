import { createSlice } from "@reduxjs/toolkit";

const AdminDataSlice = createSlice({
    name: "admin",
    initialState: {
        Users: [],
        ChangeCards: [],
        BuyCards: [],
        Payments: [],
        LoginAdmin: false
    },
    reducers: {
        // LoginAdmin
        LoginAdminSuccess: (state, actions) => {
            state.LoginAdmin = actions.payload
        },
        //Admin logout
        LogoutAdminSuccess: (state) => {
            state.LoginAdmin = false;
            state.Data = [];
            state.Users = [];
            state.BuyCards = [];
            state.ChangeCards = [];
        },
        //Data Admin
        LoadingDataAdminSuccess: (state, actions) => {
            state.Users = actions.payload.Users;
            state.ChangeCards = actions.payload.ChangeCards;
            state.BuyCards = actions.payload.BuyCards;
            state.Payments = actions.payload.Payments;
        },
        //Payments
        HandlePaymentSuccess: (state, actions)=>{
            const index = state.Payments.findIndex(item => item.id === actions.payload.id);
            state.Payments[index] = actions.payload;
        }
    }
});
export const {
    LoadingDataAdminSuccess,
    LoginAdminSuccess,
    LogoutAdminSuccess,
    //Payments
    HandlePaymentSuccess

} = AdminDataSlice.actions;

export default AdminDataSlice;