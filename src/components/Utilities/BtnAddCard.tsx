import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { modalActions } from "../../store/Modal.store";

const BtnAddCard: React.FC<{ className?: string }> = ({ className }) => {
    const dispatch = useAppDispatch();

    const onOpenModal = () => {
        dispatch(modalActions.openModalCreateCard());
    };
    return (
        <>
            <button className={`btn ${className}`} onClick={onOpenModal}>
                Add New Card
            </button>
        </>
    );
};

export default BtnAddCard;
