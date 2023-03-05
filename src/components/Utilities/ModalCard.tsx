import React, { useRef, useState } from "react";
import { Card } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";
import Modal from "./Modal";
import Questions from "./questions.json";

const InputCheckbox: React.FC<{
    label: string;
    isChecked: boolean;
    setChecked: (value: React.SetStateAction<boolean>) => void;
}> = ({ isChecked, setChecked, label }) => {
    return (
        <label className="mb-0 flex items-center cursor-pointer">
            <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
                {isChecked && (
                    <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
                )}
            </div>
            <span className="order-1 flex-1">{label}</span>
            <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={() => setChecked((prev: boolean) => !prev)}
            />
        </label>
    );
};

const randomQuestion = () => {
    const random = Math.floor(Math.random() * Questions.length);
    return Questions[random];
};

const ModalCreateCard: React.FC<{
    onClose: () => void;
    card?: Card;
    nameForm: string;
    onConfirm: (card: Card) => void;
}> = ({ onClose, card, nameForm, onConfirm }) => {
    const applications = useAppSelector((state) => state.cards.applications);

    const today: Date = new Date();
    let day: number = today.getDate();
    let month: number = today.getMonth() + 1;

    if (day < 10) {
        day = +("0" + day);
    }
    if (month < 10) {
        month = +("0" + month);
    }

    const [type, setType] = useState<string>(() => {
        if (card) {
            return card.type;
        }
        return "Other";
    });

    const [description, setDescription] = useState<string>(() => {
        if (card) {
            return card.description;
        }
        return "";
    });
    const [title, setTitle] = useState<string>(() => {
        if (card) {
            return card.title;
        }
        return randomQuestion().question;
    });
    const isTitleValid = useRef<Boolean>(false);

    const [isImportant, setIsImportant] = useState<boolean>(() => {
        if (card) {
            return card.important;
        }
        return false;
    });

    const [selectedColor, setSelectedColor] = useState<string>(() => {
        if (card) {
            return card.color;
        }
        return "bg-black";
    });

    const [isCompleted, setIsCompleted] = useState<boolean>(() => {
        if (card) {
            return card.completed;
        }
        return false;
    });

    const [selectedApplication, setSelectedApplication] = useState<string>(() => {
        if (card) {
            return card.app;
        }
        return applications[0];
    });

    const addNewCardHandler = (event: React.FormEvent): void => {
        event.preventDefault();

        isTitleValid.current = title.trim().length > 0;

        if (isTitleValid.current) {
            const newCard: Card = {
                type: type,
                title: title,
                app: selectedApplication,
                description: description,
                completed: isCompleted,
                important: isImportant,
                color: selectedColor,
                id: card?.id ? card.id : Date.now().toString(),
            };
            onConfirm(newCard);
            onClose();
        }
    };
    return (
        <Modal onClose={onClose} title={nameForm}>
            <form
                className="flex flex-col stylesInputsField"
                onSubmit={addNewCardHandler}
            >
                <label>
                    Card Type
                    <select 
                        className="block w-full"
                        onChange={({ target }) => setType(target.value)}
                        value={type}
                    >
                        <option value="Grade" className="bg-slate-100 dark:bg-slate-800">
                            Grade
                        </option>
                        <option value="Application Question" className="bg-slate-100 dark:bg-slate-800">
                            Application Question
                        </option>
                        <option value="Extra Curricular" className="bg-slate-100 dark:bg-slate-800">
                            Extra Curricular
                        </option>
                        <option value="Other" className="bg-slate-100 dark:bg-slate-800">
                            Other
                        </option>
                    </select>
                </label>
                <label>
                    Title
                    <input
                        type="text"
                        placeholder="Card Title"
                        required
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        className="w-full"
                    />
                </label>
                <label>
                    Description (optional)
                    <textarea
                        placeholder="A Description"
                        className="w-full"
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                    ></textarea>
                </label>
                <label>
                    Select an Application
                    <select
                        className="block w-full"
                        value={selectedApplication}
                        onChange={({ target }) => setSelectedApplication(target.value)}
                    >
                        {applications.map((app: string) => (
                            <option
                                key={app}
                                value={app}
                                className="bg-slate-100 dark:bg-slate-800"
                            >
                                {app}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Color
                    <select 
                        className="block w-full"
                        value={selectedColor}
                        onChange={({ target }) => setSelectedColor(target.value)}
                    >
                        <option value="bg-red-500" className="text-rose-500">
                            Red
                        </option>
                        <option value="bg-blue-500" className="text-blue-500">
                            Blue
                        </option>
                        <option value="bg-green-500" className="text-green-500">
                            Green
                        </option>
                        <option value="bg-yellow-500" className="text-yellow-500">
                            Yellow
                        </option>
                        <option value="bg-purple-500" className="text-purple-500">
                            Purple
                        </option>
                        <option value="bg-pink-500" className="text-pink-500">
                            Pink
                        </option>
                        <option value="bg-black" className="text-black">
                            Black
                        </option>
                    </select>
                </label>
                <InputCheckbox
                    isChecked={isImportant}
                    setChecked={setIsImportant}
                    label="Mark as Important"
                />
                <InputCheckbox
                    isChecked={isCompleted}
                    setChecked={setIsCompleted}
                    label="Mark as Completed"
                />
                <button type="submit" className="btn mt-5">
                    {nameForm}
                </button>
            </form>
        </Modal>
    );
};

export default ModalCreateCard;