import { useDynamicMuneStore } from "@/stores/modules/dynamic-menu";
import { routerModeSelect } from "@/utils/router-mode";
import { createRouter } from "vue-router";

const router = createRouter({
  history: routerModeSelect("system-module"),
  routes: [
    {
      path: "/",
      name: "main",
      redirect: "/home",
      component: () => import("~/system-module/views/index.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          meta: {
            icon: "HomeFilled",
            title: "首页",
            isKeepAlive: true
          },
          component: () => import("~/system-module/views/index.vue")
        }
      ]
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const dynamicMenuStore = useDynamicMuneStore();
  await dynamicMenuStore.getDynamicMenuList("system:list");
  next();
});

export default router;
