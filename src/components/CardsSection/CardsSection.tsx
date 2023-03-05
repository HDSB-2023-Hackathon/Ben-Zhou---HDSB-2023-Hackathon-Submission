import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Application from "../Routes/Application";
import Home from "../Routes/Home";
import CardOnly from "../Routes/CardOnly";

import HeaderCards from "./HeaderCards";

const CardsSection: React.FC = () => {
    return (
        <main className=" pt-5 pb-8 sm:pb-16 px-3 md:px-8 md:w-full xl:w-8/12 m-auto min-h-screen">
            <HeaderCards />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/application/:app" element={<Application />} />
                <Route path="/card/:cardId" element={<CardOnly />} />
                <Route path="*" element={<Navigate to="" />} />
            </Routes>
        </main>
    );
};

export default CardsSection;
