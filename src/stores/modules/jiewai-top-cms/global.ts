import { defineStore } from "pinia";
import { GlobalState } from "@/stores/interface/jiewai-top-cms/index";
import piniaPersistConfig from "@/stores/helper/persist";

export const useGlobalStore = defineStore({
  id: "jiewai-top-cms-global",
  state: (): GlobalState => ({
    // 折叠菜单
    isCollapse: false,
    // 菜单手风琴
    accordion: true
  }),
  actions: {
    setJiewaiTopState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] });
    }
  },
  persist: piniaPersistConfig("jiewai-top-cms-global")
});
