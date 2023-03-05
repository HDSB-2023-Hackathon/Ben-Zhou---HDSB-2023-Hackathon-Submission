import { useState, useEffect } from "react";
import { Card } from "../../interfaces";

const useSortCards = (cards: Card[]) => {
  const [sortedBy, setSortedBy] = useState<string>("");

  const [sortedCards, setSortedCards] = useState<Card[]>(cards);

  useEffect(() => {
    const sortByDate = (order: "max-date" | "min-date"): Card[] => {
      const toMillisseconds = (date: string) => Date.parse(date);
      const cardsCopy = [...cards];
      const sorted = cardsCopy.sort((card1, card2) => {
        const date1 = toMillisseconds(card1.date);
        const date2 = toMillisseconds(card2.date);

        if (date1 < date2) {
          return -1;
        }

        if (date1 > date2) {
          return 1;
        }

        return 0;
      });

      if (order === "min-date") {
        return sorted;
      }

      if (order === "max-date") {
        return sorted.reverse();
      }

      return cards; //se não existir cards (para não retornar undefined)
    };

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

    if (sortedBy === "min-date" || sortedBy === "max-date") {
      setSortedCards(sortByDate(sortedBy));
    }
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
