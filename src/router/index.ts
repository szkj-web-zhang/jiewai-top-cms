import { createRouter } from "vue-router";
import { routerModeSelect } from "@/utils/router-mode";

const router = createRouter({
  history: routerModeSelect(),
  routes: []
});

router.beforeEach((_to, _from, next) => {
  window.location.href = "/entrance";
  return next();
});

export default router;
