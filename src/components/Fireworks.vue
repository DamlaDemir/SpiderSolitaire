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

<style>
html {
  font-size: calc(100vmax / 1500 * 100);
}
.title {
  color: #fff;
  text-shadow: 0.5vw 0.5vw #576472;
  position: absolute;
  top: 25%;
  left: 25%;
}

[class^="firework-"] {
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 100%;
}

.firework-1 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
  top: 80%;
  left: 6%;
}

.firework-2 {
  -webkit-animation: firework-lg 1.2s both infinite;
  animation: firework-lg 1.2s both infinite;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
  top: 85%;
  left: 40%;
}

.firework-3 {
  -webkit-animation: firework-lg 1.2s both infinite;
  animation: firework-lg 1.2s both infinite;
  -webkit-animation-delay: 1.1s;
  animation-delay: 1.1s;
  top: 20%;
  left: 30%;
}

.firework-4 {
  -webkit-animation: firework-sm 1.2s both infinite;
  animation: firework-sm 1.2s both infinite;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
  top: 80%;
  left: 90%;
}

.firework-5 {
  -webkit-animation: firework-lg 1.2s both infinite;
  animation: firework-lg 1.2s both infinite;
  -webkit-animation-delay: 1.2s;
  animation-delay: 1.2s;
  top: 45%;
  left: 45%;
}

.firework-6 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 1.4s;
  animation-delay: 1.4s;
  top: 90%;
  left: 60%;
}

.firework-7 {
  -webkit-animation: firework-sm 1.2s both infinite;
  animation: firework-sm 1.2s both infinite;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
  top: 15%;
  left: 50%;
}

.firework-8 {
  -webkit-animation: firework-sm 1.2s both infinite;
  animation: firework-sm 1.2s both infinite;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
  top: 20%;
  left: 5%;
}

.firework-9 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 1.3s;
  animation-delay: 1.3s;
  top: 40%;
  left: 15%;
}

.firework-10 {
  -webkit-animation: firework-sm 1.2s both infinite;
  animation: firework-sm 1.2s both infinite;
  -webkit-animation-delay: 1.3s;
  animation-delay: 1.3s;
  top: 50%;
  left: 65%;
}

.firework-11 {
  -webkit-animation: firework-sm 1.2s both infinite;
  animation: firework-sm 1.2s both infinite;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
  top: 80%;
  left: 20%;
}

.firework-12 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 1.3s;
  animation-delay: 1.3s;
  top: 50%;
  left: 85%;
}

.firework-13 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
  top: 20%;
  left: 90%;
}

.firework-14 {
  -webkit-animation: firework-lg 1.2s both infinite;
  animation: firework-lg 1.2s both infinite;
  -webkit-animation-delay: 1.3s;
  animation-delay: 1.3s;
  top: 15%;
  left: 70%;
}

.firework-15 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-xl 1.2s both infinite;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
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
    box-shadow: -0.5rem 0rem 0 var(--solitaire-purple),
      0.5rem 0rem 0 var(--solitaire-purple),
      0rem -0.5rem 0 var(--solitaire-purple),
      0rem 0.5rem 0 var(--solitaire-purple),
      0.35rem -0.35rem 0 var(--solitaire-purple),
      0.35rem 0.35rem 0 var(--solitaire-purple),
      -0.35rem -0.35rem 0 var(--solitaire-purple),
      -0.35rem 0.35rem 0 var(--solitaire-purple),
      -0.35rem 0.35rem 0 var(--solitaire-purple),
      -0.35rem 0.35rem 0 var(--solitaire-purple);
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
    box-shadow: -0.7rem 0rem 0 var(--solitaire-pink),
      0.7rem 0rem 0 var(--solitaire-pink), 0rem -0.7rem 0 var(--solitaire-pink),
      0rem 0.7rem 0 var(--solitaire-pink),
      0.49rem -0.49rem 0 var(--solitaire-pink),
      0.49rem 0.49rem 0 var(--solitaire-pink),
      -0.49rem -0.49rem 0 var(--solitaire-pink),
      -0.49rem 0.49rem 0 var(--solitaire-pink),
      -0.49rem 0.49rem 0 var(--solitaire-pink),
      -0.49rem 0.49rem 0 var(--solitaire-pink);
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
    box-shadow: -0.9rem 0rem 0 var(--solitaire-yellow),
      0.9rem 0rem 0 var(--solitaire-yellow),
      0rem -0.9rem 0 var(--solitaire-yellow),
      0rem 0.9rem 0 var(--solitaire-yellow),
      0.63rem -0.63rem 0 var(--solitaire-yellow),
      0.63rem 0.63rem 0 var(--solitaire-yellow),
      -0.63rem -0.63rem 0 var(--solitaire-yellow),
      -0.63rem 0.63rem 0 var(--solitaire-yellow),
      -0.63rem 0.63rem 0 var(--solitaire-yellow),
      -0.63rem 0.63rem 0 var(--solitaire-yellow);
  }
}
</style>
