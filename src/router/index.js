import Vue from "vue";
import VueRouter from "vue-router";
import SpiderSolitaire from "@/pages/SpiderSolitaire.vue";
import GameInfoModal from "@/components/GameInfoModal";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "gameInfo",
    component: GameInfoModal,
  },
  {
    path: "/spiderSolitaire",
    name: "spiderSolitaire",
    component: SpiderSolitaire,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
