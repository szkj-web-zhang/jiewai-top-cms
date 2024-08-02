import { PORT1 } from "@/api/config";
import http from "@/api";
import { Syetem } from "@/api/interface";

// 获取左侧菜单数据
export const dynamic_menu_get = () => {
  return http.post<Syetem.DynamicMenuItem[]>(
    PORT1 + `/cms-system/account/getUserPermission`
  );
};
