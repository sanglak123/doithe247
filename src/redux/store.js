//Redux Toolkit
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AdminDataSlice from "./slice/admin";
import DataPublicSlice from "./slice/dataPublic";
import UserSlice from "./slice/user";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    //User
    UserSlice: UserSlice.reducer,

    //Admin
    AdminDataSlice: AdminDataSlice.reducer,

    //Data Public
    DataPublicSlice: DataPublicSlice.reducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(Store);