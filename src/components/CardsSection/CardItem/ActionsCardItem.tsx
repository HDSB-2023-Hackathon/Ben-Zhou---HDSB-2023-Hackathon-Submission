import React from "react";
import { Card } from "../../../interfaces";
import BtnEditCard from "./BtnEditCard";
import BtnMarkAsImportant from "./BtnMarkAsImportant";
import BtnDeleteCard from "./BtnDeleteCard";
import BtnToggleCompleted from "./BtnToggleCompleted";

const ActionsCardItem: React.FC<{ card: Card; isListInView1: boolean }> = ({
    card,
    isListInView1,
}) => {
    return (
        <>
            <div
                className={`flex border-dashed border-slate-200 dark:border-slate-700/[.3] ${
                    isListInView1 ? "items-center" : "border-t-2 w-full pt-4 mt-4"
                }`}
            >
                <BtnToggleCompleted
                    cardCompleted={card.completed}
                    cardId={card.id}
                    isListInView1={isListInView1}
                />
                <BtnMarkAsImportant cardId={card.id} cardImportant={card.important} />
                <BtnDeleteCard cardId={card.id} />
                <BtnEditCard card={card} />
            </div>
        </>
    );
};

export default ActionsCardItem;
