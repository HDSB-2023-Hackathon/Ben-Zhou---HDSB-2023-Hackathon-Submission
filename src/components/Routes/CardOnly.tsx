import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const CardOnly: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const cards = useAppSelector((store) => store.cards.cards);

    const [matchedCard, setMatchedCard] = useState<Card[]>([]);

    useEffect(() => {
        const cardId = params.cardId;
        const filteredCard = cards.filter((card: Card) => cardId === card.id);
        if (!filteredCard.length) {
            navigate("/");
        }
        setMatchedCard(filteredCard);
    }, [navigate, params.cardId, cards]);

    const title = matchedCard.length ? matchedCard[0].title : "";

    useDescriptionTitle(`Searching for ${title}`, "Card " + title);

    return <LayoutRoutes title={title} cards={matchedCard} />;
};

export default CardOnly;
