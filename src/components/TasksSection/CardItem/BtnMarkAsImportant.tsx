import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { cardsActions } from "../../../store/Cards.store";
import { ReactComponent as StarLine } from "../../../assets/star-line.svg";

const BtnMarkAsImportant: React.FC<{
    cardId: string;
    cardImportant: boolean;
}> = ({ cardId, cardImportant }) => {
    const dispatch = useAppDispatch();

    const markAsImportantHandler = () => {
        dispatch(cardsActions.markAsImportant(cardId));
    };

    return (
        <button
            title={cardImportant ? "Mark as Not Important" : "Mark as Important"}
            onClick={markAsImportantHandler}
            className="transition hover:text-slate-700 dark:hover:text-slate-200 ml-auto"
        >
            <StarLine
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    cardImportant ? "fill-yellow-300 stroke-yellow-300 " : "fill-none"
                }`}
            />
        </button>
    );
};

export default React.memo(BtnMarkAsImportant);
