import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const Application: React.FC = () => {
    const cards = useAppSelector((state) => state.cards.cards);
    const applications = useAppSelector((state) => state.cards.applications);
    const params = useParams();
    const navigate = useNavigate();

    useDescriptionTitle(
        `Cards in "${params.app}"`,
        params.app ? params.app + " application" : ""
    );

    const [cardsInCurrentApplication, setCardsInCurrentApplication] = useState<
        Card[]
    >([]);

    useEffect(() => {
        const appExists = params.app ? applications.includes(params.app ? params.app : "") : false;
        if (!appExists) {
            navigate("/");
        }
        const cardsFiltered = cards.filter((card: Card) => card.app === params.app);
        setCardsInCurrentApplication(cardsFiltered);
    }, [applications, navigate, params.app, cards]);

    return (
        <LayoutRoutes
            title={params.app !== `Grades` ? `${params.app}'s Application` : `Grades`}
            cards={cardsInCurrentApplication}
        />
    );
};

export default Application;
