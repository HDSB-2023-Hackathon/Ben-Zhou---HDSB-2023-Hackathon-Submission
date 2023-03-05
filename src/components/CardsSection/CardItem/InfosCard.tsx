import React from "react";
import { Card } from "../../../interfaces";

const InfosCard: React.FC<{ card: Card; isListInView1: boolean }> = ({
    card,
    isListInView1,
}) => {

    return (
        <div className={`flex flex-col flex-1 ${isListInView1 ? "mr-6" : ""}`}>
            <div
                className={`flex items-center justify-between ${
                    isListInView1 ? "mb-1" : "mb-2"
                }`}
            >
                <span className={`text-slate-100 block font-medium break-normal "`}>
                    {card.title}
                </span>
            </div>
            <p
                title={card.description}
                className={`description mb-2 text-slate-100 ${
                    isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"
                }`}
            >
                {card.description}
            </p>
        </div>
    );
};

export default InfosCard;
