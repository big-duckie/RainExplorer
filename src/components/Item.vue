<template lang="pug">
.item(@click="$emit('modal', item)")
  .icon(:data-tooltip="item.name"
    :data-item="slug"
    :style="{'--bg-image': `url('/src/assets/images/items/${slug}.png')`}")
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