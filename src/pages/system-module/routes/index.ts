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

export default router;
