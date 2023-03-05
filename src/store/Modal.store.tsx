import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalCreateCardOpen: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        openModalCreateCard(state) {
            state.modalCreateCardOpen = true;
        },
        closeModalCreateCard(state) {
            state.modalCreateCardOpen = false;
        },
    },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
