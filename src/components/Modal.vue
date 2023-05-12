<template lang="pug">
dialog(ref="dialog", @click="close")
  article
    a(aria-label="Wiki", class="wiki", :href="wikiLink", target="_blank")
    a(aria-label="Close", class="close", href="#", @click="$emit('close')")
    aside
      img(:src="imageURL")
      .headings
        h2 {{item.name}}
        h3 {{item.description}}
      div(v-html="item.info_markdown")
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ItemClass} from "@/assets/scripts/classes";

export default defineComponent({
  name: "Modal",
  props: {
    item: {
      type: [ItemClass, Object],
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    wikiLink(): string {
      return `https://riskofrain2.fandom.com/wiki/${this.item.name}`;
    },
    imageURL(): string {
      return new URL(`/src/assets/images/items/${this.item.slug}.png`, import.meta.url).href;
    }
  },
  watch: {
    visible(newVisible: Boolean) {
      if (newVisible) {
        this.openModal();
      } else {
        this.closeModal();
      }
    }
  },
  methods: {
    close(event: Event) {
      if ((event.target as Element).tagName === "DIALOG") {
        this.$emit("close");
      }
    },
    openModal() {
      let dialog = (this.$refs.dialog as Element);
      dialog.classList.add("open", "opening");
      setTimeout(() => {
        dialog.classList.remove("opening");
      }, 250);
      dialog.setAttribute("open", "open");
    },
    closeModal() {
      let dialog = (this.$refs.dialog as Element);
      dialog.classList.add("closing");
      setTimeout(() => {
        dialog.classList.remove("closing", "open");
        dialog.removeAttribute("open");
      }, 250);
    }
  },
  mounted() {
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && this.visible) {
        this.$emit("close");
      }
    });
  }
});
</script>

<style scoped lang="scss">
dialog {
  &.opening, &.closing {
    animation: fadeModel ease both 0.1s;
  }

  &.closing {
    animation-direction: reverse;
  }

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

@keyframes fadeModel {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>