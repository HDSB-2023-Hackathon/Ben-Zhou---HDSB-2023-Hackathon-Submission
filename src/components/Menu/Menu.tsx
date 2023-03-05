import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { menusActions } from "../../store/Menu.store";
import BtnAddCard from "../Utilities/BtnAddCard";
import Applications from "./Applications/Applications";
import LayoutMenus from "../Utilities/LayoutMenus";
import { RootState } from "../../store";

const classLinkActive =
    "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200";

const Menu: React.FC = () => {
    const menuOpen = useAppSelector((state: RootState) => state.menu.menuHeaderOpened);
    const dispatch = useAppDispatch();

    const closeMenuHandler = () => {
        dispatch(menusActions.closeMenuHeader());
    };
    return (
        <LayoutMenus
            menuOpen={menuOpen}
            closeMenuHandler={closeMenuHandler}
            className="left-0"
        >
            <header className="h-full flex flex-col">
                <h1 className="font-bold uppercase text-center mt-8 text-lg tracking-wide hidden xl:block">
                    UniPlanner
                </h1>
                <BtnAddCard className="my-8 mx-4" />
                <hr className="rounded"></hr>
                <Applications classActive={classLinkActive} />
            </header>
        </LayoutMenus>
    );
};

export default Menu;