export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: string;
  services: string[] | string;
  generalComments: string;
}
