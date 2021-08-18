import { shallowMount } from "@vue/test-utils";
import Card from "@/components/Card.vue";
import EmptyCardHolder from "@/components/EmptyCardHolder.vue";

let mockEvent;

describe("Card.vue", () => {
  beforeAll(() => {
    const mockStorage = new Map();
    mockEvent = {
      target: { id: 5 },
      dataTransfer: {
        setData: (key, value) => mockStorage.set(key, value),
        getData: (key) => mockStorage.get(key),
      },
    };
    spyOn(mockEvent.dataTransfer, "setData").and.callThrough();
  });

  it("should display open card", () => {
    const card = {
      number: 8,
      isOpen: true,
      isDraggable: true,
    };
    const cardStack = [
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
    const stackIndex = 0;
    const cardIndex = 1;

    const wrapper = shallowMount(Card, {
      propsData: {
        card: card,
        stack: cardStack,
        stackIndex: stackIndex,
        cardIndex: cardIndex,
      },
    });

    const actualCard = wrapper.findAll(".open-card");

    expect(actualCard.exists()).toBe(true);
  });

  it("should display close card", () => {
    const card = {
      number: 11,
      isOpen: false,
      isDraggable: false,
    };
    const cardStack = [
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
    const stackIndex = 0;
    const cardIndex = 0;

    const wrapper = shallowMount(Card, {
      propsData: {
        card: card,
        stack: cardStack,
        stackIndex: stackIndex,
        cardIndex: cardIndex,
      },
    });

    const actualCard = wrapper.findAll(".close-card");

    expect(actualCard.exists()).toBe(true);
  });

  it("should display empty card holder", () => {
    const card = {
      number: -1,
      isOpen: true,
      isDraggable: false,
    };
    const cardStack = [
      {
        number: -1,
        isOpen: true,
        isDraggable: false,
      },
      {
        number: 8,
        isOpen: true,
        isDraggable: true,
      },
    ];
    const stackIndex = 0;
    const cardIndex = 0;

    const wrapper = shallowMount(Card, {
      propsData: {
        card: card,
        stack: cardStack,
        stackIndex: stackIndex,
        cardIndex: cardIndex,
      },
    });

    const actualEmptyCardHolder = wrapper.getComponent(EmptyCardHolder);

    expect(actualEmptyCardHolder.exists()).toBe(true);
  });

  it("should emit drag start function", () => {
    const card = {
      number: 8,
      isOpen: true,
      isDraggable: true,
    };
    const cardStack = [
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
    const stackIndex = 0;
    const cardIndex = 1;

    const wrapper = shallowMount(Card, {
      propsData: {
        card: card,
        stack: cardStack,
        stackIndex: stackIndex,
        cardIndex: cardIndex,
      },
    });

    wrapper.vm.dragStart(mockEvent, card, cardStack, stackIndex, cardIndex);

    expect(wrapper.emitted().dragStart).toBeTruthy();
  });

  it("should emit drag end function", () => {
    const card = {
      number: 8,
      isOpen: true,
      isDraggable: true,
    };
    const cardStack = [
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
    const stackIndex = 0;
    const cardIndex = 1;

    const wrapper = shallowMount(Card, {
      propsData: {
        card: card,
        stack: cardStack,
        stackIndex: stackIndex,
        cardIndex: cardIndex,
      },
    });

    wrapper.vm.dragEnd(mockEvent);

    expect(wrapper.emitted().dragEnd).toBeTruthy();
  });

  it("should emit drag enter function", () => {
    const card = {
      number: 8,
      isOpen: true,
      isDraggable: true,
    };
    const cardStack = [
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
    const stackIndex = 0;
    const cardIndex = 1;

    const wrapper = shallowMount(Card, {
      propsData: {
        card: card,
        stack: cardStack,
        stackIndex: stackIndex,
        cardIndex: cardIndex,
      },
    });

    wrapper.vm.dragEnter(card, cardStack, cardIndex, stackIndex);

    expect(wrapper.emitted().dragEnter).toBeTruthy();
  });
});
