<template>
  <div class="confirmbox" v-if="showConfirm">
    <div class="close-button"><button @click="reject">X</button></div>
    <div class="cofirm-text">{{ confirmText }}</div>
    <div class="button-container">
      <button class="confirm-button yes" @click="accept">Yes</button>
      <button class="confirm-button no" @click="reject">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmBox",
  props: {
    showConfirm: {
      typeof: Boolean,
      default: false,
    },
    confirmText: {
      typeof: String,
      default: "Are you sure you want to start a new game?",
    },
  },
  data() {
    return {
      refresh: true,
    };
  },
  methods: {
    accept() {
      this.$emit("accept");
    },
    reject() {
      this.$emit("changeConfirmBoxVisibility");
    },
  },
};
</script>

<style>
.confirmbox {
  display: flex;
  flex-flow: column wrap;
  position: fixed;
  top: 35%;
  left: 35%;
  font-size: 1vw;
  background-color: white;
  border-radius: 0.8vw;
  text-align: center;
  min-width: 25vw;
  width: auto;
  transition: all 0.1s ease-in;
  border: 0.1vh solid #ccc;
}
.cofirm-text {
  border-bottom: 0.1vh solid #ccc;
  padding: 1vw;
}

.button-container {
  display: flex;
}

.confirm-button {
  min-width: 50%;
  padding: 0.8vw;
  background-color: white;
  font-size: 1.5vw;
  border: initial;
}

.confirm-button:hover {
  background-color: #eee;
}

.no {
  border-bottom-right-radius: 0.8vw;
}

.yes {
  border-bottom-left-radius: 0.8vw;
  border-right: 0.1vh solid #ccc;
}

.close-button {
  display: flex;
  flex-flow: row-reverse;
}

.close-button button {
  background-color: white;
  border: none;
  font-size: 1vw;
  border-radius: 0.8vw;
}
</style>
