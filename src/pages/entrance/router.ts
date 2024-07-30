import { createRouter } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { routerModeSelect } from "@/utils/router-mode";

const router = createRouter({
  history: routerModeSelect("/entrance"),
  routes: [
    {
      path: "/",
      redirect: "/entry"
    },
    {
      path: "/entry",
      name: "entry",
      component: () => import("~/entrance/views/entry-page/index.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("~/entrance/views/login-page/index.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.path.toLocaleLowerCase() === "/login") {
    if (userStore.token) {
      return next(from.fullPath);
    }
    return next();
  }
  if (!userStore.token) return next({ path: "/login", replace: true });
  next();
});

export default router;
