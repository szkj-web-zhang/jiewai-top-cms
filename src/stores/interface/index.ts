import { Login } from "@/api/interface";

export interface UserState {
  satoken: string;
  userInfo: Login.UserInfoRes | null;
}
