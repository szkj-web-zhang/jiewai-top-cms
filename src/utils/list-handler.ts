import { System } from "@/api/interface";

enum Path {
  // 系统模块入口
  // "system:list" = "",
  // 系统模块下的部门
  "dept:list" = "/dept",
  "dept:add" = "/dept/add",
  "dept:update" = "/dept/update",
  "dept:delete" = "/dept/delete",
  "dept:user:add" = "/dept/user/add",
  // 系统模块下的角色
  "role:list" = "/role",
  "role:add" = "/role/add",
  "role:update" = "/role/update",
  "role:menu:add" = "/role/menu/add",
  // 系统模块下的用户
  "user:list" = "/user",
  // 系统模块下的菜单
  "menu:list" = "/menu",
  // 实名DID模块入口
  "did:list" = "/did-module",
  // 门户模块入口
  "portal:list" = "/portal-module",
  // 界外官网模块入口
  "website:list" = "/website-module"
}

type DynamicFunc = (data?: System.DynamicMenuItem[]) => Menu.MenuOptions[];

/**
 * 对接口返回的左侧菜单数据进行处理
 * @param dynamic_list接口返回的数据
 * @returns 左侧菜单导航的数据格式
 */
export const getHandleMenuList: DynamicFunc = list => {
  const arr: Menu.MenuOptions[] = [];
  if (list) {
    for (let i = 0; i < list.length; i++) {
      arr[i] = {
        path: Path[list[i].perms],
        name: list[i].perms,
        meta: {
          title: list[i].name,
          isKeepAlive: true,
          icon: list[i].icon ?? ""
        },
        children: getHandleMenuList(list[i].children)
      };
    }
  }
  return arr;
};

const pathTransform = (str: string) => {
  return str.replaceAll(":", "/");
};

/**
 *
 */
export const getHandleDynamicMenu: DynamicFunc = list => {
  const arr: Menu.MenuOptions[] = [];
  if (list) {
    for (let i = 0; i < list.length; i++) {
      arr[i] = {
        path: pathTransform(list[i].perms),
        name: list[i].perms,
        meta: {
          title: list[i].name,
          isKeepAlive: true,
          icon: list[i].icon ?? ""
        },
        children: getHandleMenuList(list[i].children)
      };
    }
  }
  console.log(arr);
  return arr;
};

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param menuList 菜单列表
 * @returns
 */
export function getFlatMenuList(
  menuList: Menu.MenuOptions[]
): Menu.MenuOptions[] {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap(item => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : [])
  ]);
}
