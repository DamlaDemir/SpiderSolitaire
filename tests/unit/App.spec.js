import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import SpiderSolitaire from "@/pages/SpiderSolitaire.vue";

describe("App.vue", () => {
  it("should display spider solitaire page component", () => {
    const expectedSpiderSolitairePageCount = 2;

    const wrapper = shallowMount(App);

    const actualSpiderSolitairePageCount =
      wrapper.findAllComponents(SpiderSolitaire);

    expect(actualSpiderSolitairePageCount).toHaveLength(
      expectedSpiderSolitairePageCount
    );
  });
});
