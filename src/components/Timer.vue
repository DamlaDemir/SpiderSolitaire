<template>
  <div class="header-item">
    <img src="@/assets/images/icons/timer.svg" class="header-item-icon" />
    <div class="header-item-text timer">{{ formattedElapsedTime }}</div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    isGameOver: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isGameOver() {
      if (this.isGameOver) {
        this.stop();
      }
    },
  },
  data() {
    return {
      elapsedTime: 0,
      timer: undefined,
    };
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();

      this.$emit("setTotalTime", date.getSeconds());

      return utc.substr(utc.indexOf(":") - 2, 8);
    },
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
  },
  mounted() {
    this.start();
  },
};
</script>

<style>
.timer {
  min-width: 8.5vw;
}
</style>
