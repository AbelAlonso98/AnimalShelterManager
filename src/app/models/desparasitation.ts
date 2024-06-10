import { Animal } from "./animals";

export interface Desparasitation {
    id: string;
    animal: Animal;
    desparasitationType: string;
    desparasitationDate: Date;
}