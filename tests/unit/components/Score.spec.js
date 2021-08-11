import { shallowMount } from "@vue/test-utils";
import Score from "@/components/Score.vue";

describe("Score.vue", () => {
  it("should display score when passed score as props", async () => {
    const score = 800;
    const expectedScore = "800";

    const wrapper = shallowMount(Score);
    await wrapper.setProps({ score: score });

    const actualScore = wrapper.text();

    expect(actualScore).toMatch(expectedScore);
  });
});
