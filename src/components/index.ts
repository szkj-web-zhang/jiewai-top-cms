import type { App, Component, DefineComponent } from "vue";
// 全局组件
import SvgIcon from "./svg-icon/index.vue";

type ComponentType = Record<string, Component | DefineComponent>;

// 对象存储全局组件
const globalComponentObject: ComponentType = { SvgIcon };

const install = (app: App) => {
  // 全局组件注册
  Object.keys(globalComponentObject).forEach(key => {
    app.component(key, globalComponentObject[key]);
  });
};

export default { install };
