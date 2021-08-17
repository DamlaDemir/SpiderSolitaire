import Vue from "vue";
import App from "./App.vue";
import spiderSolitaireService from "@/services/spiderSolitaireService";
import utils from "@/common/helpers/utils";
import Toastr from "@/components/Toastr/Toastr";

require("./components/Toastr/Toastr.css");

Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, "$spiderSolitaireService", {
  value: spiderSolitaireService,
});
Object.defineProperty(Vue.prototype, "$utils", { value: utils });
Object.defineProperty(Vue.prototype, "$toastr", { value: Toastr });

new Vue({
  render: (h) => h(App),
}).$mount("#app");
