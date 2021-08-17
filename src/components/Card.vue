<template>
  <div
    @dragstart="dragStart($event, card, stack, stackIndex, cardIndex)"
    @dragenter="dragEnter(card, stack, stackIndex)"
    :draggable="card.isDraggable"
    @dragend="dragEnd($event)"
    @dragover.prevent
    class="card"
    :class="card.number === -1 ? 'empty-card-holder' : ''"
  >
    <empty-card-holder v-if="card.number === -1" />
    <div v-else>
      <img
        :src="getCardImage(card)"
        :draggable="card.isDraggable"
        :id="`card-${stackIndex}${cardIndex}`"
        class="open-close-card"
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
    dragEnter(card, stack, stackIndex) {
      this.$emit("dragEnter", card, stack, stackIndex);
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

<style>
.card {
  width: 6.7vw;
  height: 9.2vw;
  border-radius: 0.5vw;
  margin-bottom: -7.2vw;
  transition: all 0.2s linear;
}

.open-close-card:hover {
  background-color: var(--solitaire-red);
  border: 0.5vh solid var(--solitaire-red);
  border-radius: 1vw;
}

/* .close-card {
  width: 6.7vw;
  height: 9.2vw;
} */

.empty-card-holder {
  margin-bottom: -9vw;
}
</style>
