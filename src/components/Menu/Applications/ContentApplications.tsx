import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { cardsActions } from "../../../store/Cards.store";
import ModalApplication from "../../Utilities/ModalApplication";
import ItemApplication from "./ItemApplication";
import { RootState } from "../../../store";

const ContentApplications: React.FC<{ classActive: string }> = ({
    classActive,
}) => {
    const applications = useAppSelector((store: RootState) => store.cards.applications);
    const [modalDirIsShown, setModalDirIsShown] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const createNewApplicationHandler = (inputValue: string) => {
        const newApplicationName: string = inputValue.trim();

        if (newApplicationName.length === 0) return;

        const applicationDoesNotExist = applications.every(
            (app: string) => app !== newApplicationName
        );

        if (applicationDoesNotExist) {
            dispatch(cardsActions.createApplication(newApplicationName));
        }
    };

    const closeModalApplicationHandler = () => {
        setModalDirIsShown(false);
    };

    return (
        <>
            {modalDirIsShown && (
                <ModalApplication
                    onClose={closeModalApplicationHandler}
                    onConfirm={createNewApplicationHandler}
                    btnText="Create"
                    title="Create New Application"
                />
            )}

            <ul className="max-h-36 overflow-auto">
                {applications.map((app: string) => (
                    <ItemApplication key={app} classActive={classActive} app={app} />
                ))}
            </ul>
            <div className="flex justify-center ml-0 mr-9">
                <button
                    onClick={() => setModalDirIsShown(true)}
                    className="px-3 py-1 border-slate-300 dark:border-slate-700 border-2 ml-9 mt-2 rounded-md border-dashed hover:text-violet-500"
                >
                    New University Application
                </button>
            </div>
        </>
    );
};

export default ContentApplications;
