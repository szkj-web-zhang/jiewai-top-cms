import { defineStore } from "pinia";
import { DynamicMeunStore } from "../interface";
import { getFlatMenuList, getHandleDynamicMenu } from "@/utils/list-handler";
import { dynamic_menu_get } from "@/api/modules/dynamic-menu";

export const useDynamicMuneStore = defineStore({
  id: "global-dynamic-menu",
  state: (): DynamicMeunStore => ({
    // 左侧动态菜单
    dynamicMenuList: []
  }),
  getters: {
    // 没有处理的权限菜单列表
    authMenuListGet: state => state.dynamicMenuList,
    // 扁平化处理权限菜单列表
    flatMenuListGet: state => getFlatMenuList(state.dynamicMenuList)
  },
  actions: {
    // 接口获取权限菜单
    async getDynamicMenuList(payload: string) {
      const res = await dynamic_menu_get();
      if (res.code === 200) {
        const list = res.data.filter(item => item.perms === payload);
        getHandleDynamicMenu(list);
      }
    }
  }
});
