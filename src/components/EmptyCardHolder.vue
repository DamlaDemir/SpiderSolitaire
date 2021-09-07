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

<style lang="scss">
.card-holder {
  @include flexCenter;
  @include widthHeightSize();
  border-radius: 0.5vw;
  border: 0.5vh solid $solitaire-very-light-blue;
  background-color: $solitaire-light-white;
  background-image: linear-gradient(
    $solitaire-very-light-blue,
    $solitaire-light-white,
    $solitaire-light-white
  );
}

.ban {
  width: 4vw;
  height: 4vw;
}
</style>
