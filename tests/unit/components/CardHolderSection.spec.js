import { shallowMount } from "@vue/test-utils";
import CardHolderSection from "@/components/CardHolderSection.vue";
import EmptyCardHolder from "@/components/EmptyCardHolder.vue";

describe("CardHolderSection.vue", () => {
  it("should display eight empty card holder when passed numberOfFullCardHolder as zero", () => {
    const totalNumberOfDecks = 8;
    const numberOfFullCardHolder = 0;
    const expectedFullCardHolderCount = 0;
    const expectedEmptyCardHolderCount = 8;

    const wrapper = shallowMount(CardHolderSection, {
      propsData: {
        totalNumberOfDecks: totalNumberOfDecks,
        numberOfFullCardHolder: numberOfFullCardHolder,
      },
    });

    const actualEmptyCardHolders = wrapper.findAllComponents(EmptyCardHolder);
    const actualFullCardHolders = wrapper.findAll(".full-card-holder");

    expect(actualEmptyCardHolders).toHaveLength(expectedEmptyCardHolderCount);
    expect(actualFullCardHolders).toHaveLength(expectedFullCardHolderCount);
  });

  it("should display two full card holder and six empty card holder when passed numberOfFullCardHolder as two", () => {
    const totalNumberOfDecks = 8;
    const numberOfFullCardHolder = 2;
    const expectedFullCardHolderCount = 2;
    const expectedEmptyCardHolderCount = 6;

    const wrapper = shallowMount(CardHolderSection, {
      propsData: {
        totalNumberOfDecks: totalNumberOfDecks,
        numberOfFullCardHolder: numberOfFullCardHolder,
      },
    });

    const actualEmptyCardHolders = wrapper.findAllComponents(EmptyCardHolder);
    const actualFullCardHolders = wrapper.findAll(".full-card-holder");

    expect(actualEmptyCardHolders).toHaveLength(expectedEmptyCardHolderCount);
    expect(actualFullCardHolders).toHaveLength(expectedFullCardHolderCount);
  });

  it("should change full card holder count when numberOfFullCardHolder props change", async () => {
    const totalNumberOfDecks = 8;
    const initialNumberOfFullCardHolder = 2;
    const newNumberOfFullCardHolder = 3;
    const expectedFullCardHolderCount = 3;
    const expectedEmptyCardHolderCount = 5;

    const wrapper = shallowMount(CardHolderSection, {
      propsData: {
        totalNumberOfDecks: totalNumberOfDecks,
        numberOfFullCardHolder: initialNumberOfFullCardHolder,
      },
    });

    await wrapper.setProps({
      totalNumberOfDecks: totalNumberOfDecks,
      numberOfFullCardHolder: newNumberOfFullCardHolder,
    });

    const actualEmptyCardHolders = wrapper.findAllComponents(EmptyCardHolder);
    const actualFullCardHolders = wrapper.findAll(".full-card-holder");

    expect(actualEmptyCardHolders).toHaveLength(expectedEmptyCardHolderCount);
    expect(actualFullCardHolders).toHaveLength(expectedFullCardHolderCount);
  });
});
