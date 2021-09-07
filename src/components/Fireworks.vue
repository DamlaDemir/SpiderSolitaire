<template>
  <div>
    <div :class="`firework-${item}`" v-for="item in 13" :key="item">
      <div :class="`firework-${item + 1}`"></div>
    </div>
    <div class="title">You are winner ! Congratulations !</div>
  </div>
</template>

<script>
export default {
  name: "Fireworks",
};
</script>

<style lang="scss">
html {
  font-size: 100vmax / 1500 * 100;
}
.title {
  color: #fff;
  text-shadow: 0.5vw 0.5vw #576472;
  @include position(absolute, 25%, 25%);
}

[class^="firework-"] {
  position: absolute;
  @include widthHeightSize(0.1rem, 0.1rem);
  border-radius: 100%;
}

.firework-1 {
  @include animation(firework-md, 1.2s, 0.6s, both);
  top: 80%;
  left: 6%;
}

.firework-2 {
  @include animation(firework-lg, 1.2s, 0.6s, both);
  top: 85%;
  left: 40%;
}

.firework-3 {
  @include animation(firework-lg, 1.2s, 1.1s, both);
  top: 20%;
  left: 30%;
}

.firework-4 {
  @include animation(firework-sm, 1.2s, 1s, both);
  top: 80%;
  left: 90%;
}

.firework-5 {
  @include animation(firework-lg, 1.2s, 1.2s, both);
  top: 45%;
  left: 45%;
}

.firework-6 {
  @include animation(firework-md, 1.2s, 1.4s, both);
  top: 90%;
  left: 60%;
}

.firework-7 {
  @include animation(firework-sm, 1.2s, 0.4s, both);
  top: 15%;
  left: 50%;
}

.firework-8 {
  @include animation(firework-sm, 1.2s, 0.9s, both);
  top: 20%;
  left: 5%;
}

.firework-9 {
  @include animation(firework-md, 1.2s, 1.3s);
  top: 40%;
  left: 15%;
}

.firework-10 {
  @include animation(firework-sm, 1.2s, 1.3s);
  top: 50%;
  left: 65%;
}

.firework-11 {
  @include animation(firework-sm, 1.2s, 0.9s);
  top: 80%;
  left: 20%;
}

.firework-12 {
  @include animation(firework-md, 1.2s, 1.3s);
  top: 50%;
  left: 85%;
}

.firework-13 {
  @include animation(firework-md, 1.2s, 0.6s);
  top: 20%;
  left: 90%;
}

.firework-14 {
  @include animation(firework-lg, 1.2s, 1.3s);
  top: 15%;
  left: 70%;
}

.firework-15 {
  @include animation(firework-md, 1.2s, 0.1s);
  top: 70%;
  left: 40%;
}

@keyframes firework-sm {
  0%,
  100% {
    opacity: 0;
  }
  10%,
  70% {
    opacity: 1;
  }
  100% {
    box-shadow: -0.5rem 0rem 0 $solitaire-purple,
      0.5rem 0rem 0 $solitaire-purple, 0rem -0.5rem 0 $solitaire-purple,
      0rem 0.5rem 0 $solitaire-purple, 0.35rem -0.35rem 0 $solitaire-purple,
      0.35rem 0.35rem 0 $solitaire-purple, -0.35rem -0.35rem 0 $solitaire-purple,
      -0.35rem 0.35rem 0 $solitaire-purple, -0.35rem 0.35rem 0 $solitaire-purple,
      -0.35rem 0.35rem 0 $solitaire-purple;
  }
}
@keyframes firework-md {
  0%,
  100% {
    opacity: 0;
  }
  10%,
  70% {
    opacity: 1;
  }
  100% {
    box-shadow: -0.7rem 0rem 0 $solitaire-pink, 0.7rem 0rem 0 $solitaire-pink,
      0rem -0.7rem 0 $solitaire-pink, 0rem 0.7rem 0 $solitaire-pink,
      0.49rem -0.49rem 0 $solitaire-pink, 0.49rem 0.49rem 0 $solitaire-pink,
      -0.49rem -0.49rem 0 $solitaire-pink, -0.49rem 0.49rem 0 $solitaire-pink,
      -0.49rem 0.49rem 0 $solitaire-pink, -0.49rem 0.49rem 0 $solitaire-pink;
  }
}
@keyframes firework-lg {
  0%,
  100% {
    opacity: 0;
  }
  10%,
  70% {
    opacity: 1;
  }
  100% {
    box-shadow: -0.9rem 0rem 0 $solitaire-yellow,
      0.9rem 0rem 0 $solitaire-yellow, 0rem -0.9rem 0 $solitaire-yellow,
      0rem 0.9rem 0 $solitaire-yellow, 0.63rem -0.63rem 0 $solitaire-yellow,
      0.63rem 0.63rem 0 $solitaire-yellow, -0.63rem -0.63rem 0 $solitaire-yellow,
      -0.63rem 0.63rem 0 $solitaire-yellow, -0.63rem 0.63rem 0 $solitaire-yellow,
      -0.63rem 0.63rem 0 $solitaire-yellow;
  }
}
</style>
