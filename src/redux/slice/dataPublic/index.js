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
        EditCardSuccess: (state, actions) => {
            const index = state.Cards.findIndex(item => item.id === actions.payload.Card.id);

            if (actions.payload.Img) {
                const newCard = { ...actions.payload.Card, Img: actions.payload.Img }
                state.Cards[index] = newCard;
            } else {
                state.Cards[index].telco = actions.payload.Card.telco;
                state.Cards[index].change = actions.payload.Card.change;
            }
        }
    }
});
export const {
    LoadingDataPublicSuccess,
    //Prices
    UpdatePriceSuccess,
    ChangeTypeCardSuccess,
    //Cards
    EditCardSuccess

} = DataPublicSlice.actions;

export default DataPublicSlice;