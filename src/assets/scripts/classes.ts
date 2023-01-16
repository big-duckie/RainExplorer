import type {Category, Rarity, DLC} from "./enums";
import slugify from "slugify";
import {marked} from "marked";

export class ItemClass {
    id: number;
    name: string;
    description: string;
    info: string;
    rarity: Rarity;
    categories: Array<Category>;
    stats: Array<StatClass>;
    dlc: DLC
    lore: string;

    constructor(id: number, name: string, description: string, info: string, rarity: Rarity, categories: Array<Category>, stats: Array<StatClass>, dlc: DLC, lore: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.info = info;
        this.rarity = rarity;
        this.categories = categories;
        this.stats = stats;
        this.dlc = dlc;
        this.lore = lore;
    }

    get info_markdown(): string {
        return (this.info) ? marked.parse(this.info) : "";
    }

    get slug(): string {
        return slugify(this.name, {lower: true, remove: /[*+~.()'"!:@,]/g});
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