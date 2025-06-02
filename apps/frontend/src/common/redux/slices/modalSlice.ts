import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ModalType, TaskType} from "../../Type.ts";

const initialState: ModalType = {
    isOpen: false,
    modalStatus: null,
    task: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ modalStatus: ModalType['modalStatus'], task?: TaskType | null }>) => {
            state.isOpen = true;
            state.modalStatus = action.payload.modalStatus;
            state.task = action.payload.task ?? null;
        },

        closeModal: (state) => {
            state.isOpen = false;
            state.modalStatus = null;
            state.task = null;
        },
    },
});

export const {openModal, closeModal} = modalSlice.actions;

// 리듀서를 내보낸 뒤 store에 등록
export default modalSlice.reducer;
