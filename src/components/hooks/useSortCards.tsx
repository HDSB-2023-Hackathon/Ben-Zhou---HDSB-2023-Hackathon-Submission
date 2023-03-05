import { useState, useEffect } from "react";
import { Card } from "../../interfaces";

const useSortCards = (cards: Card[]) => {
    const [sortedBy, setSortedBy] = useState<string>("");

    const [sortedCards, setSortedCards] = useState<Card[]>(cards);

    useEffect(() => {

        const sortByCompletedStatus = (completed: boolean): Card[] => {
            const cardsCopy = [...cards];
            const sorted = cardsCopy.sort((card1) => {
                if (card1.completed) {
                    return -1;
                }
                return 0;
            });
            if (completed) {
                return sorted;
            }
            if (!completed) {
                return sorted.reverse();
            }
            return cards;
        };

        if (sortedBy === "" || sortedBy === "order-added") {
            setSortedCards(cards);
        }
        if (sortedBy === "completed-first") {
            setSortedCards(sortByCompletedStatus(true));
        }
        if (sortedBy === "uncompleted-first") {
            setSortedCards(sortByCompletedStatus(false));
        }
    }, [sortedBy, cards]);
    return { sortedBy, setSortedBy, sortedCards };
};

export default useSortCards;
