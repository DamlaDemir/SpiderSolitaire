import { constants } from "../common/constants/constants";
import utils from "../common/helpers/utils";

const {
  splitCardInfo: {
    firstSectionLastCardIndex,
    secondSectionLastCardIndex,
    firstSectionSplitNumber,
    secondSectionSplitNumber,
  },
} = constants;

const spiderSolitaireService = {
  generateStacks(cards) {
    try {
      let firstCards = cards.slice(0, firstSectionLastCardIndex),
        remainingCards = cards.slice(
          firstSectionLastCardIndex,
          secondSectionLastCardIndex
        ),
        firstStacks = this.splitCards(firstCards, firstSectionSplitNumber),
        remainingStacks = this.splitCards(
          remainingCards,
          secondSectionSplitNumber
        );

      let stacks = [...firstStacks, ...remainingStacks];

      this.addCardItemForCardHolder(stacks);
      this.openAllLastCards(stacks);

      return stacks;
    } catch (err) {
      let errorMsg = `Error ! Msg: ${err.message}`;

      console.log(errorMsg);

      throw errorMsg;
    }
  },
  splitCards(cards, splitNumber) {
    try {
      let stacks = [],
        stackCards = [];

      cards.forEach((card, index) => {
        stackCards.push(card);

        if ((index + 1) % splitNumber === 0) {
          stacks.push(stackCards);
          stackCards = [];
        }
      });

      return stacks;
    } catch (err) {
      let errorMsg = `Error ! Msg: ${err.message}`;

      console.log(errorMsg);

      throw errorMsg;
    }
  },
  openAllLastCards(stacks) {
    try {
      stacks.forEach((stack) => {
        let lastCard = stack[stack.length - 1];

        lastCard.isOpen = true;
        lastCard.isDraggable = true;
      });
    } catch (err) {
      let errorMsg = `Error ! Msg: ${err.message}`;

      console.log(errorMsg);

      throw errorMsg;
    }
  },
  addCardItemForCardHolder(stacks) {
    try {
      stacks.forEach((stack) => {
        stack.unshift({
          number: -1,
          isOpen: false,
          isDraggable: false,
        });
      });
    } catch (err) {
      let errorMsg = `Error ! Msg: ${err.message}`;

      console.log(errorMsg);

      throw errorMsg;
    }
  },
  getDealtCards(cards) {
    return cards.slice(secondSectionLastCardIndex);
  },
  isDraggable(card, cardStack, cardIndex) {
    try {
      let bottomCards = cardStack.slice(cardIndex);

      const isDraggable = utils.isSequential(
        bottomCards.map((card) => card.number)
      );

      card.isDraggable = isDraggable;

      return isDraggable;
    } catch (err) {
      let errorMsg = `Error ! Msg: ${err.message}`;

      console.log(errorMsg);

      throw errorMsg;
    }
  },
};

export default spiderSolitaireService;
