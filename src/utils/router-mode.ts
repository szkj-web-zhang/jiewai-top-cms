import { createWebHashHistory, createWebHistory } from "vue-router";

export const routerModeSelect = (base?: string) => {
  const mode = import.meta.env.VITE_ROUTER_MODE;
  return mode === "hash" ? createWebHashHistory(base) : createWebHistory(base);
};
