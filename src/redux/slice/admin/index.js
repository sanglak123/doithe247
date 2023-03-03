import { createSlice } from "@reduxjs/toolkit";

const AdminDataSlice = createSlice({
    name: "admin",
    initialState: {
        Users: [],
        ChangeCards: [],
        BuyCards: [],
        LoginAdmin: false,

        RefillPending: [],
        RefillHistory: [],
        WithdrawPending: [],
        WithdrawHistory: []
    },
    reducers: {
        // LoginAdmin
        LoginAdminSuccess: (state, actions) => {
            state.LoginAdmin = actions.payload;
        },
        //Admin logout
        SignOutAdminSuccess: (state) => {
            state.LoginAdmin = false;
            state.Data = [];
            state.Users = [];
            state.BuyCards = [];
            state.ChangeCards = [];
        },
        //LoadingDataAdmin
        LoadingDataAdminSuccess: (state, actions) => {
            state.Users = actions.payload.Users;

            state.ChangeCards = actions.payload.ChangeCards;
            state.BuyCards = actions.payload.BuyCards;

            state.Refills = actions.payload.Refills;
            state.Withdraws = actions.payload.Withdraws;
            //Payments                 
            state.RefillPending = actions.payload.Payments.filter(item => item.command === "refill" && item.status === "Pending");
            state.RefillHistory = actions.payload.Payments.filter(item => item.command === "refill" && item.status !== "Pending");

            state.WithdrawPending = actions.payload.Payments.filter(item => item.command === "withdraw" && item.status === "Pending");
            state.WithdrawHistory = actions.payload.Payments.filter(item => item.command === "withdraw" && item.status !== "Pending");
        },
        //Payments
        RefreshListRefillSuccess: (state, actions) => {
            state.WithdrawPending = actions.payload.Payments.filter(item => item.command === "withdraw" && item.status === "Pending");
            state.WithdrawHistory = actions.payload.Payments.filter(item => item.command === "withdraw" && item.status !== "Pending");
        }
    }
});
export const {
    LoginAdminSuccess,
    SignOutAdminSuccess,
    //LoadData
    LoadingDataAdminSuccess,
    //Payments
    RefreshListRefillSuccess

} = AdminDataSlice.actions;

export default AdminDataSlice;