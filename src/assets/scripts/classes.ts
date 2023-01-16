import type {Category, Rarity} from "./enums";
import slugify from "slugify";

export class ItemClass {
    id: number;
    name: string;
    description: string;
    rarity: Rarity;
    categories: Array<Category>;
    stats: Array<StatClass>;
    lore: string;

    constructor(id: number, name: string, description: string, rarity: Rarity, categories: Array<Category>, stats: Array<StatClass>, lore: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rarity = rarity;
        this.categories = categories;
        this.stats = stats;
        this.lore = lore;
    }

    slug(): string {
        return slugify(this.name, {lower: true});
    }
}

export class StatClass {
    stat: string;
    value: string;
    stack: string;
    additional: string;

    constructor(stat: string, value: string, stack: string, additional: string) {
        this.stat = stat;
        this.value = value;
        this.stack = stack;
        this.additional = additional;
    }
}