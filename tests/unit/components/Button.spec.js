import { shallowMount } from "@vue/test-utils";
import Button from "@/components/Button.vue";

describe("Button.vue", () => {
  it("should display 'restart' when passed button text as 'restart'", async () => {
    const text = "RESTART";
    const expectedText = "RESTART";

    const wrapper = shallowMount(Button, {
      propsData: {
        text: text,
        icon: "restart",
      },
    });

    const actualText = wrapper.text();

    expect(actualText).toMatch(expectedText);
  });

  it("should uploaded image when passed icon as props", async () => {
    const icon = "hint";

    const wrapper = shallowMount(Button, {
      propsData: {
        text: "HINT",
        icon: icon,
      },
    });

    const actualImg = wrapper.findAll("#buttonIcon");
    expect(actualImg.length).toBe(1);
  });
});
