<template>
  <div>
    <div
      v-if="card.isOpen"
      @dragstart="dragStart($event, card, stack, stackIndex, cardIndex)"
      @dragenter="dragEnter(card, stack, cardIndex, stackIndex)"
      :draggable="card.isDraggable"
      @dragend="dragEnd($event)"
      @dragover.prevent
      class="card"
      :class="card.number === -1 ? 'empty-card-holder' : ''"
    >
      <empty-card-holder v-if="card.number === -1" />
      <img
        v-else
        :src="getCardImage(card)"
        :draggable="card.isDraggable"
        :id="`card-${stackIndex}${cardIndex}`"
        class="open-card"
      />
    </div>
    <div v-else class="card close-card">
      <img
        :src="getCardImage(card)"
        :draggable="card.isDraggable"
        :id="`card-${stackIndex}${cardIndex}`"
      />
    </div>
  </div>
</template>

<script>
import EmptyCardHolder from "@/components/EmptyCardHolder.vue";

export default {
  name: "Card",
  components: {
    EmptyCardHolder,
  },
  props: {
    card: {
      type: Object,
      require: true,
    },
    stack: {
      type: Array,
      require: true,
    },
    stackIndex: {
      type: Number,
      require: true,
    },
    cardIndex: {
      type: Number,
      require: true,
    },
  },
  methods: {
    dragStart(event, card, cardStack, stackIndex, cardIndex) {
      this.$emit("dragStart", event, card, cardStack, stackIndex, cardIndex);
    },
    dragEnd(event) {
      this.$emit("dragEnd", event);
    },
    dragEnter(card, stack, cardIndex, stackIndex) {
      this.$emit("dragEnter", card, stack, cardIndex, stackIndex);
    },
    getCardImage(card) {
      if (card.isOpen) {
        return require(`@/assets/images/cards/card-${card.number}.svg`);
      } else {
        return require("@/assets/images/cards/close-card.svg");
      }
    },
  },
};
</script>

<style lang="scss">
.card {
  @include widthHeightSize();
  border-radius: 0.5vw;
  margin-bottom: -7.2vw;
  @include transition(3s);
}

.open-card:hover {
  background-color: $solitaire-red;
  border: 0.5vh solid $solitaire-red;
  border-radius: 1vw;
}

.empty-card-holder {
  margin-bottom: -9vw;
}
</style>
