export const UserSelector = {

    Auth: {
        User: (state) => state.UserSlice.User,
        AccessToken: (state) => state.UserSlice.accessToken,
        Online: (state) => state.UserSlice.Online,
    },
    Store: (state) => state.UserSlice.Store,
    Payments: {
        BankOfUsers: (state) => state.UserSlice.BankOfUsers,
        Products: (state) => state.UserSlice.Products,


        RefillPending: (state) => state.UserSlice.RefillPending,
        RefillHistory: (state) => state.UserSlice.RefillHistory,

        WithdrawPending: (state) => state.UserSlice.WithdrawPending,
        WithdrawHistory: (state) => state.UserSlice.WithdrawHistory,
    },
    Promotions: (state) => state.UserSlice.Promotions
}