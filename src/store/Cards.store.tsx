import {
    Action,
    createSlice,
    Dispatch,
    MiddlewareAPI,
    PayloadAction,
} from "@reduxjs/toolkit";
import { Card, Grade } from "../interfaces";

const defaultCards: Card[] = [
    {
        title: "Card 1",
        important: false,
        description: "This is the description for this card",
        app: "Grades",
        completed: true,
        id: "t1",
    },
    {
        title: "Card 2",
        important: true,
        description: "This is the description for this card",
        app: "Grades",
        completed: true,
        id: "t2",
    },
    {
        title: "Card 3",
        important: false,
        description: "This is the description for this card",
        app: "Grades",
        completed: false,
        id: "t3",
    },
];

const defaultGrades: Grade[] = [
    {
        course: "English",
        grade: 80,
        completed: true,
        id: "g1",
    },
    {
        course: "Advanced Functions",
        grade: 80,
        completed: true,
        id: "g1",
    },
    {
        course: "Physics",
        grade: 80,
        completed: true,
        id: "g1",
    },
    {
        course: "Chemistry",
        grade: 80,
        completed: true,
        id: "g1",
    },
    {
        course: "Biology",
        grade: 80,
        completed: true,
        id: "g1",
    },
    {
        course: "French",
        grade: 80,
        completed: true,
        id: "g1",
    },
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
