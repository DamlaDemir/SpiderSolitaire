<template>
  <div class="header-item">
    <img :src="getIcon(icon)" class="header-item-icon" id="buttonIcon" />
    <div class="header-item-text button" @click="onClick">
      {{ text }}
    </div>
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
}

.button:hover {
  cursor: pointer;
}
</style>
