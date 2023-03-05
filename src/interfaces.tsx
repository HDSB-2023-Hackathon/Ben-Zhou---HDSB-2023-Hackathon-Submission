export interface Task {
    title: string;
    dir: string;
    description: string;
    date: string;
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