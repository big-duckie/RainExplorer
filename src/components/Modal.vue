<template lang="pug">
dialog(:open="open", @click="event => {if (event.target.tagName === \"DIALOG\") $emit(\"close\");}")
  article
    a(aria-label="Wiki", class="wiki", :href="wikiLink", title="View item on Risk of Rain 2 Wiki", target="_blank")
    a(aria-label="Close", class="close", href="#", @click="$emit('close')")
    aside
      img(:src="`/src/assets/images/items/${slug}.png`")
      .headings
        h2 {{item.name}}
        h3 {{item.description}}
      p More information about what this item does.
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ItemClass} from "@/assets/scripts/classes";
import slugify from "slugify";

export default defineComponent({
  name: "Modal",
  props: {
    item: {
      type: ItemClass,
      required: true
    },
    open: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    wikiLink(): string {
      return `https://riskofrain2.fandom.com/wiki/${this.item.name}`;
    },
    slug(): string {
      return slugify(this.item.name, {lower: true});
    }
  },
  mounted() {
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && this.open) {
        this.$emit("close");
      }
    });
  }
});
</script>

<style scoped lang="scss">
dialog {
  article {
    min-width: 33vw;

    a.wiki {
      display: block;
      width: 1rem;
      height: 1rem;
      margin-top: calc(var(--block-spacing-vertical) * -0.5);
      margin-bottom: var(--typography-spacing-vertical);
      margin-right: auto;
      float: left;
      background-image: var(--icon-globe);
      background-position: center;
      background-size: auto 1rem;
      background-repeat: no-repeat;
      opacity: 0.5;
      transition: opacity var(--transition);

      &:hover {
        opacity: 1;
      }
    }

    aside {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;

      .headings {
        * {
          text-align: center;
        }

        h2 {
          font-size: 1.25rem;
        }
      }
    }
  }
}
</style>