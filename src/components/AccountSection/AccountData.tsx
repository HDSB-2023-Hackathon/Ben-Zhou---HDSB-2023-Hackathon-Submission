import React from "react";
import avatar1 from "../../assets/avatar-1.jpg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { menusActions } from "../../store/Menu.store";
import LayoutMenus from "../Utilities/LayoutMenus";
import DarkMode from "./DarkMode";
import DeleteTasks from "./DeleteTasks";
import TasksDone from "./TasksDone";
import { RootState } from "../../store";

const AccountData: React.FC = () => {
    const menuOpen = useAppSelector((state: RootState) => state.menu.menuAccountOpened);

    const dispatch = useAppDispatch();

    const closeMenuHandler = () => {
        dispatch(menusActions.closeMenuAccount());
    };

    return (
        <LayoutMenus
            menuOpen={menuOpen}
            closeMenuHandler={closeMenuHandler}
            className="top-0 right-0 "
        >
            <section className="p-5 flex flex-col h-full">
                <span className="flex items-center mx-auto">
                    <span className="font-medium">UniPlanner</span>
                </span>

                <DarkMode />

                <TasksDone />
                <DeleteTasks />
                <a
                    href="https://github.com/https://github.com/HDSB-2023-Hackathon"
                    className="mt-4 bg-rose-100 p-2 rounded-md text-rose-600 text-center transition hover:bg-rose-200 dark:bg-slate-700/[.3] dark:text-slate-200"
                >
                    Made for the HDSB 2023 Hackathon
                </a>
            </section>
        </LayoutMenus>
    );
};

export default AccountData;
