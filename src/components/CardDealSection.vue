<template>
  <div>
    <empty-card-holder v-if="numberOfToDealtDeck === 0" :ban="true" />
    <div v-else>
      <img
        v-for="index in numberOfToDealtDeck - 1"
        :key="index"
        src="../../src/assets/images/cards/close-card.svg"
        @click="dealCards"
        class="deck"
      />
      <img
        src="../../src/assets/images/cards/close-card.svg"
        @click="dealCards"
        class="deck"
        id="deck-first"
      />
    </div>
  </div>
</template>

<script>
import EmptyCardHolder from "@/components/EmptyCardHolder.vue";

export default {
  name: "CardDealSection",
  components: {
    EmptyCardHolder,
  },
  props: {
    numberOfToDealtDeck: {
      typeof: Number,
      require: true,
      default: 5,
    },
  },
  methods: {
    dealCards() {
      this.$emit("dealCards");
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
  border: 0.3vw solid #fff;
  width: 6.7vw;
  height: 8.8vw;
  margin: 0.2vw;
}
</style>
