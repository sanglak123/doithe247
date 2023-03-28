export const DataSelector = {
    Prices: state => state.DataPublicSlice.Prices,
    TypeCards: state => state.DataPublicSlice.TypeCards,
    Cards: state => state.DataPublicSlice.Cards,
    Values: state => state.DataPublicSlice.Values,
    Banks: state => state.DataPublicSlice.Banks,
    News: state => state.DataPublicSlice.News,
    ReceiveBanks: state => state.DataPublicSlice.ReceiveBanks,
    Events: state => state.DataPublicSlice.Events,
}
