export interface Card {
    title: string;
    dir: string;
    description: string;
    completed: boolean;
    important: boolean;
    id: string;
}

export interface Grade {
    course: string;
    grade: number;
    completed: boolean;
    id: string;
}