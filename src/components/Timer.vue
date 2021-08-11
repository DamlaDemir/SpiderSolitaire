<template>
  <div class="header-item">
    <img src="@/assets/images/icons/timer.svg" class="header-item-icon" />
    <div class="header-item-text timer">{{ formattedElapsedTime }}</div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      elapsedTime: 0,
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
      setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
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
