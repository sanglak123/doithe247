export const UserSelector = {

    Auth: {
        User: (state) => state.UserSlice.User,
        AccessToken: (state) => state.UserSlice.accessToken,
        Online: (state) => state.UserSlice.Online,
    },
    Store: (state) => state.UserSlice.Store,
    Payments: {
        BankOfUsers: (state) => state.UserSlice.BankOfUsers,
        Refills: (state) => state.UserSlice.Refills,
        Withdraws: (state) => state.UserSlice.Withdraws,
        Products: (state) => state.UserSlice.Products,
    },
}