export type Priority =
    | "Critical"
    | "High"
    | "Medium"
    | "Low";

export interface TestIdea {

    id: string;

    title: string;

    description: string;

    priority: Priority;

    category: string;

}