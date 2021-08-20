import { shallowMount } from "@vue/test-utils";
import Button from "@/components/Button.vue";

describe("Button.vue", () => {
  it("Button text should be 'restart' when passed button text as 'restart'", () => {
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

  it("should upload icon when passed icon as props", () => {
    const icon = "hint";
    const text = "HINT";

    const wrapper = shallowMount(Button, {
      propsData: {
        text: text,
        icon: icon,
      },
    });

    const actualIcon = wrapper.findAll(".hint-icon");

    expect(actualIcon.exists()).toBeTruthy();
  });

  it("should emit onClick function", () => {
    const icon = "hint";
    const text = "HINT";

    const wrapper = shallowMount(Button, {
      propsData: {
        text: text,
        icon: icon,
      },
    });

    wrapper.vm.onClick();

    expect(wrapper.emitted().onClick).toBeTruthy();
  });
});
