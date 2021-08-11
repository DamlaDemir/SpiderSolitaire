import { constants } from "../constants/constants";
import utils from "../helpers/utils";

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

    return [...firstStacks, ...remainingStacks];
  },
  splitCards(cards, splitNumber) {
    let stacks = [],
      stackCards = [];

    cards.forEach((card, index) => {
      stackCards.push(card);

      if ((index + 1) % splitNumber === 0) {
        card.isOpen = true;
        card.isDraggable = true;

        //For card holder
        stackCards.unshift({
          number: -1,
          isOpen: false,
          isDraggable: false,
        });

        stacks.push(stackCards);
        stackCards = [];
      }
    });

    return stacks;
  },
  getDealtCards(cards) {
    return cards.slice(secondSectionLastCardIndex);
  },
  isDraggable(card, cardStack) {
    let bottomCards = cardStack.slice(cardStack.indexOf(card));

    const isDraggable = utils.isSequential(bottomCards);

    card.isDraggable = isDraggable;

    return isDraggable;
  },
};

export default spiderSolitaireService;
