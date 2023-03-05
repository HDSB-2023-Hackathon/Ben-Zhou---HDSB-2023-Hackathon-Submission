import React from "react";
import { Card } from "../../../interfaces";
import { Link } from "react-router-dom";
import InfosCard from "./InfosCard";
import ActionsCardItem from "./ActionsCardItem";

const CardItem: React.FC<{ isListInView1: boolean; card: Card }> = ({
    isListInView1,
    card,
}) => {
    return (
        <>
            <li key={card.id}>
                <Link
                    to={`/application/${card.app}`}
                    title={card.app}
                    className="ml-auto mr-4 w-min whitespace-nowrap overflow-hidden max-w-[10rem] text-center text-ellipsis bg-rose-200 text-rose-600 px-4 py-1 rounded-t-md transition dark:bg-slate-700 dark:text-slate-200 block hover:bg-rose-300 dark:hover:bg-rose-500"
                >
                    {card.type}
                </Link>
                <article
                    className={`${card.color} rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:${card.color} dark:hover:shadow-transparent ${
                        isListInView1 ? "flex-row sm:h-32" : "flex-col h-52 sm:h-64"
                    }`}
                >
                    <InfosCard card={card} isListInView1={isListInView1} />
                    <ActionsCardItem card={card} isListInView1={isListInView1} />
                </article>
            </li>
        </>
    );
};

export default React.memo(CardItem);
