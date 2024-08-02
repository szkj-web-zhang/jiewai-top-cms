import { Login } from "@/api/interface";

export interface UserState {
  satoken: string;
  userInfo: Login.UserInfoRes | null;
}

export interface AuthMenuState {
  authMenuList: Menu.MenuOptions[];
}

export interface DynamicMeunStore {
  dynamicMenuList: Menu.MenuOptions[];
}
