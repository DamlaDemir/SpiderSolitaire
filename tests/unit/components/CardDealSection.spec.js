import { shallowMount } from "@vue/test-utils";
import CardDealSection from "@/components/CardDealSection.vue";
import EmptyCardHolder from "@/components/EmptyCardHolder.vue";

describe("CardDealSection.vue", () => {
  it("should display dealt cards image when passed numberOfToDealtDeck as props", () => {
    const numberOfToDealtDeck = 5;
    const expectedDealtCardCount = 5;

    const wrapper = shallowMount(CardDealSection, {
      propsData: {
        numberOfToDealtDeck: numberOfToDealtDeck,
      },
    });

    const actualDealtCards = wrapper.findAll(".deck");

    expect(actualDealtCards.length).toBe(expectedDealtCardCount);
  });

  it("should display 'EmptyCardHolder' component when passed numberOfToDealtDeck as zero", () => {
    const numberOfToDealtDeck = 0;

    const wrapper = shallowMount(CardDealSection, {
      propsData: {
        numberOfToDealtDeck: numberOfToDealtDeck,
      },
    });

    const actualEmptyCardHolder = wrapper.getComponent(EmptyCardHolder);
    const actualDealtCards = wrapper.findAll(".deck");

    expect(actualEmptyCardHolder.exists()).toBe(true);
    expect(actualDealtCards.exists()).toBe(false);
  });

  it("should emit dealCards function", () => {
    const wrapper = shallowMount(CardDealSection);

    wrapper.vm.dealCards();

    expect(wrapper.emitted().dealCards).toBeTruthy();
  });
});
