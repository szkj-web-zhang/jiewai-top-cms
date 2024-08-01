import { defineStore } from "pinia";
import { UserState } from "../interface";
import piniaPersistConfig from "../helper/persist";

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    satoken: "",
    userInfo: null
  }),
  actions: {
    setToken(str: string) {
      this.satoken = str;
    },
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("user")
});
