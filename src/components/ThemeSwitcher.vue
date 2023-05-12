<template lang="pug">
button(@click="ToggleTheme")
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ThemeSwitcher",
  methods: {
    ToggleTheme() {
      if (document.documentElement.getAttribute("data-theme") == "dark") {
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    }
  }
});
</script>

<style scoped lang="scss">
button {
  animation: fadeIn ease 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  position: fixed;
  bottom: var(--spacing);
  right: calc(var(--spacing) + var(--scrollbar-width, 0px));
  width: auto;
  margin-bottom: 0;
  padding: .75rem;
  border-radius: 2rem;
  box-shadow: var(--card-box-shadow);
  line-height: 1;

  --background-color: var(--contrast);
  --border-color: var(--contrast);
  --color: var(--contrast-inverse);

  &::after {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: .15rem solid currentColor;
    border-radius: 50%;
    background: linear-gradient(to right, currentColor 0, currentColor 50%, transparent 50%);
    content: "";
    vertical-align: bottom;
    transition: transform var(--transition);
  }

  &:hover, &:active, &:focus {
    --background-color: var(--contrast);
    --border-color: var(--contrast);
    --color: var(--contrast-inverse);
  }

  &:hover {
    &::after {
      transform: rotate(180deg);
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>