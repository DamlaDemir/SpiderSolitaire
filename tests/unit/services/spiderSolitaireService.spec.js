import { shallowMount } from "@vue/test-utils";
import spiderSolitaireService from "@/services/spiderSolitaireService.js";
import { constants } from "@/common/constants/constants.js";

const {
  splitCardInfo: { firstSectionLastCardIndex },
  totalNumberOfDecks,
  totalNumberOfCards,
} = constants;

let cards = [],
  mockLog;

describe("spiderSolitaireService.js", () => {
  beforeAll(() => {
    createTestCards();
    mockLog = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  describe("generateStacks function", () => {
    it("should generate 10 stack of the given cards", () => {
      const actualStacks = spiderSolitaireService.generateStacks(cards);

      expect(actualStacks[0]).toHaveLength(7);
      expect(actualStacks[1]).toHaveLength(7);
      expect(actualStacks[2]).toHaveLength(7);
      expect(actualStacks[3]).toHaveLength(7);
      expect(actualStacks[4]).toHaveLength(6);
      expect(actualStacks[5]).toHaveLength(6);
      expect(actualStacks[6]).toHaveLength(6);
      expect(actualStacks[7]).toHaveLength(6);
      expect(actualStacks[8]).toHaveLength(6);
      expect(actualStacks[9]).toHaveLength(6);
    });

    it("should throw error when given card array is undefined", () => {
      const cards = undefined;
      const expectedError =
        "Error ! Msg: Cannot read property 'slice' of undefined";

      const actualResult = () => spiderSolitaireService.generateStacks(cards);

      expect(actualResult).toThrowError(expectedError);
      expect(mockLog).toBeCalledWith(expectedError);
    });
  });

  describe("splitCards function", () => {
    it("should return 4 stack with 6 cards each one", () => {
      const splitNumber = 6;
      const firstSectionCards = cards.slice(0, firstSectionLastCardIndex);

      const actualStacks = spiderSolitaireService.splitCards(
        firstSectionCards,
        splitNumber
      );

      expect(actualStacks[0]).toHaveLength(6);
      expect(actualStacks[1]).toHaveLength(6);
      expect(actualStacks[2]).toHaveLength(6);
      expect(actualStacks[3]).toHaveLength(6);
    });

    it("should throw error when given card array is undefined", () => {
      const splitNumber = 6;
      const firstSectionCards = undefined;
      const expectedError =
        "Error ! Msg: Cannot read property 'forEach' of undefined";

      const actualResult = () =>
        spiderSolitaireService.splitCards(firstSectionCards, splitNumber);

      expect(actualResult).toThrowError(expectedError);
      expect(mockLog).toBeCalledWith(expectedError);
    });
  });

  describe("openAllLastCards function", () => {
    it("should open last card in each stack", () => {
      const stacks = [
        [
          {
            number: 1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 2,
            isOpen: false,
            isDraggable: false,
          },
        ],
        [
          {
            number: 3,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 4,
            isOpen: false,
            isDraggable: false,
          },
        ],
      ];

      spiderSolitaireService.openAllLastCards(stacks);

      expect(stacks[0][1].isOpen).toBeTruthy();
      expect(stacks[1][1].isOpen).toBeTruthy();
    });

    it("should throw error when one of the stacks is empty", () => {
      const stacks = [
        [],
        [
          {
            number: 3,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 4,
            isOpen: false,
            isDraggable: false,
          },
        ],
      ];
      const expectedError =
        "Error ! Msg: Cannot set property 'isOpen' of undefined";

      const actualResult = () =>
        spiderSolitaireService.openAllLastCards(stacks);

      expect(actualResult).toThrowError(expectedError);
      expect(mockLog).toBeCalledWith(expectedError);
    });
  });

  describe("addCardItemForCardHolder function", () => {
    it("should add new card item for card holder with card number -1", () => {
      const expectedStackLength = 3;
      const expectedNewCardNumber = -1;
      const stacks = [
        [
          {
            number: 1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 2,
            isOpen: false,
            isDraggable: false,
          },
        ],
        [
          {
            number: 3,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 4,
            isOpen: false,
            isDraggable: false,
          },
        ],
      ];

      spiderSolitaireService.addCardItemForCardHolder(stacks);

      expect(stacks[0]).toHaveLength(expectedStackLength);
      expect(stacks[1]).toHaveLength(expectedStackLength);

      expect(stacks[0][0].number).toBe(expectedNewCardNumber);
      expect(stacks[1][0].number).toBe(expectedNewCardNumber);
    });

    it("should throw error when given stack array is undefined", async () => {
      const stacks = undefined;
      const expectedError =
        "Error ! Msg: Cannot read property 'forEach' of undefined";

      const actualResult = () =>
        spiderSolitaireService.addCardItemForCardHolder(stacks);

      expect(actualResult).toThrowError(expectedError);
      expect(mockLog).toBeCalledWith(expectedError);
    });
  });

  describe("getDealtCards function", () => {
    it("should return the cards to be dealt", () => {
      const expectedDealtCardsCount = 50;

      let actualDealtCards = spiderSolitaireService.getDealtCards(cards);

      expect(actualDealtCards).toHaveLength(expectedDealtCardsCount);
    });
  });

  describe("isDraggable function", () => {
    it("should return true for cards that are sequential", () => {
      const cardIndex = 1;
      const stack = [
        {
          number: 1,
          isOpen: true,
          isDraggable: false,
        },
        {
          number: 5,
          isOpen: true,
          isDraggable: false,
        },
        {
          number: 6,
          isOpen: true,
          isDraggable: false,
        },
      ];

      let actualResult = spiderSolitaireService.isDraggable(stack, cardIndex);

      expect(actualResult).toBe(true);
    });

    it("should return false for cards that aren't sequential", () => {
      const cardIndex = 1;
      const stack = [
        {
          number: 1,
          isOpen: true,
          isDraggable: false,
        },
        {
          number: 5,
          isOpen: true,
          isDraggable: false,
        },
        {
          number: 9,
          isOpen: true,
          isDraggable: false,
        },
      ];

      let actualResult = spiderSolitaireService.isDraggable(stack, cardIndex);

      expect(actualResult).toBe(false);
    });

    it("should throw error when card stack is undefined", () => {
      const cardIndex = 1;
      const stack = undefined;
      const expectedError =
        "Error ! Msg: Cannot read property 'slice' of undefined";

      let actualResult = () =>
        spiderSolitaireService.isDraggable(stack, cardIndex);

      expect(actualResult).toThrowError(expectedError);
      expect(mockLog).toBeCalledWith(expectedError);
    });
  });

  describe("getCountOfSequentialCards function", () => {
    it("should return the number of sequential cards in the given array", () => {
      const expectedSequentialCardCount = 2;
      const stack = [
        {
          number: -1,
          isOpen: false,
          isDraggable: false,
        },
        {
          number: 5,
          isOpen: true,
          isDraggable: false,
        },
        {
          number: 6,
          isOpen: true,
          isDraggable: false,
        },
      ];

      let actualResult =
        spiderSolitaireService.getCountOfSequentialCards(stack);

      expect(actualResult).toBe(expectedSequentialCardCount);
    });
    it("should throw error when stack is undefined", () => {
      const stack = undefined;
      const expectedError =
        "Error ! Msg: Cannot read property 'length' of undefined";

      let actualResult = () =>
        spiderSolitaireService.getCountOfSequentialCards(stack);

      expect(actualResult).toThrowError(expectedError);
      expect(mockLog).toBeCalledWith(expectedError);
    });
  });
});

const createTestCards = () => {
  for (let i = 1; i <= totalNumberOfCards * totalNumberOfDecks; i++) {
    let number = i % totalNumberOfCards;

    cards.push({
      number: number === 0 ? totalNumberOfCards : number,
      isOpen: false,
      isDraggable: false,
    });
  }
};
