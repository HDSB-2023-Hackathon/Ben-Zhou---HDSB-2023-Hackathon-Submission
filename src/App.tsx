import React from "react";
import AccountData from "./components/AccountSection/AccountData";
import Footer from "./components/Footer";
import Menu from "./components/Menu/Menu";
import CardsSection from "./components/CardsSection/CardsSection";
import ModalCreateCard from "./components/Utilities/ModalCard";
import { Card } from "./interfaces";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { modalActions } from "./store/Modal.store";
import { cardsActions } from "./store/Cards.store";
import { RootState } from "./store";

const App: React.FC = () => {
    const modal = useAppSelector((state: RootState) => state.modal);

    const dispatch = useAppDispatch();

    const closeModalCreateCard = () => {
        dispatch(modalActions.closeModalCreateCard());
    };

    const createNewCardHandler = (card: Card) => {
        dispatch(cardsActions.addNewCard(card));
    };

    return (
        <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
            {modal.modalCreateCardOpen && (
                <ModalCreateCard
                    onClose={closeModalCreateCard}
                    nameForm="Add Card"
                    onConfirm={createNewCardHandler}
                />
            )}
            <Menu />
            <CardsSection />
            <Footer />
            <AccountData />
        </div>
    );
};

export default App;
