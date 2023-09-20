export interface Patient {
    id: number;
    name: string;
    date_of_birth: string;
    gender: string;
    services: string[] | string;
    general_comments: string;
}