import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { cardsActions } from "../../../store/Cards.store";
import { ReactComponent as Trash } from "../../../assets/trash.svg";
import { ReactComponent as Edit } from "../../../assets/edit.svg";
import ModalConfirm from "../../Utilities/ModalConfirm";
import ModalApplication from "../../Utilities/ModalApplication";

const ItemApplication: React.FC<{ app: string; classActive: string }> = ({
    app,
    classActive,
}) => {
    const route = useLocation();
    const currentPath = route.pathname;

    const dispatch = useAppDispatch();

    const [modalIsShown, setModalIsShown] = useState<boolean>(false);
    const [modalDirIsShown, setModalDirIsShown] = useState<boolean>(false);

    const closeModalApplicationHandler = () => {
        setModalDirIsShown(false);
    };

    const deleteApplicationHandler = () => {
        dispatch(cardsActions.deleteApplication(app));
    };

    const confirmEditDirNameHandler = (appName: string) => {
        dispatch(
            cardsActions.editApplicationName({
                previousDirName: app,
                newDirName: appName,
            })
        );
    };

    return (
        <>
            {modalDirIsShown && (
                <ModalApplication
                    onClose={closeModalApplicationHandler}
                    onConfirm={confirmEditDirNameHandler}
                    appName={app}
                    title="Edit University"
                    btnText="Edit"
                />
            )}
            {modalIsShown && (
                <ModalConfirm
                    onClose={() => setModalIsShown(false)}
                    onConfirm={deleteApplicationHandler}
                    text="This application and all its data will be deleted."
                />
            )}
            <li
                className={`flex items-center pr-4 pl-9 py-2 itemApplication ${
                    currentPath === "/application/" + app ? classActive : ""
                }`}
            >
                <NavLink
                    to={`/application/${app}`}
                    title={app}
                    className="hover:text-rose-600 dark:hover:text-slate-200 transition text-ellipsis whitespace-nowrap overflow-hidden max-w-[18rem]"
                >
                    {app}
                </NavLink>

                {app !== "Grades" && (
                    <div className="ml-auto buttonsDir">
                        <button
                            title="edit university name"
                            onClick={() => setModalDirIsShown(true)}
                        >
                            <Edit className="w-5 h-5 mr-2" />
                        </button>
                        <button
                            title="Delete"
                            onClick={() => setModalIsShown(true)}
                        >
                            <Trash className="w-5 h-5 fill-rose-500" />
                        </button>
                    </div>
                )}
            </li>
        </>
    );
};

export default ItemApplication;
