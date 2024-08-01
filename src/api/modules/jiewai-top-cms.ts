import http from "@/api";
import { PORT1 } from "../config";
import { CMS } from "../interface/index";

// 获取所有用户信息
export const all_users_get = (params: CMS.AllUserInfoReq) => {
  return http.post(PORT1 + `/cms-system/account/getAllInfo`, params);
};

// 获得动态权限菜单
export const dynamic_menu_get = () => {
  return http.post<CMS.DynamicMenuItem[]>(PORT1 + `/cms-system/menu/getPage`);
};
