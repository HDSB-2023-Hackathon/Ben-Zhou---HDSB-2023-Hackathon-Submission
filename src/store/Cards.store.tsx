import {
    Action,
    createSlice,
    Dispatch,
    MiddlewareAPI,
    PayloadAction,
} from "@reduxjs/toolkit";
import { Card } from "../interfaces";

const defaultCards: Card[] = [
    {
        type: "Grade",
        title: "English",
        important: false,
        description: "This course focuses on developing skills in reading, writing, and communication in the English language. Students will analyze literature, practice various writing styles, and learn effective communication strategies.",
        app: "Grades",
        completed: true,
        color: "bg-red-500",
        id: "g1",
    },
    {
        type: "Grade",
        title: "Advanced Functions",
        important: true,
        description: "This course is designed to deepen students' understanding of functions and their applications. Students will study polynomial, rational, logarithmic, and exponential functions, as well as sequences and series, and use them to model real-world situations.",
        app: "Grades",
        completed: true,
        color: "bg-blue-500",
        id: "g2",
    },
    {
        type: "Grade",
        title: "Physics",
        important: false,
        description: "Physics is the study of the fundamental laws of nature and their applications to the world around us. Students will learn about mechanics, energy, electricity and magnetism, waves and optics, and modern physics.",
        app: "Grades",
        completed: false,
        color: "bg-green-500",
        id: "g3",
    },
    {
        type: "Grade",
        title: "Chemistry",
        important: false,
        description: "Chemistry is the study of matter and its properties, as well as the interactions between different types of matter. Students will learn about atomic structure, chemical bonding, stoichiometry, thermodynamics, and kinetics, and explore the applications of chemistry in everyday life.",
        app: "Grades",
        completed: true,
        color: "bg-yellow-500",
        id: "g4",
    },
    {
        type: "Grade",
        title: "Biology",
        important: true,
        description: "Biology is the study of living organisms and their interactions with the environment. Students will learn about cells, genetics, evolution, ecology, and human biology, and examine the impact of biological processes on society.",
        app: "Grades",
        completed: true,
        color: "bg-purple-500",
        id: "g5",
    },
    {
        type: "Grade",
        title: "French",
        important: false,
        description: "This course is designed to develop students' proficiency in the French language. Students will learn about the French culture and explore the French-speaking world through a variety of activities, including reading, writing, speaking, and listening.",
        app: "Grades",
        completed: false,
        color: "bg-pink-500",
        id: "g6",
    }
];

const getSavedApplications = (): string[] => {
    let appList: string[] = [];
    if (localStorage.getItem("applications")) {
        appList = JSON.parse(localStorage.getItem("applications")!);
        const gradesExists = appList.some((app: string) => app === "Grades");
        if (!gradesExists) {
            appList.push("Grades");
        }
    } else {
        appList.push("Grades");
    }

    if (localStorage.getItem("cards")) {
        const savedCardsList = JSON.parse(localStorage.getItem("cards")!);
        let appNotSaved: string[] = [];
        savedCardsList.forEach((card: Card) => {
            if (!appList.includes(card.app)) {
                if (!appNotSaved.includes(card.app)) {
                    appNotSaved.push(card.app);
                }
            }
        });
        appList = [...appList, ...appNotSaved];
    }
    return appList;
};

const initialState: {
    cards: Card[];
    applications: string[];
} = {
    cards: localStorage.getItem("cards")
        ? JSON.parse(localStorage.getItem("cards")!)
        : defaultCards,
    applications: getSavedApplications(),
};

const cardsSlice = createSlice({
    name: "cards",
    initialState: initialState,
    reducers: {
        addNewCard(state, action: PayloadAction<Card>) {
            state.cards = [action.payload, ...state.cards];
        },
        removeCard(state, action) {
            const newCardsList = state.cards.filter(
                (card) => card.id !== action.payload
            );
            state.cards = newCardsList;
        },
        markAsImportant(state, action: PayloadAction<string>) {
            const newCardFavorited = state.cards.find(
                (card) => card.id === action.payload
            );
            newCardFavorited!.important = !newCardFavorited!.important;
        },
        editCard(state, action: PayloadAction<Card>) {
            const cardId = action.payload.id;

            const newCardEdited: Card = state.cards.find(
                (card: Card) => card.id === cardId
            )!;
            const indexCard = state.cards.indexOf(newCardEdited);
            state.cards[indexCard] = action.payload;
        },
        toggleCardCompleted(state, action: PayloadAction<string>) {
            const cardId = action.payload;

            const currCard = state.cards.find((card) => card.id === cardId)!;

            currCard.completed = !currCard.completed;
        },
        deleteAllData(state) {
            state.cards = [];
            state.applications = ["Grades"];
        },
        createApplication(state, action: PayloadAction<string>) {
            const newApplication: string = action.payload;
            const applicationAlreadyExists = state.applications.includes(newApplication);
            if (applicationAlreadyExists) return;
            state.applications = [newApplication, ...state.applications];
        },
        deleteApplication(state, action: PayloadAction<string>) {
            const appName = action.payload;

            state.applications = state.applications.filter((app) => app !== appName);
            state.cards = state.cards.filter((card) => card.app !== appName);
        },
        editApplicationName(
            state,
            action: PayloadAction<{ newDirName: string; previousDirName: string }>
        ) {
            const newDirName: string = action.payload.newDirName;
            const previousDirName: string = action.payload.previousDirName;
            const applicationAlreadyExists = state.applications.includes(newDirName);
            if (applicationAlreadyExists) return;

            const appIndex = state.applications.indexOf(previousDirName);

            state.applications[appIndex] = newDirName;
            state.cards.forEach((card) => {
                if (card.app === previousDirName) {
                    card.app = newDirName;
                }
            });
        },
    },
});

export const cardsActions = cardsSlice.actions;
export default cardsSlice.reducer;

export const cardsMiddleware =
    (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
        const nextAction = next(action);
        const actionChangeOnlyApplications =
            cardsActions.createApplication.match(action);

        const isAApplicationAction: boolean = action.type
            .toLowerCase()
            .includes("application");

        if (action.type.startsWith("cards/") && !actionChangeOnlyApplications) {
            const cardsList = store.getState().cards.cards;
            localStorage.setItem("cards", JSON.stringify(cardsList));
        }
        if (action.type.startsWith("cards/") && isAApplicationAction) {
            const appList = store.getState().cards.applications;
            localStorage.setItem("applications", JSON.stringify(appList));
        }

        if (cardsActions.deleteAllData.match(action)) {
            localStorage.removeItem("cards");
            localStorage.removeItem("applications");
            localStorage.removeItem("darkmode");
        }

        if (cardsActions.removeCard.match(action)) {
            console.log(JSON.parse(localStorage.getItem("cards")!));
            if (localStorage.getItem("cards")) {
                const localStorageCards = JSON.parse(localStorage.getItem("cards")!);
                if (localStorageCards.length === 0) {
                    localStorage.removeItem("cards");
                }
            }
        }
        return nextAction;
    };