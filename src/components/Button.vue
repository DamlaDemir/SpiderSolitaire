<template>
  <div class="header-item">
    <img :src="getIcon(icon)" :class="`header-item-icon ${icon}-icon`" />
    <button
      class="header-item-text button"
      @click="onClick"
      :id="`${icon}-button`"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    icon: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
    getIcon(icon) {
      return require(`@/assets/images/icons/${icon}.svg`);
    },
  },
};
</script>

<style>
.button {
  min-width: 5.5vw;
  color: inherit;
  font-size: inherit;
  letter-spacing: inherit;
}
</style>
