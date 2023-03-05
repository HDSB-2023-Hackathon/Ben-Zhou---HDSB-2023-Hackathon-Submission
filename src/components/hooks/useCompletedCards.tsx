import { useEffect, useState } from "react";
import { Card } from "../../interfaces";

interface Props {
    cards: Card[];
    done: boolean;
}

const useCompletedCards = (props: Props): { cards: Card[] } => {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const filteredCards: Card[] = props.cards.filter((card: Card) => {
            if (props.done) {
                return card.completed;
            } else {
                return !card.completed;
            }
        });
        setCards(filteredCards);
    }, [props.cards, props.done]);

    return { cards };
};

export default useCompletedCards;
