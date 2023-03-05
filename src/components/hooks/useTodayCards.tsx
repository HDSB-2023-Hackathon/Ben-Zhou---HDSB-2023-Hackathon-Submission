import { useState, useEffect } from "react";
import { Card } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";

const useTodayCards = (): Card[] => {
  const cards = useAppSelector((state) => state.cards.cards);
  const [todaysCards, setTodaysCards] = useState<Card[]>([]);

  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();

  const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    let filteredCards: Card[] = cards.filter(
      (card: Card) => card.date === dateTimeFormat
    );
    setTodaysCards(filteredCards);
  }, [dateTimeFormat, cards]);
  return todaysCards;
};

export default useTodayCards;
