import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "UserAuth",
    initialState: {
        User: [],
        accessToken: null,
        Online: false,
        Store: [],
        BankOfUsers: [],
        Refills: [],
        Withdraws: [],
        Products: [],        
    },
    reducers: {
        //Refresh
        RefreshTokenSuccess: (state, actions) => {
            state.accessToken = actions.payload
        },
        RefreshUserSuccess: (state, actions) => {
            state.User = actions.payload
        },
        //Auth
        LoginSuccess: (state, actions) => {
            state.User = actions.payload.User;
            state.accessToken = actions.payload.accessToken;
            state.Online = actions.payload.Online;
            state.BankOfUsers = actions.payload.BankOfUsers;
            state.Refills = actions.payload.Refills;
            state.Withdraws = actions.payload.Withdraws;
            state.Products = actions.payload.Products
        },
        LogoutUserSuccess: (state) => {
            state.User = [];
            state.accessToken = null;
            state.Online = false;
            state.BankOfUsers = [];
            state.Refills = [];
            state.Withdraws = [];
            state.Products = []
        },
        // Profile
        EditProfileSuccess: (state, actions) => {
            state.User.User = actions.payload
        },
        //Store
        ChooseCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(el => el.telco === actions.payload.telco && el.value === actions.payload.value);
            if (index >= 0) {
                return;
            } else {
                state.Store = [...state.Store, actions.payload]
            }
        },
        AddCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(item => item.telco === actions.payload.telco && item.value === actions.payload.value);
            if (index >= 0) {
                state.Store[index].count += 1;
            }
        },
        SubtractionCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(el => el.telco === actions.payload.telco && el.value === actions.payload.value);
            if (index >= 0) {
                if (state.Store[index].count > 1) {
                    state.Store[index].count -= 1;
                } else {
                    state.Store.splice(index, 1);
                }
            }
        },
        DeleteCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(item => item.telco === actions.payload.telco && item.value === actions.payload.value);
            if (index >= 0) {
                state.Store.splice(index, 1); //Xóa 1 item có thứ tự từ index trở đi
            }
        },
        ClearAllStoreSuccess: (state) => {
            state.Store = [];
        },
        BuyCardSuccess: (state, actions) => {
            state.Store = [];
        },
        //Refill
        CreateRefillSuccess: (state, actions) => {
            const newPayment = {
                ...actions.payload.Payment,
                BankOfUser: actions.payload.BankOfUser,
                ReceiveBank: actions.payload.ReceiveBank,
                Img: actions.payload.Img
            };
            state.Refills.push(newPayment)
        },
        RefreshRefillSuccess: (state, actions) => {
            state.Refills = actions.payload;
        },
        DeleteRefillSuccess: (state, actions) => {
            const index = state.Refills.findIndex(item => item.id === actions.payload.id);
            state.Refills.slice(index, 1)
        }
    }
});
export const {

    RefreshTokenSuccess,
    //User
    LoginSuccess,
    LogoutUserSuccess,
    EditProfileSuccess,
    RefreshUserSuccess,
    //Store
    //Store
    ChooseCardSuccess,
    AddCardSuccess,
    SubtractionCardSuccess,
    DeleteCardSuccess,
    ClearAllStoreSuccess,
    BuyCardSuccess,
    //Refill
    CreateRefillSuccess,
    RefreshRefillSuccess,
    DeleteRefillSuccess

} = UserSlice.actions;

export default UserSlice;