import { Animal } from "./animals";

export interface Vaccine {
    id: string;
    animal: Animal;
    vaccineType: string;
    vaccineDate: Date;
    expirationDate: Date;
}