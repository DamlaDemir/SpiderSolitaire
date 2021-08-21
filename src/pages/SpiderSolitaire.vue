<template>
  <div>
    <fireworks v-if="isGameOver" />
    <header-section
      :score="score"
      @getHints="getHints"
      @openConfirmBox="changeConfirmBoxVisibility"
      @setTotalTime="setTotalTime"
      :isGameOver="isGameOver"
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
    <confirm-box
      :showConfirm="showConfirm"
      @accept="restartGame"
      @changeConfirmBoxVisibility="changeConfirmBoxVisibility"
    />
  </div>
</template>

<script>
import HeaderSection from "@/components/HeaderSection.vue";
import Card from "@/components/Card.vue";
import CardHolderSection from "@/components/CardHolderSection.vue";
import CardDealSection from "@/components/CardDealSection.vue";
import Fireworks from "@/components/Fireworks.vue";
import ConfirmBox from "@/components/ConfirmBox.vue";
import { constants } from "@/common/constants/constants";
import { scoreRuleEnum } from "@/common/enums/scoreRuleEnum";
import { toastrTypeEnum } from "@/common/enums/toastrTypeEnum";

const { totalNumberOfDecks, totalNumberOfCards, scoreRules } = constants;

export default {
  name: "App",
  components: {
    HeaderSection,
    Card,
    CardHolderSection,
    Fireworks,
    CardDealSection,
    ConfirmBox,
  },
  watch: {
    numberOfFullCardHolder() {
      if (this.numberOfFullCardHolder === totalNumberOfDecks) {
        this.gameOver();
      }
    },
    isGameOver() {
      if (this.isGameOver) {
        this.calculateScore();
      }
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
      movedCardIndex: "",
      refresh: 0,
      numberOfFullCardHolder: 0,
      totalTime: 0,
      numberOfToDealtDeck: 5,
      totalNumberOfDecks: totalNumberOfDecks,
      score: 500,
      isGameOver: false,
      hints: [],
      lastShowedHintIndex: 0,
      showConfirm: false,
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
    dragStart(event, card, cardStack, stackIndex, cardIndex) {
      const target = event.target;
      let isDraggable = this.$spiderSolitaireService.isDraggable(
        cardStack,
        cardIndex
      );

      if (isDraggable) {
        this.movedCard = card;
        this.movedCardStack = cardStack;
        this.movedStackIndex = stackIndex;
        this.movedCardIndex = cardIndex;

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
        const movedCards = this.movedCardStack.slice(this.movedCardIndex);

        this.deleteCardsFromStack(this.movedStackIndex, this.movedCardIndex);
        this.openLastCard(this.movedStackIndex);
        this.addCardsToStack(this.targetStackIndex, movedCards);
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
    dragEnter(card, stack, cardIndex, stackIndex) {
      let isLastCard = cardIndex == stack.length - 1;

      if (isLastCard) {
        this.targetCard = card;
        this.targetStack = stack;
        this.targetStackIndex = stackIndex;
      }
    },
    isCompleteHand(stackIndex) {
      let completeHand = false;
      let openedCards = this.stacks[stackIndex].filter((x) => x.isOpen);

      if (openedCards.length >= totalNumberOfCards) {
        completeHand = this.$utils.isSequential(
          this.stacks[stackIndex]
            .slice(-totalNumberOfCards)
            .map((card) => card.number)
        );
      }

      if (completeHand) {
        this.deleteCardsFromStack(stackIndex, -totalNumberOfCards);
        this.openLastCard(stackIndex);
        this.fillCardHolder();
        this.calculateScore(scoreRuleEnum.completeHand);
      }

      return completeHand;
    },
    dealCards() {
      const isThereEmptyStack = this.isThereEmptyStack();

      if (!isThereEmptyStack) {
        this.numberOfToDealtDeck--;
        this.clearHints();

        this.stacks.forEach((stack, stackIndex) => {
          let newCard = this.dealtCards.pop();
          newCard.isOpen = true;
          newCard.isDraggable = true;

          stack.push(newCard);

          this.isCompleteHand(stackIndex);
        });
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

      if (lastCard && !lastCard.isOpen && lastCard.number != -1) {
        lastCard.isOpen = true;
        lastCard.isDraggable = true;

        this.calculateScore(scoreRuleEnum.openCard);
      }
    },
    deleteCardsFromStack(stackIndex, cardIndex) {
      this.stacks[stackIndex].splice(cardIndex);
    },
    addCardsToStack(stackIndex, cards) {
      this.stacks[stackIndex] = [...this.stacks[stackIndex], ...cards];
    },
    fillCardHolder() {
      this.numberOfFullCardHolder++;
    },
    isMovable() {
      let isCardHolder =
        this.targetStack.length === 1 && this.targetStack[0].number == -1;
      let isMovable =
        this.movedCard.number - this.targetCard.number === 1 || isCardHolder;

      return isMovable;
    },
    gameOver() {
      this.isGameOver = true;
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
    changeConfirmBoxVisibility() {
      this.showConfirm = !this.showConfirm;
    },
    restartGame() {
      window.location.reload();
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
        if (this.lastShowedHintIndex >= this.hints.length) {
          this.lastShowedHintIndex = 0;
        }

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

        this.lastShowedHintIndex++;
        this.calculateScore(scoreRuleEnum.getHint);
      } else {
        let firstDeck = document.getElementById("deck-first");

        cardsToMark.push(firstDeck);
        this.markCards(cardsToMark);
      }

      setTimeout(() => {
        this.markCards(cardsToMark, true);
      }, 1000);
    },
    markCards(cards, reset = false) {
      cards.forEach((card) => {
        if (reset) {
          card.style.border = "";
          card.style.borderRadius = "";
          card.style.backgroundColor = "";
          card.classList.remove("marked");
        } else {
          card.style.border = "1vh solid #874444";
          card.style.backgroundColor = "#874444";
          card.style.borderRadius = "1vw";
          card.classList.add("marked");
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
                  currentStack[currentCardIndex].number,
                  currentStack[currentCardIndex + 1].number,
                ]),
            currentCardInCurrentStack = currentStack[currentCardIndex];

          if (
            currentCardInCurrentStack.isOpen &&
            IsSequentialCurrentAndNextCard
          ) {
            this.stacks.forEach((targetStack, targetStackIndex) => {
              if (
                this.$utils.isSequential([
                  targetStack[targetStack.length - 1].number,
                  currentStack[currentCardIndex].number,
                ]) &&
                targetStackIndex != currentStackIndex
              ) {
                let currentCardIndexes = [];

                currentCardIndexes = Array.from(
                  { length: currentStack.length - currentCardIndex },
                  (_, i) => i + currentCardIndex
                );

                let hint = {
                  currentStackIndex: currentStackIndex,
                  currentCardIndexes: currentCardIndexes,
                  targetStackIndex: targetStackIndex,
                  targetCardIndex: this.stacks[targetStackIndex].length - 1,
                };

                hints.push(hint);
              }
            });
          } else {
            break;
          }
        }
      });

      this.hints = hints;
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
  margin: 1.5vw 0;
}
</style>
