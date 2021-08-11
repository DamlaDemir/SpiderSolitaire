<template>
  <div class="header-item">
    <img src="@/assets/images/icons/score.svg" class="header-item-icon" />
    <div class="header-item-text score">{{ score }}</div>
  </div>
</template>

<script>
export default {
  name: "Score",
  props: {
    score: {
      type: Number,
      require: true,
    },
  },
};
</script>

<style>
.score {
  min-width: 5.5vw;
}
</style>
