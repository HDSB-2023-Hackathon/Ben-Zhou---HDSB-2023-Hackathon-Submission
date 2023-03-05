import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { cardsActions } from "../../../store/Cards.store";
import { ReactComponent as SvgX } from "../../../assets/x.svg";
import { ReactComponent as Check } from "../../../assets/check.svg";

const BtnToggleCompleted: React.FC<{
    cardCompleted: boolean;
    cardId: string;
    isListInView1: boolean;
}> = ({ cardCompleted, cardId, isListInView1 }) => {
    const dispatch = useAppDispatch();

    const toggleCardCompleted = (id: string) => {
        dispatch(cardsActions.toggleCardCompleted(id));
    };

    return (
        <button
            title={cardCompleted ? "Mark as Uncompleted" : "Mark as Completed"}
            className={`${
                cardCompleted
                    ? "bg-emerald-200 text-emerald-800 "
                    : "bg-amber-200 text-amber-800 "
            } ${isListInView1 ? "mr-4" : "mr-4 order-0"} rounded-full font-medium`}
            onClick={() => toggleCardCompleted(cardId)}
        >
            <span className="block py-1 px-3 absolute invisible sm:static sm:visible">
                {cardCompleted ? "Completed" : "Uncompleted"}
            </span>
            <span className=" sm:hidden w-6 h-6 grid place-items-center">
                {cardCompleted ? (
                    <Check className="w-3 h-3" />
                ) : (
                    <SvgX className="w-3 h-3" />
                )}
            </span>
        </button>
    );
};

export default React.memo(BtnToggleCompleted);
