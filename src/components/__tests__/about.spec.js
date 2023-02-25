import About from "@/views/About.vue";
// import { mount } from "@vue/test-utils";: mounts with child, while shallowMount: limits mount to component with it's
import { shallowMount } from "@vue/test-utils";

// allow for group more test suits together
describe("About.vue", () => {
  test("renders inner text", () => {
    const wrapper = shallowMount(About);

    expect(wrapper.text()).toContain("about");
  });
});
