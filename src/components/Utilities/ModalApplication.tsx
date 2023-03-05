import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import Modal from "./Modal";
import Unis from "./unis.json";

const ModalApplication: React.FC<{
    onClose: () => void;
    appName?: string;
    onConfirm: (newDirName: string) => void;
    btnText: string;
    title: string;
}> = ({ onClose, appName, onConfirm, btnText, title }) => {
    const applications = useAppSelector((store) => store.cards.applications);

    const [errorApplicationName, setErrorApplicationName] = useState<boolean>(false);
    const [newDirName, setNewDirName] = useState<string>(appName ? appName : "");

    const checkDirNameExists = (val: string) => {
        const applicationDoesNotExist = applications.every(
            (app: string) => app !== val
        );

        if (applicationDoesNotExist || appName === val) {
            setErrorApplicationName(false);
        } else {
            setErrorApplicationName(true);
        }
    };

    const confirmDirNameHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        if (errorApplicationName) return;
        onConfirm(newDirName);
        onClose();
    };

    return (
        <Modal onClose={onClose} title={title}>
            <form className="stylesInputsField">
                <div className="relative">
                    <label htmlFor="app-name" className="">
                        Title
                    </label>
                    <input
                        type="text"
                        id="app-name"
                        placeholder="Enter a University Name"
                        value={newDirName}
                        onChange={({ target }) => setNewDirName(target.value)}
                        className={`inputStyles block w-full`}
                        onInput={({ currentTarget }) =>
                            checkDirNameExists(currentTarget.value)
                        }
                    />
                    <select
                        className="inputStyles block w-full mv-2"
                        onChange={({ target }) => setNewDirName(target.value)}
                    >
                        <option value="Select an University">Or Select a University</option>
                        {Unis.map((uni) => (
                            <option value={uni.name}>{uni.name}</option>
                        ))}
                    </select>
                    {errorApplicationName && (
                        <div className="absolute bg-rose-500 text-slate-200 rounded-md p-2 top-full text-sm w-full font-medium z-20">
                            Application name already exists
                        </div>
                    )}
                </div>
                <button className="btn mt-6" onClick={confirmDirNameHandler}>
                    {btnText}
                </button>
            </form>
        </Modal>
    );
};

export default ModalApplication;
