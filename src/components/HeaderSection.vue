<template>
  <div class="header-section">
    <div class="header-item-section">
      <Button
        icon="restart"
        text="RESTART"
        @onClick="$emit('openConfirmBox')"
      />
      <Button icon="hint" text="HINT" @onClick="$emit('getHints')" />
    </div>
    <div class="header-text">ONE SUIT SOLITAIRE</div>
    <div class="header-item-section">
      <score :score="score" />
      <timer @setTotalTime="setTotalTime" :isGameOver="isGameOver" />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Timer from "@/components/Timer.vue";
import Score from "@/components/Score.vue";

export default {
  name: "Header",
  props: {
    score: {
      type: Number,
      require: true,
    },
    isGameOver: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Timer,
    Score,
    Button,
  },
  methods: {
    setTotalTime(totalTime) {
      this.$emit("setTotalTime", totalTime);
    },
  },
};
</script>

<style lang="scss">
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $solitaire-dark-blue;
  color: white;
  @include position(fixed, 0, 0);
  width: 100vw;
  padding: 0.2vw 1vw;
  font-size: 1.5vw;
}

.header-text {
  margin-left: 9vw;
}

.header-item-section {
  display: flex;
  gap: 1.5vw;
}

.header-item {
  @include flexCenter;
  gap: 0.2vw;
}

.header-item-text {
  background-color: $solitaire-very-light-blue;
  border: 0.2vw solid $solitaire-blue;
  border-radius: 0.5vw;
  padding: 0.1vw;
  text-align: center;
}

.header-item-icon {
  @include widthHeightSize(2vw, 2vw);
}
</style>
