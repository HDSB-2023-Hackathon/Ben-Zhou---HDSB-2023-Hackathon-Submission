import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { cardsActions } from "../../store/Cards.store";
import ModalConfirm from "../Utilities/ModalConfirm";

const DeleteCards: React.FC = () => {
    const dispatch = useAppDispatch();

    const [showModal, setIsModalShown] = useState<boolean>(false);

    const deleteAllDataHandler = () => {
        dispatch(cardsActions.deleteAllData());
    };

    return (
        <>
            {showModal && (
                <ModalConfirm
                    onClose={() => setIsModalShown(false)}
                    text="All data will be deleted permanently."
                    onConfirm={deleteAllDataHandler}
                />
            )}
            <button
                className="mt-auto text-left pt-4 hover:text-rose-600 dark:hover:text-slate-200 transition self-center"
                onClick={() => setIsModalShown(true)}
            >
                Delete All Data
            </button>
        </>
    );
};

export default React.memo(DeleteCards);
