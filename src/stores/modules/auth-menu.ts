import { defineStore } from "pinia";
import { AuthMenuState } from "../interface";
import { getFlatMenuList, getHandleMenuList } from "@/utils/list-handler";
import { dynamic_menu_get } from "@/api/modules/jiewai-top-cms";

export const useAuthMenuStore = defineStore({
  id: "global-menu-list",
  state: (): AuthMenuState => ({
    // 动态的权限菜单列表
    authMenuList: []
  }),
  getters: {
    // 没有处理的权限菜单列表
    authMenuListGet: state => state.authMenuList,
    // 扁平化处理权限菜单列表
    flatMenuListGet: state => getFlatMenuList(state.authMenuList)
  },
  actions: {
    // 接口获取权限菜单
    async getAuthMenuList(payload: string) {
      const res = await dynamic_menu_get();
      if (res.code === 200) {
        const list = getHandleMenuList(res.data).filter(
          item => item.path === payload
        );
        this.authMenuList = list;
      }
    }
  }
});
