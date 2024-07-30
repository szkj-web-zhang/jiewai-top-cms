export interface EntryCmsItem {
  name: string;
  path: string;
}

export const menuList: Menu.MenuOptions[] = [
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页",
      isKeepAlive: true,
      icon: "HomeFilled"
    }
  },
  {
    path: "/system",
    name: "system",
    meta: {
      title: "系统管理",
      isKeepAlive: true,
      icon: "Setting"
    },
    children: [
      {
        path: "/system/account",
        name: "account",
        meta: {
          title: "账户设置",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/system/role",
        name: "role",
        meta: {
          title: "角色管理",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/system/authority",
        name: "authority",
        meta: {
          title: "权限管理",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/system/module",
        name: "module",
        meta: {
          title: "模块管理",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/system/menu",
        name: "menu",
        meta: {
          title: "菜单管理",
          isKeepAlive: true,
          icon: "Menu"
        }
      }
    ]
  },
  {
    path: "/market",
    name: "market",
    meta: {
      title: "市场模块",
      isKeepAlive: true,

      icon: "Shop"
    },
    children: [
      {
        path: "/market/config",
        name: "config",
        meta: {
          title: "市场配置",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/market/carousel",
        name: "carousel",
        meta: {
          title: "轮播图",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/market/domain",
        name: "damain",
        meta: {
          title: "一口价域名",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/market/auction",
        name: "auction",
        meta: {
          title: "拍卖域名",
          isKeepAlive: true,
          icon: "Menu"
        }
      }
    ]
  },
  {
    path: "/config",
    name: "config",
    meta: {
      title: "配置中心",
      isKeepAlive: true,
      icon: "Setting"
    },
    children: [
      {
        path: "/config/global",
        name: "global",
        meta: {
          title: "全局配置",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/config/message",
        name: "message",
        meta: {
          title: "短信模板配置",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/config/version",
        name: "version",
        meta: {
          title: "APP版本管理",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/config/custom",
        name: "custom",
        meta: {
          title: "客服配置",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/config/chain",
        name: "chain",
        meta: {
          title: "链信息配置",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/config/application",
        name: "application",
        meta: {
          title: "应用管理",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/config/about",
        name: "about",
        meta: {
          title: "关于我们",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/config/platform",
        name: "platform",
        meta: {
          title: "平台账户配置",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/config/notify",
        name: "notify",
        meta: {
          title: "系统通知",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/config/poster",
        name: "poster",
        meta: {
          title: "邀请海报",
          isKeepAlive: true,
          icon: "Menu"
        }
      }
    ]
  },
  {
    path: "/help",
    name: "help",
    meta: {
      title: "帮助中心",
      isKeepAlive: true,

      icon: "Help"
    },
    children: [
      {
        path: "/help/center",
        name: "center",
        meta: {
          title: "帮助中心",
          isKeepAlive: true,
          icon: "Menu"
        }
      }
    ]
  },
  {
    path: "/pay",
    name: "pay",
    meta: {
      title: "支付中心",
      isKeepAlive: true,
      icon: "Money"
    },
    children: [
      {
        path: "/pay/wx",
        name: "wx",
        meta: {
          title: "微信支付配置",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/pay/type",
        name: "type",
        meta: {
          title: "支付类型",
          isKeepAlive: true,
          icon: "Menu"
        }
      }
    ]
  },
  {
    path: "/community",
    name: "community",
    meta: {
      title: "社区广场",
      isKeepAlive: true,
      icon: "ChatSquare"
    },
    children: [
      {
        path: "/community/sensitive",
        name: "sensitive",
        meta: {
          title: "敏感词配置",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/community/tag",
        name: "tag",
        meta: {
          title: "敏感词标签",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/community/white",
        name: "white",
        meta: {
          title: "敏感词白名单",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/community/black",
        name: "black",
        meta: {
          title: "敏感词黑名单",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/community/record",
        name: "record",
        meta: {
          title: "广场举报记录",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/community/detection",
        name: "detection",
        meta: {
          title: "敏感词配置",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/community/black-user",
        name: "black-user",
        meta: {
          title: "广场黑名单用户",
          isKeepAlive: true,
          icon: "Menu"
        }
      }
    ]
  },
  {
    path: "/source",
    name: "source",
    meta: {
      title: "源力值中心",
      isKeepAlive: true,
      icon: "Promotion"
    },
    children: [
      {
        path: "/source/issue",
        name: "issue",
        meta: {
          title: "发放记录",
          isKeepAlive: true,
          icon: "Menu"
        }
      }
    ]
  },
  {
    path: "/account",
    name: "account",
    meta: {
      title: "账号管理",
      isKeepAlive: true,
      icon: "User"
    },
    children: [
      {
        path: "/account/order",
        name: "order",
        meta: {
          title: "撮单交易运营账号",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/account/operate",
        name: "operate",
        meta: {
          title: "社区运营账号",
          isKeepAlive: true,
          icon: "Menu"
        }
      }
    ]
  },
  {
    path: "/task",
    name: "task",
    meta: {
      title: "任务中心",
      isKeepAlive: true,
      icon: "Notebook"
    },
    children: [
      {
        path: "/task/manage",
        name: "manage",
        meta: {
          title: "任务管理",
          isKeepAlive: true,
          icon: "Menu"
        }
      }
    ]
  },
  {
    path: "/IM",
    name: "IM",
    meta: {
      title: "IM管理",
      isKeepAlive: true,
      icon: "Management"
    },
    children: [
      {
        path: "/IM/record",
        name: "record",
        meta: {
          title: "敏感词检测记录",
          isKeepAlive: true,
          icon: "Menu"
        }
      },
      {
        path: "/IM/manage",
        name: "manage",
        meta: {
          title: "管理",
          isKeepAlive: true,
          icon: "Menu"
        }
      }
    ]
  },
  {
    path: "/renewal",
    name: "renewal",
    meta: {
      title: "续费活动管理",
      isKeepAlive: true,
      icon: "Discount"
    },
    children: [
      {
        path: "/renewal/record",
        name: "record",
        meta: {
          title: "续费折扣活动",
          isKeepAlive: true,
          icon: "Menu"
        }
      }
    ]
  }
];

export const entryCmsList: EntryCmsItem[] = [
  { name: "jiewai-top-cms", path: "/jiewai-top-cms" }
];
