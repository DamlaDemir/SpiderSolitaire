<template>
  <div>
    <empty-card-holder v-if="numberOfToDealtDeck === 0" :ban="true" />
    <div v-else>
      <img
        v-for="index in numberOfToDealtDeck"
        :key="index"
        src="../../src/assets/images/cards/close-card.svg"
        @click="$emit('dealCards')"
        class="deck"
      />
      <!-- <img
        src="../../src/assets/images/cards/close-card2.jpg"
        @click="$emit('dealCards')"
        class="deck deck-first"
        id="deck-first"
      /> -->
    </div>
  </div>
</template>

<script>
import EmptyCardHolder from "./EmptyCardHolder.vue";

export default {
  name: "CardDealSection",
  components: {
    EmptyCardHolder,
  },
  props: {
    numberOfToDealtDeck: {
      typeof: Number,
      require: true,
    },
  },
};
</script>

<style>
.deck {
  width: 6.7vw;
  height: 9.2vw;
  border-radius: 1vw;
  margin-right: -4vw;
}

.deck-first {
  border: 0.2vw solid #fff;
  width: 6.7vw;
  height: 8.7vw;
  margin: 0.3vw;
}
</style>
