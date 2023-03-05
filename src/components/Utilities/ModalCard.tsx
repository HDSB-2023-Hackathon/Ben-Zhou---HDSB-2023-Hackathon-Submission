import React, { useRef, useState } from "react";
import { Card } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";
import Modal from "./Modal";

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
  const year: number = today.getFullYear();
  if (day < 10) {
    day = +("0" + day);
  }
  if (month < 10) {
    month = +("0" + month);
  }

  const todayDate: string = year + "-" + month + "-" + day;
  const maxDate: string = year + 1 + "-" + month + "-" + day;

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
    return "";
  });
  const [date, setDate] = useState<string>(() => {
    if (card) {
      return card.date;
    }
    return todayDate;
  });
  const isTitleValid = useRef<Boolean>(false);
  const isDateValid = useRef<Boolean>(false);

  const [isImportant, setIsImportant] = useState<boolean>(() => {
    if (card) {
      return card.important;
    }
    return false;
  });

  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    if (card) {
      return card.completed;
    }
    return false;
  });

  const [selectedApplication, setSelectedApplication] = useState<string>(() => {
    if (card) {
      return card.dir;
    }
    return applications[0];
  });

  const addNewCardHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0;

    if (isTitleValid.current && isDateValid.current) {
      const newCard: Card = {
        title: title,
        dir: selectedApplication,
        description: description,
        date: date,
        completed: isCompleted,
        important: isImportant,
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
          Title
          <input
            type="text"
            placeholder="e.g, study for the test"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Date
          <input
            type="date"
            className="w-full"
            value={date}
            required
            onChange={({ target }) => setDate(target.value)}
            min={todayDate}
            max={maxDate}
          />
        </label>
        <label>
          Description (optional)
          <textarea
            placeholder="e.g, study for the test"
            className="w-full"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></textarea>
        </label>
        <label>
          Select a application
          <select
            className="block w-full"
            value={selectedApplication}
            onChange={({ target }) => setSelectedApplication(target.value)}
          >
            {applications.map((dir: string) => (
              <option
                key={dir}
                value={dir}
                className="bg-slate-100 dark:bg-slate-800"
              >
                {dir}
              </option>
            ))}
          </select>
        </label>
        <InputCheckbox
          isChecked={isImportant}
          setChecked={setIsImportant}
          label="Mark as important"
        />
        <InputCheckbox
          isChecked={isCompleted}
          setChecked={setIsCompleted}
          label="Mark as completed"
        />
        <button type="submit" className="btn mt-5">
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateCard;
