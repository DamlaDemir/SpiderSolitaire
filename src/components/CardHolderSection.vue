<template>
  <div class="card-holder-wrapper">
    <div
      v-for="cardHolder in cardHolders"
      :key="`card-holder-${cardHolder.id}`"
    >
      <empty-card-holder v-if="cardHolder.empty" />
      <div class="full-card-holder" v-else>
        <img src="@/assets/images/cards/card-1.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import EmptyCardHolder from "@/components/EmptyCardHolder.vue";

export default {
  name: "CardHolderSection",
  components: {
    EmptyCardHolder,
  },
  props: {
    totalNumberOfDecks: {
      type: Number,
      require: true,
    },
    numberOfFullCardHolder: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  watch: {
    numberOfFullCardHolder() {
      let emptyCardHolder = this.cardHolders.filter((x) => x.empty)[0];
      emptyCardHolder.empty = false;
    },
  },
  data() {
    return {
      cardHolders: [],
    };
  },
  methods: {
    createCardHolders() {
      let cardHolders = [];

      for (let i = 0; i < this.totalNumberOfDecks; i++) {
        let cardHolder = { id: i, empty: true };

        if (i < this.numberOfFullCardHolder) {
          cardHolder.empty = false;
        }

        cardHolders.push(cardHolder);
      }

      this.cardHolders = cardHolders;
    },
  },
  created() {
    this.createCardHolders();
  },
};
</script>

<style lang="scss">
.card-holder-wrapper {
  display: flex;
  flex-direction: row-reverse;
  gap: 2%;
  padding-right: 2vw;
}

.full-card-holder {
  @include widthHeightSize();
}
</style>
