import { createApp } from "vue";
import App from "./App.vue";
import router from "~/jiewai-top-cms/routers/index";

// 重置样式
import "@/styles/reset.scss";
// 引入字体
import "@/styles/font.scss";
// 引入全局样式
import "@/styles/common.scss";
// 引入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
// 引入icon组件
import "virtual:svg-icons-register";
// 全局组件
import globalComponent from "@/components";
// 全局pinia
import globalPinia from "@/stores/index";

const app = createApp(App);

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app
  .use(ElementPlus)
  .use(globalPinia)
  .use(globalComponent)
  .use(router)
  .mount("#app");
