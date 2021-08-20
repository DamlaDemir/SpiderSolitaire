import { shallowMount } from "@vue/test-utils";
import HeaderSection from "@/components/HeaderSection.vue";
import Button from "@/components/Button.vue";
import Score from "@/components/Score.vue";
import Timer from "@/components/Timer.vue";

describe("HeaderSection.vue", () => {
  it("should display hint and restart button", () => {
    const expectedButtonComponentCount = 2;

    const wrapper = shallowMount(HeaderSection);

    const actualButtonComponents = wrapper.findAllComponents(Button);

    expect(actualButtonComponents).toHaveLength(expectedButtonComponentCount);
  });

  it("should display score component", () => {
    const expectedScoreComponentCount = 1;

    const wrapper = shallowMount(HeaderSection);

    const actualScoreComponents = wrapper.findAllComponents(Score);

    expect(actualScoreComponents).toHaveLength(expectedScoreComponentCount);
  });

  it("should display timer component", () => {
    const expectedTimerComponentCount = 1;

    const wrapper = shallowMount(HeaderSection);

    const actualTimerComponents = wrapper.findAllComponents(Timer);

    expect(actualTimerComponents).toHaveLength(expectedTimerComponentCount);
  });

  it("should emit setTotalTime function", () => {
    const totalTime = 3;
    const wrapper = shallowMount(HeaderSection);

    wrapper.vm.setTotalTime(totalTime);

    expect(wrapper.emitted().setTotalTime).toBeTruthy();
  });
});
