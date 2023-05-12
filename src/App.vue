<template lang="pug">
header.container
  .headings
    h2 Rain Explorer
    h3 Item database for Risk of Rain 2
  form
    input(type="text", placeholder="Search...", v-model="search")
    .grid
      select(v-model.number="rarityFilter")
          each val, index in ["All Rarities", "Common", "Uncommon", "Legendary", "Boss", "Lunar", "Void", "Equipment"]
            option(value=index)= val
      select(v-model.number="categoryFilter")
          each val, index in ["All Categories", "Damage", "Healing", "Scrap", "Utility"]
            option(value=index)= val
      select(v-model.number="sortOrder")
          each val, index in ["Default", "A-Z"]
            option(value=index)= val

main.container
  .main-grid
    Item(v-for="item in searchItems", :item="item", @modal="(i) => {focusedItem = i; modalActive = true;}")

Modal(:item="focusedItem", :visible="modalActive", @close="modalActive = false")

footer.container
  .grid
    small
      a(href="https://github.com/big-duckie/RainExplorer") GitHub
    small Assets are property of Hopoo Games

ThemeSwitcher
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Category, Rarity, Sort} from "@/assets/scripts/enums";
import {ItemClass} from "@/assets/scripts/classes";
import items from "@/items.json"
import Item from "@/components/Item.vue";
import Modal from "@/components/Modal.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import {plainToInstance} from "class-transformer";

function normalizeString(str: string): string {
  return str.normalize("NFD").toLowerCase();
}

function convertItems(): Array<ItemClass> {
  let arr: Array<ItemClass> = [];
  items.forEach((item) => {
    arr.push(plainToInstance(ItemClass, item))
  })
  return arr
}

export default defineComponent({
  components: {ThemeSwitcher, Modal, Item},
  data() {
    return {
      title: "Rain Explorer",
      items: convertItems(),
      focusedItem: items[0],
      modalActive: false,
      search: "",
      rarityFilter: Rarity.All,
      categoryFilter: Category.All,
      sortOrder: Sort.Default
    }
  },
  computed: {
    sortedItems(): Array<ItemClass> {
      if (Number(this.sortOrder) == Sort.Default) return this.items;
      return this.items.map(item => item).sort((itemA: ItemClass, itemB: ItemClass) => {
        if (Number(this.sortOrder) == Sort.Alphabetic) return itemA.slug.localeCompare(itemB.slug);
        return (itemA.id > itemB.id) ? 1 : (itemA.id < itemB.id) ? -1 : 0;
      });
    },
    searchItems(): Array<ItemClass> {
      const search = normalizeString(this.search).split(",")
        .map(term => term.trim())
        .filter(term => term.length > 0);

      return this.sortedItems.filter((item: ItemClass) => {
        return (this.rarityFilter == Rarity.All || item.rarity == this.rarityFilter) && (this.categoryFilter == Category.All || item.categories.indexOf(this.categoryFilter) != -1) &&
          search.length == 0 || search.some((term: string) => normalizeString(item.name).includes(term));
      })
    },
  },
  methods: {
    RarityToString(rarity: Rarity): string {
      // On compile rarity becomes a number.
      return Rarity[rarity].toString();
    },
    StringToRarity(str: string): Rarity {
      return (Object.keys(Rarity).includes(str)) ? (<any>Rarity)[<any>str] : Rarity.All;
    },
    CategoryToString(category: Category): string {
      // On compile rarity becomes a number.
      return Category[category].toString();
    },
    StringToCategory(str: string): Category {
      return (Object.keys(Category).includes(str)) ? (<any>Category)[<any>str] : Category.All;
    },
    OrderToString(order: Sort): string {
      // On compile rarity becomes a number.
      return Sort[order].toString();
    },
    StringToOrder(str: string): Sort {
      return (Object.keys(Sort).includes(str)) ? (<any>Sort)[<any>str] : Sort.Default;
    },
  },
  watch: {
    title() {
      document.title = this.title;
    },
    search() {
      let hash = new URLSearchParams(window.location.hash.substring(1));
      if (this.search != "") hash.set("q", this.search); else hash.delete("q");
      window.location.hash = `#${hash.toString()}`;
    },
    rarityFilter() {
      let hash = new URLSearchParams(window.location.hash.substring(1));
      if (this.rarityFilter != Rarity.All) hash.set("r", this.RarityToString(this.rarityFilter)); else hash.delete("r");
      window.location.hash = `#${hash.toString()}`;
    },
    categoryFilter() {
      let hash = new URLSearchParams(window.location.hash.substring(1));
      if (this.categoryFilter != Category.All) hash.set("c", this.CategoryToString(this.categoryFilter)); else hash.delete("c");
      window.location.hash = `#${hash.toString()}`;
    },
    sortOrder() {
      let hash = new URLSearchParams(window.location.hash.substring(1));
      if (this.sortOrder != Sort.Default) hash.set("s", this.OrderToString(this.sortOrder)); else hash.delete("s");
      window.location.hash = `#${hash.toString()}`;
    }
  },
  mounted() {
    if (window.location.hash != "") {
      let params = new URLSearchParams(window.location.hash.substring(1));
      this.search = params.get("q") || "";
      this.rarityFilter = this.StringToRarity(params.get("r") || "");
      this.categoryFilter = this.StringToCategory(params.get("c") || "");
      this.sortOrder = this.StringToOrder(params.get("s") || "");
    }
  }
});
</script>

<style scoped lang="scss">
header {
  padding: var(--spacing);

  h2, h3 {
    text-align: center;
  }
}

main {
  flex-grow: 1;
}

.main-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

footer {
  padding: var(--spacing);

  * {
    text-align: center;

    &:first-child {
      text-align: left;
    }

    &:last-child {
      text-align: right;
    }
  }
}
</style>

<style lang="scss">
gray {
  color: rgb(137, 144, 167);
}

damage {
  color: rgb(229, 201, 98);
}

utility {
  color: rgb(149, 205, 229);
}

heal {
  color: rgb(156, 229, 98);
}

health {
  color: rgb(229, 130, 98);
}

void {
  color: rgb(237, 127, 205);
}
</style>