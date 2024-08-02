import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "main",
    redirect: "/home",
    component: () => import("~/jiewai-top-cms/views/main/home-page.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          icon: "HomeFilled",
          title: "首页",
          isKeepAlive: true
        },
        component: () => import("@/components/landing-view/index.vue")
      },
      {
        path: "/system",
        name: "system",
        redirect: "/system/account",
        children: [
          {
            path: "/system/account",
            name: "system-account",
            meta: {
              icon: "Menu",
              title: "账户设置",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/system/system-account.vue")
          },
          {
            path: "/system/role",
            name: "system-role",
            meta: {
              icon: "Menu",
              title: "角色管理",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/system/system-role.vue")
          },
          {
            path: "/system/authority",
            name: "system-authority",
            meta: {
              icon: "Menu",
              title: "权限管理",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/system/system-authority.vue")
          },
          {
            path: "/system/module",
            name: "system-module",
            meta: {
              icon: "Menu",
              title: "模块管理",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/system/system-module.vue")
          },
          {
            path: "/system/menu",
            name: "system-menu",
            meta: {
              icon: "Menu",
              title: "菜单管理",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/system/system-menu.vue")
          }
        ]
      }
    ]
  }
];

export default routes;
