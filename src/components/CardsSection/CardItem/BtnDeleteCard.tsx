import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { cardsActions } from "../../../store/Cards.store";
import ModalConfirm from "../../Utilities/ModalConfirm";
import { ReactComponent as Trash } from "../../../assets/trash.svg";

const BtnDeleteCard: React.FC<{ cardId: string }> = ({ cardId }) => {
    const [showModal, setIsModalShown] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const removeCardHandler = () => {
        dispatch(cardsActions.removeCard(cardId));
    };
    return (
        <>
            {showModal && (
                <ModalConfirm
                    onClose={() => setIsModalShown(false)}
                    text="This card will be deleted permanently."
                    onConfirm={removeCardHandler}
                />
            )}
            <button
                onClick={() => setIsModalShown(true)}
                title="delete card"
                className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200"
            >
                <Trash className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500" />
            </button>
        </>
    );
};

export default React.memo(BtnDeleteCard);
