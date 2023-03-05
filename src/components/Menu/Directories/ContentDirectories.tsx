import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import ModalDirectory from "../../Utilities/ModalDirectory";
import ItemDirectory from "./ItemDirectory";
import { RootState } from "../../../store";

const ContentDirectories: React.FC<{ classActive: string }> = ({
    classActive,
}) => {
    const directories = useAppSelector((store: RootState) => store.tasks.directories);
    const [modalDirIsShown, setModalDirIsShown] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const createNewDirectoryHandler = (inputValue: string) => {
        const newDirectoryName: string = inputValue.trim();

        if (newDirectoryName.length === 0) return;

        const directoryDoesNotExist = directories.every(
            (dir: string) => dir !== newDirectoryName
        );

        if (directoryDoesNotExist) {
            dispatch(tasksActions.createDirectory(newDirectoryName));
        }
    };

    const closeModalDirectoryHandler = () => {
        setModalDirIsShown(false);
    };

    return (
        <>
            {modalDirIsShown && (
                <ModalDirectory
                    onClose={closeModalDirectoryHandler}
                    onConfirm={createNewDirectoryHandler}
                    btnText="Create"
                    title="Create New Application"
                />
            )}

            <ul className="max-h-36 overflow-auto">
                {directories.map((dir: string) => (
                    <ItemDirectory key={dir} classActive={classActive} dir={dir} />
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

export default ContentDirectories;
