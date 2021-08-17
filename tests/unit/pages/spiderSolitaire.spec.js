import { shallowMount, config } from "@vue/test-utils";
import spiderSolitaire from "@/pages/spiderSolitaire.vue";
import utils from "@/common/helpers/utils.js";
import spiderSolitaireService from "@/services/spiderSolitaireService.js";
import Toastr from "@/components/Toastr/Toastr";
import { scoreRuleEnum } from "@/common/enums/scoreRuleEnum";

config.mocks["$utils"] = utils;
config.mocks["$spiderSolitaireService"] = spiderSolitaireService;
config.mocks["$toastr"] = Toastr;

let mockEvent, spyToastr;

describe("spiderSolitaire.vue", () => {
  beforeAll(() => {
    const mockStorage = new Map();
    mockEvent = {
      target: { id: "card-01" },
      dataTransfer: {
        setData: (key, value) => mockStorage.set(key, value),
        getData: (key) => mockStorage.get(key),
      },
    };
    spyOn(mockEvent.dataTransfer, "setData").and.callThrough();
    spyToastr = jest.spyOn(Toastr, "showToastr");
  });

  describe("mounted function", () => {
    it("should fill cards,stacks and dealtCards array when component was mount", () => {
      const expectedCardsCount = 104;
      const expectedStacksCount = 10;
      const expectedDealtCardsCount = 50;

      const wrapper = shallowMount(spiderSolitaire);

      const actualCards = wrapper.vm.cards;
      const actualStacks = wrapper.vm.stacks;
      const actualDealtCards = wrapper.vm.dealtCards;

      expect(actualCards).toHaveLength(expectedCardsCount);
      expect(actualStacks).toHaveLength(expectedStacksCount);
      expect(actualDealtCards).toHaveLength(expectedDealtCardsCount);
    });
  });

  describe("dragStart function", () => {
    it("selected cards should be dragged if they is sequential", () => {
      const movedCard = {
        number: 8,
        isOpen: true,
        isDraggable: true,
      };
      const movedCardStack = [
        {
          number: -1,
          isOpen: false,
          isDraggable: false,
        },
        {
          number: 11,
          isOpen: false,
          isDraggable: false,
        },
        {
          number: 8,
          isOpen: true,
          isDraggable: true,
        },
      ];
      const movedStackIndex = 0;
      const movedCardIndex = 2;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.vm.dragStart(
        mockEvent,
        movedCard,
        movedCardStack,
        movedStackIndex,
        movedCardIndex
      );

      const actualMovedCard = wrapper.vm.movedCard;
      const actualMovedCardStack = wrapper.vm.movedCardStack;
      const actualMovedStackIndex = wrapper.vm.movedStackIndex;
      const actualMovedCardIndex = wrapper.vm.movedCardIndex;

      expect(actualMovedCard).toEqual(movedCard);
      expect(actualMovedCardStack).toEqual(movedCardStack);
      expect(actualMovedStackIndex).toEqual(movedStackIndex);
      expect(actualMovedCardIndex).toEqual(movedCardIndex);
    });

    it("selected cards shouldn't be dragged if they isn't sequential", async () => {
      const movedCard = {
        number: 8,
        isOpen: true,
        isDraggable: true,
      };
      const movedCardStack = [
        {
          number: 11,
          isOpen: false,
          isDraggable: false,
        },
        {
          number: 8,
          isOpen: true,
          isDraggable: true,
        },
      ];
      const movedStackIndex = 0;
      const movedCardIndex = 0;

      const wrapper = await shallowMount(spiderSolitaire);

      wrapper.vm.dragStart(
        mockEvent,
        movedCard,
        movedCardStack,
        movedStackIndex,
        movedCardIndex
      );

      expect(spyToastr).toHaveBeenCalled();
    });
  });

  describe("dragEnd function", () => {
    it("moved cards should be removed from the current stack", async () => {
      document.body.innerHTML = `
      <div id="card-01" />
    `;
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 11,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 12,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 3,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 10,
            isOpen: true,
            isDraggable: true,
          },
        ],
      ];

      const movedCard = stacks[0][2];
      const targetCard = stacks[1][2];
      const movedCardIndex = 2;
      const movedStackIndex = 0;
      const targetStackIndex = 1;
      const expectedMovedStackCount = 2;

      const wrapper = await shallowMount(spiderSolitaire);

      wrapper.setData({
        stacks,
        movedCardIndex,
        movedStackIndex,
        targetStackIndex,
        movedCard,
        targetCard,
      });

      await wrapper.vm.dragEnd(mockEvent);

      const actualStacks = wrapper.vm.stacks;

      expect(actualStacks[movedStackIndex]).toHaveLength(
        expectedMovedStackCount
      );
    });

    it("moved cards should be added to target stack", async () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 11,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 12,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 3,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 10,
            isOpen: true,
            isDraggable: true,
          },
        ],
      ];

      const movedCard = stacks[0][2];
      const targetCard = stacks[1][2];
      const movedCardStack = stacks[0];
      const movedCardIndex = 2;
      const movedStackIndex = 0;
      const targetStackIndex = 1;
      const expectedTargetStackCount = 5;

      const wrapper = await shallowMount(spiderSolitaire);

      wrapper.setData({
        stacks,
        movedCardIndex,
        movedStackIndex,
        targetStackIndex,
        movedCard,
        targetCard,
        movedCardStack,
      });

      await wrapper.vm.dragEnd(mockEvent);

      const actualStacks = wrapper.vm.stacks;

      expect(actualStacks[targetStackIndex]).toHaveLength(
        expectedTargetStackCount
      );
    });

    it("should be opened last card in the current stack when moved cards are removed from current stack", async () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 11,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 12,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 3,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 10,
            isOpen: true,
            isDraggable: true,
          },
        ],
      ];

      const movedCard = stacks[0][1];
      const targetCard = stacks[1][2];
      const movedCardIndex = 1;
      const movedStackIndex = 0;
      const targetStackIndex = 1;

      const wrapper = await shallowMount(spiderSolitaire);

      wrapper.setData({
        stacks,
        movedCardIndex,
        movedStackIndex,
        targetStackIndex,
        movedCard,
        targetCard,
      });

      await wrapper.vm.dragEnd(mockEvent);

      const actualStack = wrapper.vm.stacks[movedStackIndex];
      const lastCard = actualStack[actualStack.length - 1];

      expect(lastCard.isOpen).toBe(true);
    });
  });

  describe("dragEnter function", () => {
    it("should be filled target stack,card and stackIndex when hovering over the new location of the card", async () => {
      const targetCard = {
        number: 8,
        isOpen: true,
        isDraggable: true,
      };
      const targetCardStack = [
        {
          number: -1,
          isOpen: false,
          isDraggable: false,
        },
        {
          number: 11,
          isOpen: false,
          isDraggable: false,
        },
        {
          number: 8,
          isOpen: true,
          isDraggable: true,
        },
      ];
      const targetStackIndex = 0;

      const wrapper = await shallowMount(spiderSolitaire);

      wrapper.vm.dragEnter(targetCard, targetCardStack, targetStackIndex);

      const actualTargetCard = wrapper.vm.targetCard;
      const actualTargetStack = wrapper.vm.targetStack;
      const actualTargetStackIndex = wrapper.vm.targetStackIndex;

      expect(actualTargetCard).toEqual(targetCard);
      expect(actualTargetStack).toEqual(targetCardStack);
      expect(actualTargetStackIndex).toEqual(targetStackIndex);
    });
  });

  describe("isCompleteHand function", () => {
    it("should return true when a hand is completed", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 1,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 2,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 3,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 4,
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
          {
            number: 7,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 9,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 10,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 11,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 12,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 13,
            isOpen: true,
            isDraggable: false,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: true,
            isDraggable: false,
          },
        ],
      ];
      const targetStackIndex = 0;
      const expectedResult = true;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks: stacks });

      const actualResult = wrapper.vm.isCompleteHand(targetStackIndex);

      expect(actualResult).toBe(expectedResult);
    });

    it("should be removed the completed cards from the stack and be opened last card when hand is completed", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 1,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 2,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 3,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 4,
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
          {
            number: 7,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 9,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 10,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 11,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 12,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 13,
            isOpen: true,
            isDraggable: false,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: true,
            isDraggable: false,
          },
        ],
      ];
      const targetStackIndex = 0;
      const expectedRemainingCardCount = 2;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks: stacks });

      wrapper.vm.isCompleteHand(targetStackIndex);

      const actualStack = wrapper.vm.stacks[targetStackIndex];
      const lastCardInStack = actualStack[actualStack.length - 1];

      expect(actualStack).toHaveLength(expectedRemainingCardCount);
      expect(lastCardInStack.isOpen).toBe(true);
    });

    it("should be filled card holder when hand is completed", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 1,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 2,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 3,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 4,
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
          {
            number: 7,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 9,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 10,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 11,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 12,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 13,
            isOpen: true,
            isDraggable: false,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: true,
            isDraggable: false,
          },
        ],
      ];
      const targetStackIndex = 0;
      const expectedNumberOfFullCardHolder = 1;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks: stacks });

      wrapper.vm.isCompleteHand(targetStackIndex);

      const actualNumberOfFullCardHolder = wrapper.vm.numberOfFullCardHolder;

      expect(actualNumberOfFullCardHolder).toBe(expectedNumberOfFullCardHolder);
    });

    it("should be changed score(complete hand point + last card open point) when hand is completed", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 1,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 2,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 3,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 4,
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
          {
            number: 7,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 9,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 10,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 11,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 12,
            isOpen: true,
            isDraggable: false,
          },
          {
            number: 13,
            isOpen: true,
            isDraggable: false,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: true,
            isDraggable: false,
          },
        ],
      ];
      const targetStackIndex = 0;
      const expectedScore = 1690;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks: stacks });

      wrapper.vm.isCompleteHand(targetStackIndex);

      const actualScore = wrapper.vm.score;

      expect(actualScore).toBe(expectedScore);
    });
  });

  describe("dealCards function", () => {
    it("should display warning message when there is empty stack", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: true,
            isDraggable: false,
          },
        ],
      ];

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks: stacks });

      wrapper.vm.dealCards();

      expect(spyToastr).toHaveBeenCalled();
    });

    it("should be added new card each stacks and be decreased number of the dealt deck when the cards are dealt", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 5,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 9,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
        ],
      ];

      const dealtCards = [
        {
          number: 1,
          isOpen: false,
          isDraggable: false,
        },
        {
          number: 4,
          isOpen: false,
          isDraggable: false,
        },
        {
          number: 7,
          isOpen: false,
          isDraggable: false,
        },
      ];
      const expectedNumberOfToDealtDeck = 4;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks: stacks, dealtCards: dealtCards });

      wrapper.vm.dealCards();

      const actualStacks = wrapper.vm.stacks;
      const actualNumberOfToDealtDeck = wrapper.vm.numberOfToDealtDeck;

      expect(actualStacks[0]).toHaveLength(4);
      expect(actualStacks[1]).toHaveLength(3);
      expect(actualNumberOfToDealtDeck).toBe(expectedNumberOfToDealtDeck);
    });
  });

  describe("isThereEmptyStack function", () => {
    it("should return true if any stack is empty", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: true,
            isDraggable: false,
          },
        ],
      ];
      const expectedResult = true;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks: stacks });

      const actualResult = wrapper.vm.isThereEmptyStack();

      expect(actualResult).toBe(expectedResult);
    });

    it("should return false if all stacks are full", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 9,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: true,
            isDraggable: false,
          },
        ],
      ];
      const expectedResult = false;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks: stacks });

      const actualResult = wrapper.vm.isThereEmptyStack();

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe("openLastCard function", () => {
    it("'isOpen' and 'isdraggable' of the last card should be true when opened last card", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 9,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: false,
            isDraggable: false,
          },
        ],
      ];
      const stackIndex = 1;
      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks: stacks });

      wrapper.vm.openLastCard(stackIndex);

      const actualStack = wrapper.vm.stacks[stackIndex];
      const lastCardInStack = actualStack[actualStack.length - 1];

      expect(lastCardInStack.isOpen).toBe(true);
      expect(lastCardInStack.isDraggable).toBe(true);
    });
  });

  describe("deleteCardsFromStack function", () => {
    it("should be deleted the relevant card and the cards below it when the card is deleted from the stack", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 9,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: false,
            isDraggable: false,
          },
        ],
      ];
      const stackIndex = 1;
      const cardIndex = 0;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks: stacks });

      wrapper.vm.deleteCardsFromStack(stackIndex, cardIndex);

      const actualStack = wrapper.vm.stacks[stackIndex];

      expect(actualStack).toHaveLength(0);
    });
  });

  describe("addCardsToStack function", () => {
    it("should be added given cards in the given stack", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 9,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 8,
            isOpen: false,
            isDraggable: false,
          },
        ],
      ];
      const cards = [
        {
          number: 9,
          isOpen: true,
          isDraggable: true,
        },
        {
          number: 10,
          isOpen: true,
          isDraggable: true,
        },
      ];
      const stackIndex = 1;
      const expectedStackCount = 5;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks: stacks });

      wrapper.vm.addCardsToStack(stackIndex, cards);

      const actualStack = wrapper.vm.stacks[stackIndex];

      expect(actualStack).toHaveLength(expectedStackCount);
    });
  });

  describe("fillCardHolder function", () => {
    it("should be increased number of full card holder", async () => {
      const expectedNumberOfFullCardHolder = 1;

      const wrapper = await shallowMount(spiderSolitaire);

      await wrapper.vm.fillCardHolder();

      const actualNumberOfFullCardHolder = wrapper.vm.numberOfFullCardHolder;

      expect(actualNumberOfFullCardHolder).toBe(expectedNumberOfFullCardHolder);
    });

    it("the game should be over when the number of full card holder equals to the total number of decks", async () => {
      const numberOfFullCardHolder = 7;
      const expectedIsGameOver = true;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ numberOfFullCardHolder });

      await wrapper.vm.fillCardHolder();

      const actualIsGameOver = wrapper.vm.isGameOver;

      expect(actualIsGameOver).toBe(expectedIsGameOver);
    });
  });

  describe("isMovable function", () => {
    it("should return true if moved card and target card are sequential", () => {
      const movedCard = {
        number: 10,
        isOpen: true,
        isDraggable: true,
      };
      const targetCard = {
        number: 9,
        isOpen: true,
        isDraggable: true,
      };
      const expectedResult = true;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ movedCard, targetCard });

      const actualResult = wrapper.vm.isMovable();

      expect(actualResult).toBe(expectedResult);
    });

    it("should return false if moved card and target card aren't sequential", () => {
      const movedCard = {
        number: 11,
        isOpen: true,
        isDraggable: true,
      };
      const targetCard = {
        number: 9,
        isOpen: true,
        isDraggable: true,
      };
      const expectedResult = false;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ movedCard, targetCard });

      const actualResult = wrapper.vm.isMovable();

      expect(actualResult).toBe(expectedResult);
    });
  });

  describe("gameOver function", () => {
    it("'isGameOver' data should be true and display congratulatory message", () => {
      const epectedIsGameOver = true;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.vm.gameOver();

      const actualIsGameOver = wrapper.vm.isGameOver;

      expect(actualIsGameOver).toBe(epectedIsGameOver);
      expect(spyToastr).toHaveBeenCalled();
    });
  });

  describe("calculateScore function", () => {
    it("should be added 1040 points to score when each time a hand is completed", () => {
      const rule = scoreRuleEnum.completeHand;
      const expectedScore = 1540;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.vm.calculateScore(rule);

      const actualScore = wrapper.vm.score;

      expect(actualScore).toBe(expectedScore);
    });

    it("should be added 150 points when every closed card is opened", () => {
      const rule = scoreRuleEnum.openCard;
      const expectedScore = 650;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.vm.calculateScore(rule);

      const actualScore = wrapper.vm.score;

      expect(actualScore).toBe(expectedScore);
    });

    it("should be calculated total score when game is over", async () => {
      const rule = scoreRuleEnum.completeHand;
      const totalTimeSecond = 3;
      const expectedScore = 15310;

      const wrapper = await shallowMount(spiderSolitaire);

      await wrapper.vm.calculateScore(rule);

      wrapper.setData({ isGameOver: true });

      await wrapper.vm.setTotalTime(totalTimeSecond);

      const actualScore = wrapper.vm.score;

      expect(actualScore).toBe(expectedScore);
    });
  });

  describe("setTotalTime function", () => {
    it("the total time should be filled with the given time", () => {
      const totalTimeSecond = 3;
      const expectedTotalTime = 3;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.vm.setTotalTime(totalTimeSecond);

      const actualTotalTime = wrapper.vm.totalTime;

      expect(actualTotalTime).toBe(expectedTotalTime);
    });
  });

  describe("restartGame function", () => {
    it("page should be relloaded", () => {
      Object.defineProperty(window, "location", {
        writable: true,
        value: { reload: jest.fn() },
      });

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.vm.restartGame();

      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  describe("calculateHints function", () => {
    it("Hints should be calculated", () => {
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 5,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 6,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 5,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 7,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 4,
            isOpen: true,
            isDraggable: true,
          },
        ],
      ];
      const expectedHints = [
        {
          currentStackIndex: 0,
          currentCardIndexes: [1, 2],
          targetStackIndex: 2,
          targetCardIndex: 2,
        },
        {
          currentStackIndex: 1,
          currentCardIndexes: [2],
          targetStackIndex: 0,
          targetCardIndex: 2,
        },
      ];

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks });

      wrapper.vm.calculateHints();

      const actualHints = wrapper.vm.hints;

      expect(actualHints).toEqual(expectedHints);
    });
  });

  describe("getHints function", () => {
    it("each time a hint is shown, the index of the next hint should be kept", () => {
      document.body.innerHTML = `
      <div id="card-01" />
      <div id="card-02" />
      <div id="card-12" />
      <div id="card-22" />
    `;
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 5,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 6,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 5,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 7,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 4,
            isOpen: true,
            isDraggable: true,
          },
        ],
      ];
      const expectedLastShowedHintIndex = 1;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks });

      wrapper.vm.getHints();

      const actualLastShowedHintIndex = wrapper.vm.lastShowedHintIndex;

      expect(actualLastShowedHintIndex).toEqual(expectedLastShowedHintIndex);
    });

    it("cards shown as hint should be painted", () => {
      document.body.innerHTML = `
      <div id="card-01" />
      <div id="card-02" />
      <div id="card-12" />
      <div id="card-22" />
    `;
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 5,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 6,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 5,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 7,
            isOpen: true,
            isDraggable: true,
          },
        ],
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 4,
            isOpen: true,
            isDraggable: true,
          },
        ],
      ];
      const expectedBorderCss = "1vh solid #874444";
      const expectedBackgroundColorCss = "rgb(135, 68, 68)";
      const expectedBorderRadiusCss = "1vw";

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks });

      wrapper.vm.getHints();

      const card01 = document.getElementById("card-01");
      const card02 = document.getElementById("card-02");

      expect(card01.style.border).toBe(expectedBorderCss);
      expect(card01.style.backgroundColor).toBe(expectedBackgroundColorCss);
      expect(card01.style.borderRadius).toBe(expectedBorderRadiusCss);

      expect(card02.style.border).toBe(expectedBorderCss);
      expect(card02.style.backgroundColor).toBe(expectedBackgroundColorCss);
      expect(card02.style.borderRadius).toBe(expectedBorderRadiusCss);
    });

    it("After 1.5 seconds, the css properties of the painted card should be reset", () => {
      jest.useFakeTimers();
      document.body.innerHTML = `
      <div id="card-01" />
      <div id="card-02" />
      <div id="card-12" />
      <div id="card-22" />
    `;
      const hints = [
        {
          currentStackIndex: 0,
          currentCardIndexes: [1, 2],
          targetStackIndex: 2,
          targetCardIndex: 2,
        },
        {
          currentStackIndex: 1,
          currentCardIndexes: [2],
          targetStackIndex: 0,
          targetCardIndex: 2,
        },
      ];

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ hints });

      wrapper.vm.getHints();

      jest.runTimersToTime(1500);

      const card01 = document.getElementById("card-01");
      const card02 = document.getElementById("card-02");

      expect(card01.style.border).toBe("");
      expect(card01.style.backgroundColor).toBe("");
      expect(card01.style.borderRadius).toBe("");
      expect(card02.style.border).toBe("");
      expect(card02.style.backgroundColor).toBe("");
      expect(card02.style.borderRadius).toBe("");
    });

    it("After all the hints have been shown, it should be shown all over again.", () => {
      document.body.innerHTML = `
      <div id="card-01" />
      <div id="card-02" />
      <div id="card-12" />
      <div id="card-22" />
    `;
      const hints = [
        {
          currentStackIndex: 0,
          currentCardIndexes: [1, 2],
          targetStackIndex: 2,
          targetCardIndex: 2,
        },
        {
          currentStackIndex: 1,
          currentCardIndexes: [2],
          targetStackIndex: 0,
          targetCardIndex: 2,
        },
      ];
      const lastShowedHintIndex = 2;
      const expectedLastShowedHintIndex = 1;

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ hints, lastShowedHintIndex });

      wrapper.vm.getHints();

      const actualLastShowedHintIndex = wrapper.vm.lastShowedHintIndex;

      expect(actualLastShowedHintIndex).toEqual(expectedLastShowedHintIndex);
    });

    it("When there are no hints, the card to be dealt should be painted.", () => {
      document.body.innerHTML = `
      <div id="deck-first" />
    `;
      const stacks = [
        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 5,
            isOpen: true,
            isDraggable: true,
          },
          {
            number: 11,
            isOpen: true,
            isDraggable: true,
          },
        ],

        [
          {
            number: -1,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 7,
            isOpen: false,
            isDraggable: false,
          },
          {
            number: 4,
            isOpen: true,
            isDraggable: true,
          },
        ],
      ];
      const expectedBorderCss = "1vh solid #874444";
      const expectedBackgroundColorCss = "rgb(135, 68, 68)";
      const expectedBorderRadiusCss = "1vw";

      const wrapper = shallowMount(spiderSolitaire);

      wrapper.setData({ stacks });

      wrapper.vm.getHints();

      const deckFirst = document.getElementById("deck-first");

      expect(deckFirst.style.border).toBe(expectedBorderCss);
      expect(deckFirst.style.backgroundColor).toBe(expectedBackgroundColorCss);
      expect(deckFirst.style.borderRadius).toBe(expectedBorderRadiusCss);
    });
  });
});
