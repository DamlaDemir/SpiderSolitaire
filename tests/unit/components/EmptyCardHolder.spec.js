import { shallowMount } from "@vue/test-utils";
import EmptyCardHolder from "@/components/EmptyCardHolder.vue";

describe("EmptyCardHolder.vue", () => {
  it("should display empty card holder", () => {
    const expectedEmptyCardHolderCount = 1;

    const wrapper = shallowMount(EmptyCardHolder);

    const actualEmptyCardHolder = wrapper.findAll(".card-holder");

    expect(actualEmptyCardHolder).toHaveLength(expectedEmptyCardHolderCount);
  });

  it("should display empty card holder with ban icon when passed ban props as true", () => {
    const ban = true;
    const expectedBanIconCount = 1;

    const wrapper = shallowMount(EmptyCardHolder, {
      propsData: {
        ban: ban,
      },
    });

    const actualBanIcon = wrapper.findAll(".ban");

    expect(actualBanIcon).toHaveLength(expectedBanIconCount);
  });
});
