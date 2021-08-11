<template>
  <div>
    <!-- <fireworks v-if="isGameOver" /> -->
    <header-section
      :score="score"
      @getHints="getHints"
      @setTotalTime="setTotalTime"
    />
    <div class="main">
      <div class="card-deal-holder-section">
        <card-deal-section
          :numberOfToDealtDeck="numberOfToDealtDeck"
          @dealCards="dealCards"
        />
        <card-holder-section
          :totalNumberOfDecks="totalNumberOfDecks"
          :numberOfFullCardHolder="numberOfFullCardHolder"
        />
      </div>
      <div class="stack-section" :key="refresh">
        <div
          class="stack"
          v-for="(stack, stackIndex) in stacks"
          :key="stackIndex"
        >
          <card
            v-for="(card, cardIndex) in stack"
            :key="`card-${stackIndex}${cardIndex}`"
            :card="card"
            :cardIndex="cardIndex"
            :stack="stack"
            :stackIndex="stackIndex"
            @dragStart="dragStart"
            @dragEnd="dragEnd"
            @dragEnter="dragEnter"
          ></card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSection from "../components/HeaderSection.vue";
import Card from "../components/Card.vue";
import CardHolderSection from "../components/CardHolderSection.vue";
import CardDealSection from "../components/CardDealSection.vue";
import { constants } from "../common/constants/constants";
import { scoreRuleEnum } from "../common/enums/scoreRuleEnum";
import { toastrTypeEnum } from "../common/enums/toastrTypeEnum";

import cardFlip from "../assets/audio/card-flip.mp3";

// import Fireworks from "../components/Fireworks.vue";

const { totalNumberOfDecks, totalNumberOfCards, scoreRules } = constants;

