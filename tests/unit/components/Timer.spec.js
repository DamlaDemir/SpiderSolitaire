import { shallowMount } from "@vue/test-utils";
import Timer from "@/components/Timer.vue";

jest.useFakeTimers();

describe("Timer.vue", () => {
  it("should displays the total elapsed time as miliseconds when time has passed", async () => {
    const elapsedTime = 3000;
    const expectedElapsedTime = 3000;
    const wrapper = shallowMount(Timer);
    jest.runTimersToTime(elapsedTime);

    const actualElapsedTime = wrapper.vm.elapsedTime;

    await expect(actualElapsedTime).toBe(expectedElapsedTime);
  });

  it("should displays the total elapsed time as time format when time has passed", async () => {
    const elapsedTime = 3 * 1000;
    const expectedElapsedTime = "00:00:03";
    const wrapper = shallowMount(Timer);
    jest.runTimersToTime(elapsedTime);

    const actualElapsedTime = wrapper.vm.formattedElapsedTime;

    await expect(actualElapsedTime).toBe(expectedElapsedTime);
  });
});
