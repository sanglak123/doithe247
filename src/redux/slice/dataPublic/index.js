import { createSlice } from "@reduxjs/toolkit";

const DataPublicSlice = createSlice({
    name: "UserDataPublic",
    initialState: {
        Prices: [],
        TypeCards: [],
        Cards: [],
        Values: [],
        Banks: [],
        News: [],
        ReceiveBanks: [],
        Events: []
    },
    reducers: {
        LoadingDataPublicSuccess: (state, actions) => {
            state.Prices = actions.payload.Prices
            state.TypeCards = actions.payload.TypeCards;
            state.Cards = actions.payload.Cards;
            state.Values = actions.payload.Values;
            state.Banks = actions.payload.Banks;
            state.News = actions.payload.News;
            state.ReceiveBanks = actions.payload.ReceiveBanks;
            state.Events = actions.payload.Events;
        },
        //Prices
        UpdatePriceSuccess: (state, actions) => {
            state.Prices = actions.payload;
        },
        ChangeTypeCardSuccess: (state, actions) => {
            const index = state.Cards.findIndex(item => item.id === actions.payload.id);
            state.Cards[index] = actions.payload
        },
        //Cards
        UpdateCardSuccess: (state, actions) => {
            state.Cards = actions.payload;
        },
        //Events
        UpdateEventSuccess: (state, actions) => {
            state.Events = actions.payload
        },
    }
});
export const {
    LoadingDataPublicSuccess,
    //Prices
    UpdatePriceSuccess,
    ChangeTypeCardSuccess,
    //Cards
    UpdateCardSuccess,
    //Events
    UpdateEventSuccess,

} = DataPublicSlice.actions;

export default DataPublicSlice;