export default {
  name: "App",
  components: {
    HeaderSection,
    Card,
    CardHolderSection,
    // Fireworks,
    CardDealSection,
  },
  watch: {
    numberOfFullCardHolder() {
      if (this.numberOfFullCardHolder === totalNumberOfDecks) {
        this.gameOver();
      }
    },
    gameOver() {
      this.calculateScore();
    },
  },
  data() {
    return {
      cards: [],
      dealtCards: [],
      stacks: [],
      targetStack: [],
      movedCard: {},
      movedCardStack: [],
      targetCard: {},
      targetStackIndex: "",
      movedStackIndex: "",
      refresh: 0,
      numberOfFullCardHolder: 0,
      cardFlip,
      totalTime: 0,
      numberOfToDealtDeck: 5,
      totalNumberOfDecks: totalNumberOfDecks,
      score: 500,
      isGameOver: false,
      hints: [],
      lastShowedHintIndex: 0,
    };
  },
  computed: {},
  methods: {
    createAllCards() {
      let cards = [];

      for (let i = 1; i <= totalNumberOfCards * totalNumberOfDecks; i++) {
        let number = i % totalNumberOfCards;

        cards.push({
          number: number === 0 ? totalNumberOfCards : number,
          isOpen: false,
          isDraggable: false,
        });
      }

      this.cards = cards;

      this.$utils.shuffleArray(this.cards);

      let stacks = this.$spiderSolitaireService.generateStacks(this.cards);

      this.stacks = [...this.stacks, ...stacks];

      this.dealtCards = this.$spiderSolitaireService.getDealtCards(this.cards);
    },
    dragStart(event, card, cardStack, stackIndex) {
      const target = event.target;

      this.playSound();

      let isDraggable = this.$spiderSolitaireService.isDraggable(
        card,
        cardStack
      );

      if (isDraggable) {
        this.movedCard = card;
        this.movedCardStack = cardStack;
        this.movedStackIndex = stackIndex;

        event.dataTransfer.setData("card_id", target.id);

        setTimeout(() => {
          target.style.display = "none";
        }, 0);
      } else {
        this.$toastr.showToastr(
          toastrTypeEnum.warning,
          "You can't drag unordered cards !"
        );
      }
    },
    dragEnd(event) {
      const card_id = event.target.id;
      const cardElement = document.getElementById(card_id);
      let isMovable = this.isMovable();

      if (isMovable) {
        let movedCardIndex = this.movedCardStack.indexOf(this.movedCard);
        const movedCards =
          movedCardIndex != -1 ? this.movedCardStack.slice(movedCardIndex) : [];

        this.deleteCardFromStack(this.movedStackIndex, movedCardIndex);
        this.openLastCard(this.movedStackIndex);
        this.addCardToStack(this.targetStackIndex, movedCards);
        this.isCompleteHand(this.targetStackIndex);

        this.clearHints();
        this.refresh++;
      } else {
        this.$toastr.showToastr(
          toastrTypeEnum.warning,
          "You can't move unordered cards !"
        );
      }

      if (cardElement) {
        cardElement.style.display = "block";
      }
    },
    dragEnter(card, stack, stackIndex) {
      this.targetCard = card;
      this.targetStack = stack;
      this.targetStackIndex = stackIndex;
    },
    isCompleteHand(stackIndex) {
      let completeHand = false;
      let openedCards = this.stacks[this.targetStackIndex].filter(
        (x) => x.isOpen
      );

      if (openedCards.length >= totalNumberOfCards) {
        completeHand = this.$utils.isSequential(
          this.stacks[stackIndex].slice(-totalNumberOfCards)
        );
      }

      if (completeHand) {
        this.deleteCardFromStack(stackIndex, -totalNumberOfCards);
        this.openLastCard(stackIndex);
        this.fillCardHolder();
        this.calculateScore(scoreRuleEnum.completeHand);
      }

      return completeHand;
    },
    dealCards() {
      const isThereEmptyStack = this.isThereEmptyStack();

      if (!isThereEmptyStack) {
        this.stacks.forEach((stack) => {
          let newCard = this.dealtCards.pop();
          newCard.isOpen = true;
          newCard.isDraggable = true;

          stack.push(newCard);
        });

        this.numberOfToDealtDeck--;
        this.clearHints();
      } else {
        this.$toastr.showToastr(
          toastrTypeEnum.warning,
          "There must be at least one card in each table column before you can deal a new row of cards."
        );
      }
    },
    isThereEmptyStack() {
      const emptyStacks = this.stacks.filter((stack) => stack.length === 1);

      return emptyStacks.length > 0;
    },
    openLastCard(stackIndex) {
      let lastIndex = this.stacks[stackIndex].length - 1;
      let lastCard = this.stacks[stackIndex][lastIndex];

      if (lastCard) {
        lastCard.isOpen = true;
        lastCard.isDraggable = true;

        this.calculateScore(scoreRuleEnum.openCard);
      }
    },
    deleteCardFromStack(stackIndex, cardIndex) {
      this.stacks[stackIndex].splice(cardIndex);
    },
    addCardToStack(stackIndex, cards) {
      this.stacks[stackIndex] = [...this.stacks[stackIndex], ...cards]; // kaydırıldığı yeni stack'e atılır.
    },
    fillCardHolder() {
      this.numberOfFullCardHolder++;
    },
    isMovable() {
      let isMovable =
        this.movedCard.number - this.targetCard.number === 1 ||
        this.targetCard.number === -1;

      return isMovable;
    },
    gameOver() {
      this.isGameOver = true;
      this.$toastr.showToastr(toastrTypeEnum.success, "Congratulations !");
    },
    playSound() {
      var audio = new Audio(this.cardFlip);
      audio.play();
    },
    clearHints() {
      this.hints = [];
      this.lastShowedHintIndex = 0;
    },
    getHints() {
      const cardsToMark = [];

      if (this.hints.length === 0) {
        this.calculateHints();
      }

      if (this.hints.length > 0) {
        if (this.lastShowedHintIndex < this.hints.length) {
          let nextHint = this.hints[this.lastShowedHintIndex];

          let targetCard = document.getElementById(
            `card-${nextHint.targetStackIndex}${nextHint.targetCardIndex}`
          );

          cardsToMark.push(targetCard);

          nextHint.currentCardIndexes.forEach((currentCard) => {
            let card = document.getElementById(
              `card-${nextHint.currentStackIndex}${currentCard}`
            );

            cardsToMark.push(card);
          });

          this.markCards(cardsToMark);

          setTimeout(() => {
            this.markCards(cardsToMark, true);
          }, 1500);

          this.lastShowedHintIndex++;
          this.calculateScore(scoreRuleEnum.getHint);
        } else {
          this.lastShowedHintIndex = 0;
        }
      } else {
        let firstDeck = document.getElementById("deck-first");

        cardsToMark.push(firstDeck);
        this.markCards(cardsToMark);
      }
    },
    markCards(cards, reset = false) {
      cards.forEach((card) => {
        if (reset) {
          card.style.border = null;
          card.style.borderRadius = null;
          card.style.backgroundColor = null;
        } else {
          card.style.border = " 1vh solid rgba(226, 39, 41, 0.8)";
          card.style.backgroundColor = "rgba(226, 39, 41, 0.8)";
          card.style.borderRadius = "1vw";
        }
      });
    },
    calculateHints() {
      let hints = [];

      this.stacks.forEach((currentStack, currentStackIndex) => {
        for (
          let currentCardIndex = currentStack.length - 1;
          currentCardIndex >= 0;
          currentCardIndex--
        ) {
          let isLastCard = currentCardIndex === currentStack.length - 1,
            IsSequentialCurrentAndNextCard = isLastCard
              ? true
              : this.$utils.isSequential([
                  currentStack[currentCardIndex],
                  currentStack[currentCardIndex + 1],
                ]),
            currentCardInCurrentStack = currentStack[currentCardIndex],
            matchingStackIndexes = [];

          if (
            currentCardInCurrentStack.isOpen &&
            IsSequentialCurrentAndNextCard
          ) {
            this.stacks.forEach((targetStack, targetStackIndex) => {
              if (
                this.$utils.isSequential([
                  targetStack[targetStack.length - 1],
                  currentStack[currentCardIndex],
                ]) &&
                targetStackIndex != currentStackIndex
              ) {
                matchingStackIndexes.push(targetStackIndex);
              }
            });

            matchingStackIndexes.forEach((matchingStackIndex) => {
              let currentCardIndexes = [];

              if (isLastCard) {
                currentCardIndexes = [currentCardIndex];
              } else {
                for (let i = currentCardIndex; i < currentStack.length; i++) {
                  currentCardIndexes.push(i);
                }
              }

              let hint = {
                currentStackIndex: currentStackIndex,
                currentCardIndexes: currentCardIndexes,
                targetStackIndex: matchingStackIndex,
                targetCardIndex: this.stacks[matchingStackIndex].length - 1,
              };

              hints.push(hint);
            });
          } else {
            break;
          }
        }
      });

      this.hints = hints;
    },
    calculateScore(currentRule) {
      if (this.isGameOver) {
        this.score = this.score / 4 + (600 - this.totalTime) * 25;
      } else {
        const rule = scoreRules.filter(
          (scoreRule) => scoreRule.rule === currentRule
        )[0];

        this.score += rule.points;
      }
    },
    setTotalTime(totalTime) {
      this.totalTime = totalTime;
    },
  },
  mounted() {
    this.createAllCards();
  },
};
</script>

<style>
.main {
  padding: 3vw 2vw;
}

.card-deal-holder-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stack-section {
  display: flex;
  gap: 3%;
}

.stack {
  margin: 3.5vw 0;
}
</style>
