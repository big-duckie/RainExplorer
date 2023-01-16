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

Modal(:item="focusedItem", :open="modalActive", @close="modalActive = false")

footer.container
  .grid
    small Built by Big Duckie
    div
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
    }
  },
  watch: {
    title() {
      document.title = this.title;
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