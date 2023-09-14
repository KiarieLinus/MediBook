export interface Patient {
    id: number;
    name: string;
    date_of_birth: string;
    gender: string | number;
    services: string[] | string;
    general_comments: string;
    most_visits: number;
}