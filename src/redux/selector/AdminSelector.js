export const AdminSelector = {
    LoginAdmin: (state) => state.AdminDataSlice.LoginAdmin,
    Data: {
        Users: (state) => state.AdminDataSlice.Users,
        ChangeCards: (state) => state.AdminDataSlice.Users,
        BuyCards: (state) => state.AdminDataSlice.Users,

        Refills: (state) => state.AdminDataSlice.Refills,
        Withdraws: (state) => state.AdminDataSlice.Withdraws,

        RefillPending: (state) => state.AdminDataSlice.RefillPending,
        RefillHistory: (state) => state.AdminDataSlice.RefillHistory,

        WithdrawPending: (state) => state.AdminDataSlice.WithdrawPending,
        WithdrawHistory: (state) => state.AdminDataSlice.WithdrawHistory,
    }
}