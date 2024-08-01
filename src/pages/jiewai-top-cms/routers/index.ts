import { routerModeSelect } from "@/utils/router-mode";
import { createRouter } from "vue-router";
import routes from "./router";
import { useUserStore } from "@/stores/modules/user";

const router = createRouter({
  history: routerModeSelect("jiewai-top-cms"),
  routes
});

router.beforeEach((_to, _from, next) => {
  const userStore = useUserStore();
  const factor = window.location.pathname.includes("jiewai-top-cms");
  if (factor && userStore.satoken) return next();
  if (!userStore.satoken) {
    window.location.href = "/login";
    window.localStorage.removeItem("jiewai-top-cms-tab");
    window.localStorage.removeItem("jiewai-top-cms-global");
    next();
  }
});

export default router;
