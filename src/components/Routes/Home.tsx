import React from "react";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import { useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";

const Home: React.FC = () => {
    const cards = useAppSelector((state) => state.cards.cards);

    useDescriptionTitle("Organize your cards", "All cards");
    return <LayoutRoutes title="Overview" cards={cards}></LayoutRoutes>;
};

export default Home;
