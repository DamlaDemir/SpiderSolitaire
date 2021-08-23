import { shallowMount } from "@vue/test-utils";
import GameInfoModal from "@/components/GameInfoModal.vue";

describe("GameInfoModal.vue", () => {
  it("GameInfoModal should be display", () => {
    const expectedText = "REVERSED SPIDER SOLITAIRE RULES";

    const wrapper = shallowMount(GameInfoModal);

    const actualText = wrapper.text();

    expect(actualText).toContain(expectedText);
  });
});
