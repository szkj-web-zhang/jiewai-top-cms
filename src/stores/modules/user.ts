import { defineStore } from "pinia";
import { UserState } from "../interface";
import piniaPersistConfig from "../helper/persist";

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    token: "",
    userInfo: { name: "zcz" }
  }),
  actions: {
    setToken(str: string) {
      this.token = str;
    },
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("user")
});
