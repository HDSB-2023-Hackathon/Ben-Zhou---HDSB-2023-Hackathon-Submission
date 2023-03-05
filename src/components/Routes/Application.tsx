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
        `Cards in "${params.dir}"`,
        params.dir ? params.dir + " application" : ""
    );

    const [cardsInCurrentApplication, setCardsInCurrentApplication] = useState<
        Card[]
    >([]);

    useEffect(() => {
        const dirExists = params.dir ? applications.includes(params.dir ? params.dir : "") : false;
        if (!dirExists) {
            navigate("/");
        }
        const cardsFiltered = cards.filter((card: Card) => card.dir === params.dir);
        setCardsInCurrentApplication(cardsFiltered);
    }, [applications, navigate, params.dir, cards]);

    return (
        <LayoutRoutes
            title={params.dir !== `Grades` ? `${params.dir}'s Application` : `Grades`}
            cards={cardsInCurrentApplication}
        />
    );
};

export default Application;
