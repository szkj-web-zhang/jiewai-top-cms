import { AliveTabsState } from "@/stores/interface/jiewai-top-cms";
import { defineStore } from "pinia";

export const useAliveTabsStore = defineStore({
  id: "jiewai-top-cms-aliveTabs",
  state: (): AliveTabsState => ({
    aliveTabList: []
  }),
  actions: {
    // 添加需要缓存的tab对应的路由
    async handleIncreaseAliveTab(payload: string) {
      if (!this.aliveTabList.includes(payload)) {
        this.aliveTabList.push(payload);
      }
    },
    // 删除缓存的tab对应的路由
    async handleDeleteAliveTab(payload: string) {
      const temp = this.aliveTabList.filter(item => item !== payload);
      this.aliveTabList = temp;
    },
    // 替换缓存所有缓存 ==>清空所有缓存
    async handleReplaceAliveTabs(payload: string[]) {
      this.aliveTabList = payload;
    }
  }
});
