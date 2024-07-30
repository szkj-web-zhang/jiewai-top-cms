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
        component: () => import("~/jiewai-top-cms/views/main/landing-view.vue")
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
      },
      {
        path: "/market",
        name: "market",
        redirect: "/market/config",
        children: [
          {
            path: "/market/config",
            name: "market-config",
            meta: {
              icon: "Menu",
              title: "市场配置",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/market/market-setting.vue")
          },
          {
            path: "/market/carousel",
            name: "market-carousel",
            meta: {
              icon: "Menu",
              title: "轮播图",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/market/market-carousel.vue")
          },
          {
            path: "/market/domain",
            name: "market-domain",
            meta: {
              icon: "Menu",
              title: "一口价域名",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/market/market-domain.vue")
          },
          {
            path: "/market/auction",
            name: "market-auction",
            meta: {
              icon: "Menu",
              title: "拍卖域名",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/market/market-auction.vue")
          }
        ]
      },
      {
        path: "/config",
        name: "config",
        redirect: "/config/global",
        children: [
          {
            path: "/config/global",
            name: "config-global",
            meta: {
              icon: "Menu",
              title: "全局配置",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/config-center/config-global.vue")
          },
          {
            path: "/config/message",
            name: "config-message",
            meta: {
              icon: "Menu",
              title: "短信模板配置",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/config-center/config-message.vue")
          },
          {
            path: "/config/version",
            name: "config-version",
            meta: {
              icon: "Menu",
              title: "APP版本管理",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/config-center/config-version.vue")
          },
          {
            path: "/config/custom",
            name: "config-custom",
            meta: {
              icon: "Menu",
              title: "客服配置",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/config-center/config-custom.vue")
          },
          {
            path: "/config/chain",
            name: "config-chain",
            meta: {
              icon: "Menu",
              title: "链信息配置",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/config-center/config-chain.vue")
          },
          {
            path: "/config/application",
            name: "config-application",
            meta: {
              icon: "Menu",
              title: "应用管理",
              isKeepAlive: true
            },
            component: () =>
              import(
                "~/jiewai-top-cms/views/config-center/config-application.vue"
              )
          },
          {
            path: "/config/about",
            name: "config-about",
            meta: {
              icon: "Menu",
              title: "关于我们",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/config-center/config-about.vue")
          },
          {
            path: "/config/platform",
            name: "config-platform",
            meta: {
              icon: "Menu",
              title: "平台账户配置",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/config-center/config-platform.vue")
          },
          {
            path: "/config/notify",
            name: "config-notify",
            meta: {
              icon: "Menu",
              title: "系统通知",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/config-center/config-notify.vue")
          },
          {
            path: "/config/poster",
            name: "config-poster",
            meta: {
              icon: "Menu",
              title: "邀请海报",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/config-center/config-poster.vue")
          }
        ]
      },
      {
        path: "/help",
        name: "help",
        redirect: "/help/center",
        children: [
          {
            path: "/help/center",
            name: "help-center",
            meta: {
              icon: "Menu",
              title: "帮助中心",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/help-center/help-center.vue")
          }
        ]
      },
      {
        path: "/pay",
        name: "pay",
        redirect: "/pay/wx",
        children: [
          {
            path: "/pay/wx",
            name: "pay-wx",
            meta: {
              icon: "Menu",
              title: "微信支付配置",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/payment-center/pay-wx.vue")
          },
          {
            path: "/pay/type",
            name: "pay-type",
            meta: {
              icon: "Menu",
              title: "交易类型",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/payment-center/pay-type.vue")
          }
        ]
      },
      {
        path: "/community",
        name: "community",
        redirect: "/community/sensitive",
        children: [
          {
            path: "/community/sensitive",
            name: "community-sensitive",
            meta: {
              icon: "Menu",
              title: "敏感词配置",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/community/community-sensitive.vue")
          },
          {
            path: "/community/tag",
            name: "community-tag",
            meta: {
              icon: "Menu",
              title: "敏感词标签",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/community/community-tag.vue")
          },
          {
            path: "/community/white",
            name: "community-white",
            meta: {
              icon: "Menu",
              title: "敏感词白名单",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/community/community-white.vue")
          },
          {
            path: "/community/black",
            name: "community-black",
            meta: {
              icon: "Menu",
              title: "敏感词黑名单",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/community/community-black.vue")
          },
          {
            path: "/community/record",
            name: "community-record",
            meta: {
              icon: "Menu",
              title: "广场举报记录",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/community/community-detection.vue")
          },
          {
            path: "/community/detection",
            name: "community-detection",
            meta: {
              icon: "Menu",
              title: "敏感词检测记录",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/community/community-record.vue")
          },
          {
            path: "/community/black-user",
            name: "community-black-user",
            meta: {
              icon: "Menu",
              title: "广场黑名单用户",
              isKeepAlive: true
            },
            component: () =>
              import(
                "~/jiewai-top-cms/views/community/community-black-user.vue"
              )
          }
        ]
      },
      {
        path: "/source",
        name: "source",
        redirect: "/source/issue",
        children: [
          {
            path: "/source/issue",
            name: "source-issue",
            meta: {
              icon: "Menu",
              title: "发放记录",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/source-center/source-issue.vue")
          }
        ]
      },
      {
        path: "/account",
        name: "account",
        redirect: "/account/order",
        children: [
          {
            path: "/account/order",
            name: "account-order",
            meta: {
              icon: "Menu",
              title: "撮单交易运营账号",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/account-manage/account-order.vue")
          },
          {
            path: "/account/operate",
            name: "account-operate",
            meta: {
              icon: "Menu",
              title: "社区运营账号",
              isKeepAlive: true
            },
            component: () =>
              import(
                "~/jiewai-top-cms/views/account-manage/account-operate.vue"
              )
          }
        ]
      },
      {
        path: "/task",
        name: "task",
        redirect: "/task/manage",
        children: [
          {
            path: "/task/manage",
            name: "task-manage",
            meta: {
              icon: "Menu",
              title: "任务管理",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/task/task-manage.vue")
          }
        ]
      },
      {
        path: "/IM",
        name: "IM",
        redirect: "/IM/record",
        children: [
          {
            path: "/IM/record",
            name: "IM-record",
            meta: {
              icon: "Menu",
              title: "敏感词检测记录",
              isKeepAlive: true
            },
            component: () => import("~/jiewai-top-cms/views/IM/IM-record.vue")
          },
          {
            path: "/IM/manage",
            name: "IM-manage",
            meta: {
              icon: "Menu",
              title: "管理",
              isKeepAlive: true
            },
            component: () => import("~/jiewai-top-cms/views/IM/IM-manage.vue")
          }
        ]
      },
      {
        path: "/renewal",
        name: "renewal",
        redirect: "/renewal/record",
        children: [
          {
            path: "/renewal/record",
            name: "renewal-record",
            meta: {
              icon: "Menu",
              title: "续费折扣活动",
              isKeepAlive: true
            },
            component: () =>
              import("~/jiewai-top-cms/views/renewal/renewal-record.vue")
          }
        ]
      }
    ]
  }
];

export default routes;
