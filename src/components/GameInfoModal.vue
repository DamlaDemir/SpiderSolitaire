<template>
  <div class="modal">
    <h1>REVERSED SPIDER SOLITAIRE RULES</h1>
    <div>Welcome, you can find the game rules below.</div>
    <ul class="game-rules">
      <li>
        You have to sort the cards like this => A, 2, 3, 4, 5, 6, 7, 8 ,9 , 10,
        J, Q, K.
      </li>
      <li>
        To move the cards, you must hold and drag them on to the target card.
      </li>
      <li>You cannot change the places of the face-down cards.</li>
      <li>
        You cannot deal cards if at least one of the card holders is empty.
      </li>

      <li>To win the game, you must complete 8 series in total.</li>
      <li>Every time you open a card, you earn 150 points.</li>
      <li>Every time you complete a series, you earn 1040 points.</li>
      <li>You lose 20 points every time you get a hint.</li>
      <li>The faster you finish, the more points you earn.</li>
    </ul>
    <span>GOOD LUCK :) </span>
    <button class="lets-start" @click="go">LET'S START !</button>
  </div>
</template>

<script>
export default {
  name: "GameInfoModal",
  methods: {
    go() {
      this.$router.push("/spiderSolitaire");
    },
  },
};
</script>

<style lang="scss">
.modal {
  @include flexCenter;
  flex-flow: column wrap;
  @include position(fixed, 10%, 28%);
  background-color: $solitaire-blur-gray;
  color: $solitaire-blue;
  border: 0.6vw solid $solitaire-dark-blue;
  border-radius: 4vw;
  font-size: 1vw;
  min-width: 45vw;

  h1 {
    font-size: 1.7vw;
    color: $solitaire-red;
    margin-bottom: 1vw;
  }
}

.lets-start {
  background-color: $solitaire-red;
  color: white;
  border-radius: 0.5vw;
  margin: 2vw;
  padding: 1vw;
  font-size: 1.5vw;
  border: none;

  &:hover {
    background-color: $solitaire-dark-blue;
  }
}

.game-rules {
  list-style-image: url("../assets/images/cards/close-card.svg");

  li {
    margin: 0.5vw;
  }
}
</style>
