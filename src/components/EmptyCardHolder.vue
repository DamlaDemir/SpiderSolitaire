<template>
  <div class="card-holder">
    <img
      src="@/assets/images/icons/ban.svg"
      width="100"
      height="100"
      class="ban"
      v-if="ban"
    />
  </div>
</template>

<script>
export default {
  name: "EmptyCardHolder",
  props: {
    ban: {
      typeof: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.card-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.7vw;
  height: 9.2vw;
  border-radius: 0.5vw;
  border: 0.5vh solid var(--solitaire-very-light-blue);
  background-color: var(--solitaire-light-white);
  background-image: linear-gradient(
    var(--solitaire-very-light-blue),
    var(--solitaire-light-white)
  );
}

.ban {
  width: 4vw;
  height: 4vw;
}
</style>
