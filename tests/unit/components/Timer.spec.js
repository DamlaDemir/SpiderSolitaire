import { shallowMount } from "@vue/test-utils";
import Timer from "@/components/Timer.vue";

jest.useFakeTimers();

describe("Timer.vue", () => {
  it("should display the total elapsed time in milliseconds", () => {
    const elapsedTime = 3000;
    const expectedElapsedTime = 3000;

    const wrapper = shallowMount(Timer);

    jest.runTimersToTime(elapsedTime);

    const actualElapsedTime = wrapper.vm.elapsedTime;

    expect(actualElapsedTime).toBe(expectedElapsedTime);
  });

  it("should display the total elapsed time as time format", () => {
    const elapsedTime = 3 * 1000;
    const expectedElapsedTime = "00:00:03";

    const wrapper = shallowMount(Timer);

    jest.runTimersToTime(elapsedTime);

    const actualElapsedTime = wrapper.vm.formattedElapsedTime;

    expect(actualElapsedTime).toBe(expectedElapsedTime);
  });
});
