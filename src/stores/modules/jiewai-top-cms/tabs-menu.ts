import { defineStore } from "pinia";
import piniaPersistConfig from "../../helper/persist";
import {
  RemoveTabPayload,
  RemoveUnselectPayload,
  TabsMenuState
} from "@/stores/interface/jiewai-top-cms";
import { useAliveTabsStore } from "./alive-tabs";

const aliveTabsStore = useAliveTabsStore();

export const useTabsStore = defineStore({
  id: "jiewai-top-cms-tab",
  state: (): TabsMenuState => ({
    // 保存被点击的tab
    tabsMenuList: []
  }),
  actions: {
    // 存储没有点击过的tab,并将对应的path添加到alive列表
    async handleIncreaseTab(payload: Menu.TabsMenuProps) {
      const withTab = this.tabsMenuList.every(
        item => item.path !== payload.path
      );
      if (withTab) {
        this.tabsMenuList.push(payload);
      }
      const factor = !aliveTabsStore.aliveTabList.includes(payload.name);
      if (factor && payload.isKeepAlive) {
        aliveTabsStore.handleIncreaseAliveTab(payload.path);
      }
    },

    // 初始化tab，添加默认的home解决路由不是home时刷新会丢失home
    async handelSetDefaultTab() {
      const hasHomePath = this.tabsMenuList.filter(
        item => item.path === "/home"
      );
      if (!hasHomePath.length) {
        this.tabsMenuList.unshift({
          icon: "HomeFilled",
          title: "首页",
          path: "/home",
          name: "home",
          isKeepAlive: true
        });
      }
    },

    /**
     * 删除存储的tab并同时将对应的path从alive中删除
     * index + 1 ==> 删除激活的tab时向左移动
     * index + 2 ==> 删除激活的tab时向右移动
     */
    async handleRemoveAliveTab(payload: RemoveTabPayload) {
      if (payload.isCurrent) {
        this.tabsMenuList.forEach((item, index) => {
          if (item.path !== payload.tabPath) return;
          const nextTab =
            this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1];
          if (!nextTab) return;
          payload.callback?.(nextTab.path);
        });
      }
      const tabItem = this.tabsMenuList.find(
        item => item.path === payload.tabPath
      );
      if (tabItem?.isKeepAlive) {
        aliveTabsStore.handleDeleteAliveTab(tabItem.path);
      }
      this.tabsMenuList = this.tabsMenuList.filter(
        item => item.path !== payload.tabPath
      );
    },

    // 删除除选中的所有标签
    async handleRemoveUnselectTab(payload: RemoveUnselectPayload) {
      this.tabsMenuList = this.tabsMenuList.filter(item => {
        return item.path === payload.path || item.path === "/home";
      });
      const aliveTabList = this.tabsMenuList.filter(item => item.isKeepAlive);
      const list = aliveTabList.map(item => item.path);
      aliveTabsStore.handleReplaceAliveTabs(list);
      payload.callback?.();
    },

    // 删除所有tab
    async handleRemoveAllTabs(payload?: () => void) {
      this.tabsMenuList = this.tabsMenuList.filter(
        item => item.path === "/home"
      );
      payload?.();
    }
  },
  persist: piniaPersistConfig("jiewai-top-cms-tab")
});
