import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import useCompletedCards from "../hooks/useCompletedCards";
import useTodayCards from "../hooks/useTodayCards";

const CardsDone: React.FC = () => {
  const todaysCards = useTodayCards();
  const cards = useAppSelector((state) => state.cards.cards);
  const { cards: todayCardsDone } = useCompletedCards({
    cards: todaysCards,
    done: true,
  });
  const { cards: allCardsDone } = useCompletedCards({
    cards: cards,
    done: true,
  });

  const percentageTodayCards =
    (todayCardsDone.length * 100) / todaysCards.length;

  const percentageAllCards = (allCardsDone.length * 100) / cards.length;

  const todaysCardsToShow = todaysCards.slice(0, 3);

  const showMore = todaysCards.length > todaysCardsToShow.length;

  return (
    <>
      {todaysCards.length !== 0 && (
        <div className="mt-8">
          <span className="flex justify-between mb-2">
            <span>Cards today</span> {todayCardsDone.length}/
            {todaysCards.length}
          </span>
          <div className="barProgress">
            <div style={{ width: percentageTodayCards + "%" }}></div>
          </div>
        </div>
      )}
      {cards.length !== 0 && (
        <div className="mt-6">
          <span className="flex justify-between mb-2">
            <span>All cards </span> {allCardsDone.length}/{cards.length}
          </span>
          <div className="barProgress">
            <div style={{ width: percentageAllCards + "%" }}></div>
          </div>
        </div>
      )}

      {todaysCards.length === 0 && (
        <span className="mt-6 block pt-4 border-t-slate-200 dark:border-t-slate-700/[.3] border-t-2">
          No cards today
        </span>
      )}

      {todaysCards.length > 0 && (
        <div className="mt-8">
          <span className="mb-2 block">Today's cards</span>
          <ul>
            {todaysCardsToShow.map((card) => (
              <li key={card.id} className="py-2 pl-6 text-slate-200 list-item">
                <span>{card.title}</span>
              </li>
            ))}
          </ul>
          {showMore && (
            <Link to="/today" className="pl-6">
              Show more
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(CardsDone);
