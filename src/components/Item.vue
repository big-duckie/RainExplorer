<template lang="pug">
.item(@click="$emit('modal', item)")
  .icon(:data-tooltip="item.name"
    :data-item="slug"
    :style="{'--bg-image': `url(${imageURL})`}")
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ItemClass} from "@/assets/scripts/classes";
import slugify from "slugify";

export default defineComponent({
  name: "Item",
  props: {
    item: {
      type: ItemClass,
      required: true
    }
  },
  computed: {
    slug(): string {
      return slugify(this.item.name, {lower: true, remove: /[*+~.()'"!:@,]/g});
    },
    imageURL(): string {
      return new URL(`/src/assets/images/items/${this.slug}.png`, import.meta.url).href;
    }
  }
});
</script>

<style scoped lang="scss">
  .item {
    .icon {
      border: none !important;
      cursor: pointer !important;
      height: 64px;
      width: 64px;
      background-size: contain;
      background-image: var(--bg-image);
    }

    dialog {
      aside {
        display: flex;
        flex-direction: column;

      }
    }
  }
</style>