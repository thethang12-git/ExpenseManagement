import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user"
import transactionsReducer from "./slices/transactions";
export const store = configureStore({
    reducer: {
        user: userReducer,
        transactions:transactionsReducer,
        // popup: popupReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
