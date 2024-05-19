import { Adopter } from "./adopter";
import { Animal } from "./animals";

export interface Adoption {
    id?: string;
    animal: Animal;
    adopter: Adopter;

}