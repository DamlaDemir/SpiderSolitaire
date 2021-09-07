<template>
  <div>
    <empty-card-holder
      v-if="numberOfToDealtDeck === 0"
      :ban="true"
      class="empty-deck"
    />
    <div v-else>
      <img
        v-for="index in numberOfToDealtDeck"
        :key="index"
        src="../../src/assets/images/cards/close-card.svg"
        @click="dealCards"
        class="deck"
      />
      <!-- <img
        src="../../src/assets/images/cards/close-card2.jpg"
        @click="dealCards"
        class="deck deck-first"
        id="deck-first"
      /> -->
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

<style lang="scss">
.deck {
  @include widthHeightSize();
  border-radius: 1vw;
  margin-right: -4vw;
}

// .deck-first {
//   @include widthHeightSize(6.7vw, 8.8vw);
//   border: 0.3vw solid #fff;
//   margin: 0.2vw;
// }
</style>
