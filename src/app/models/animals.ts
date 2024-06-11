export interface Animal {
    id?: string;
    name: string;
    species: string;
    chip_number: string;
    kennel?: string;
    birth_date: Date;
    entry_date: Date;
    passport?: string;
    neutered?: boolean;
    ppp?: boolean;
}