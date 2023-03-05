import { useEffect, useState } from "react";
import { Card } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";

const useSearchQuery = (searchQuery: string) => {
  const cards = useAppSelector((state) => state.cards.cards);

  const [matchedCards, setMatchedCards] = useState<Card[]>([]);

  useEffect(() => {
    const filteredCards = cards.filter((card: Card) => {
      return card.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    if (searchQuery.trim().length) {
      setMatchedCards(filteredCards);
    } else {
      setMatchedCards([]);
    }
  }, [searchQuery, cards]);

  return matchedCards;
};

export default useSearchQuery;
