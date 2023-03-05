import React, { useRef } from "react";
import useVisibility from "../hooks/useVisibility";
import { ReactComponent as IconBell } from "../../assets/bell.svg";
import useTodayCards from "../hooks/useTodayCards";
import useCompletedCards from "../hooks/useCompletedCards";
import { Link } from "react-router-dom";

const classHasNotification =
    "after:content-[''] after:w-2 after:h-2 after:bg-rose-500 block after:rounded-full after:absolute after:bottom-3/4  after:left-3/4";

const Notification: React.FC = () => {
    const refBtnNotification = useRef<HTMLButtonElement>(null);

    const {
        elementIsVisible: notificationIsVisible,
        showElement: showNotifications,
    } = useVisibility([refBtnNotification.current!]);

    const todaysCards = useTodayCards();

    const { cards: uncompletedCards } = useCompletedCards({
        cards: todaysCards,
        done: false,
    });

    const cardsToShow = uncompletedCards.slice(0, 3);

    const moreCardsToShow = uncompletedCards.length > cardsToShow.length;
    return (
        <div className="sm:mr-4 md:mr-6 ml-auto grid place-items-center relative">
            <button
                ref={refBtnNotification}
                onClick={showNotifications}
                className={`relative ${cardsToShow.length ? classHasNotification : ""}`}
                title="See Notifications"
            >
                <IconBell className="fill-violet-600 w-5 h-5 md:w-6 md:h-6 dark:fill-violet-800" />
            </button>
            {notificationIsVisible && (
                <div className="absolute bg-slate-100 dark:bg-slate-800 top-full rounded-md right-0 p-3 w-52 border border-slate-300 dark:border-slate-700">
                    {uncompletedCards.length > 0 ? (
                        <div>
                            <span className="dark:text-slate-200 font-medium">
                                You have {uncompletedCards.length} uncompleted cards today:
                            </span>
                            <ul>
                                {cardsToShow.map((card) => (
                                    <li key={card.id} className="py-1">
                                        <Link
                                            to={`/card/${card.id}`}
                                            className="hover:text-slate-200 transition"
                                        >
                                            {card.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {moreCardsToShow && (
                                <a
                                    href="/"
                                    className="transition block w-full rounded-md p-1 bg-rose-100 text-rose-600 dark:text-slate-200 dark:bg-slate-700/[.3] text-center"
                                >
                                    See today's cards
                                </a>
                            )}
                        </div>
                    ) : (
                        <p>Nothing to show here.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default React.memo(Notification);
