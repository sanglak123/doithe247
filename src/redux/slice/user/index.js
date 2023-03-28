import {createSlice} from "@reduxjs/toolkit"

const UserSlice = createSlice({
    name: "UserAuth",
    initialState: {
        User: [],
        accessToken: null,
        Online: false,
        Store: [],
        BankOfUsers: [],

        RefillPending: [],
        RefillHistory: [],
        WithdrawPending: [],
        WithdrawHistory: [],

        Promotions: [],

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
            state.User = actions.payload.User
            state.accessToken = actions.payload.accessToken
            state.Online = actions.payload.Online
        },
        LogoutUserSuccess: state => {
            state.User = []
            state.accessToken = null
            state.Online = false
            state.BankOfUsers = []
            state.Refills = []
            state.Withdraws = []
            state.Products = []
        },
        // Profile
        EditProfileSuccess: (state, actions) => {
            state.User.User = actions.payload
        },
        //Data User
        LoadingDataUserSuccess: (state, actions) => {
            state.User = actions.payload.User
            state.BankOfUsers = actions.payload.BankOfUsers
            state.Products = actions.payload.Products

            state.Promotions = actions.payload.Promotions

            state.RefillPending = actions.payload.Payments.filter(
                item => item.command === "refill" && item.status === "Pending"
            )
            state.RefillHistory = actions.payload.Payments.filter(
                item => item.command === "refill" && item.status !== "Pending"
            )

            state.WithdrawPending = actions.payload.Payments.filter(
                item => item.command === "withdraw" && item.status === "Pending"
            )
            state.WithdrawHistory = actions.payload.Payments.filter(
                item => item.command === "withdraw" && item.status !== "Pending"
            )
        },
        //Store
        ChooseCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(
                item => item.id === actions.payload.id
            )
            if (index >= 0) {
                state.Store[index].count += 1
            } else {
                state.Store = [...state.Store, actions.payload]
            }
        },
        AddCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(
                item => item.id === actions.payload.id
            )
            if (index >= 0) {
                state.Store[index].count += 1
            }
        },
        SubtractionCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(
                item => item.id === actions.payload.id
            )
            if (index >= 0) {
                if (state.Store[index].count > 1) {
                    state.Store[index].count -= 1
                } else {
                    state.Store.splice(index, 1)
                }
            }
        },
        DeleteCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(
                item => item.id === actions.payload.id
            )
            if (index >= 0) {
                state.Store.splice(index, 1) //Xóa 1 item có thứ tự từ index trở đi
            }
        },
        ClearAllStoreSuccess: state => {
            state.Store = []
        },
        BuyCardSuccess: (state, actions) => {
            state.Store = []
        },
        //Refill
        UpdateRefillSuccess: (state, actions) => {
            state.RefillPending = actions.payload.Refills.filter(
                item => item.status === "Pending"
            )
            state.RefillHistory = actions.payload.Refills.filter(
                item => item.status !== "Pending"
            )
            state.User = actions.payload.User
        },
        CreateRefillSuccess: (state, actions) => {
            const newPayment = {
                ...actions.payload.Payment,
                BankOfUser: actions.payload.BankOfUser,
                ReceiveBank: actions.payload.ReceiveBank,
                Img: actions.payload.Img,
            }
            state.Refills.push(newPayment)
        },

        //Withdraw
        UpdateWithdrawSuccess: (state, actions) => {
            state.WithdrawPending = actions.payload.filter(
                item => item.status === "Pending"
            )
            state.WithdrawHistory = actions.payload.filter(
                item => item.status !== "Pending"
            )
        },
        //BankOfUser
        AddBankOfUserSuccess: (state, actions) => {
            const newBank = {
                ...actions.payload.Bank,
                Bank: actions.payload.TypeBank,
            }
            state.BankOfUsers.push(newBank)
        },
        RefreshBankOfUserSuccess: (state, actions) => {
            state.BankOfUsers = actions.payload
        },
    },
})
export const {
    RefreshTokenSuccess,
    //User
    LoginSuccess,
    LogoutUserSuccess,
    EditProfileSuccess,
    RefreshUserSuccess,
    //DataUser
    LoadingDataUserSuccess,
    //Store
    ChooseCardSuccess,
    AddCardSuccess,
    SubtractionCardSuccess,
    DeleteCardSuccess,
    ClearAllStoreSuccess,
    BuyCardSuccess,
    //Refill
    UpdateRefillSuccess,
    CreateRefillSuccess,
    //Withdraws
    UpdateWithdrawSuccess,
    //BankOfUser
    AddBankOfUserSuccess,
    RefreshBankOfUserSuccess,
} = UserSlice.actions

export default UserSlice
