import { shallowMount } from "@vue/test-utils";
import ConfirmBox from "@/components/ConfirmBox.vue";

describe("ConfirmBox.vue", () => {
  it("should display confirmbox", () => {
    const showConfirm = true;

    const wrapper = shallowMount(ConfirmBox, {
      propsData: {
        showConfirm: showConfirm,
      },
    });

    const actualConfirmBox = wrapper.findAll(".confirmbox");

    expect(actualConfirmBox.exists()).toBeTruthy();
  });

  it("shouldn't display confirmbox", () => {
    const showConfirm = false;

    const wrapper = shallowMount(ConfirmBox, {
      propsData: {
        showConfirm: showConfirm,
      },
    });

    const actualConfirmBox = wrapper.findAll(".confirmbox");

    expect(actualConfirmBox.exists()).toBeFalsy();
  });

  it("should emit changeConfirmBoxVisibilty function", () => {
    const showConfirm = true;

    const wrapper = shallowMount(ConfirmBox, {
      propsData: {
        showConfirm: showConfirm,
      },
    });

    wrapper.vm.reject();

    expect(wrapper.emitted().changeConfirmBoxVisibilty).toBeTruthy();
  });

  it("should emit accept function", () => {
    const wrapper = shallowMount(ConfirmBox);

    wrapper.vm.accept();

    expect(wrapper.emitted().accept).toBeTruthy();
  });
});
