import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { cardsActions } from "../../../store/Cards.store";
import ModalCreateCard from "../../Utilities/ModalCard";
import { ReactComponent as OptionsSvg } from "../../../assets/options.svg";
import { Card } from "../../../interfaces";

const BtnEditCard: React.FC<{ card: Card }> = ({ card }) => {
    const [modalEditCardOpen, setModalEditCardOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const closeModalEditCard = () => {
        setModalEditCardOpen(false);
    };

    const openModalEditCard = () => {
        setModalEditCardOpen(true);
    };

    const editCardHandler = (card: Card) => {
        dispatch(cardsActions.editCard(card));
    };

    return (
        <>
            <button
                title="edit card"
                className="transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700"
                onClick={openModalEditCard}
            >
                <OptionsSvg className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            {modalEditCardOpen && (
                <ModalCreateCard
                    onClose={closeModalEditCard}
                    card={card}
                    nameForm="Edit Card"
                    onConfirm={editCardHandler}
                />
            )}
        </>
    );
};

export default BtnEditCard;
