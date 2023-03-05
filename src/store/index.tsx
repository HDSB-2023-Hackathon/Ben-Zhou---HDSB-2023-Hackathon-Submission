import { configureStore } from "@reduxjs/toolkit";
import cardsReducer, { cardsMiddleware } from "./Cards.store";
import modalReducer from "./Modal.store";
import menuReducer from "./Menu.store";

const store = configureStore({
    reducer: { cards: cardsReducer, modal: modalReducer, menu: menuReducer },
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware().concat(cardsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;
