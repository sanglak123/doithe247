export const AdminSelector = {
    LoginAdmin: (state) => state.AdminDataSlice.LoginAdmin,
    Data: {
        Users: (state) => state.AdminDataSlice.Users,
        ChangeCards: (state) => state.AdminDataSlice.Users,
        BuyCards: (state) => state.AdminDataSlice.Users,
        Payments: (state) => state.AdminDataSlice.Payments,
    }
}