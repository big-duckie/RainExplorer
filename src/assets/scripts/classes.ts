import type {Category, Rarity} from "./enums";

export class ItemClass {
    id: number;
    name: string;
    description: string;
    rarity: Rarity;
    categories: Array<Category>;
    lore: string;

    constructor(id: number, name: string, description: string, rarity: Rarity, categories: Array<Category>, lore: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rarity = rarity;
        this.categories = categories;
        this.lore = lore;
    }
}