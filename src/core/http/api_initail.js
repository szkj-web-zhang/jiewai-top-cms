/*
 * @Author: 申亚芳
 * @Date: 2022-09-01 13:42:49
 * @LastEditors: 申亚芳
 * @LastEditTime: 2024-07-08 15:26:05
 * @Description: file content
 * @FilePath: \cloud-domain\src\core\http\api_initail.js
 */
import { CommonApi } from "./Api";
if (process.env.NODE_ENV === "development") {
  // 开发环境
  CommonApi.BaseUrl = process.env.VUE_APP_HOST;
  // CommonApi.BaseUrl  ='https://wallet.ylzh.pro';
} else if (process.env.NODE_ENV === "production") {
  // 生产环境
  CommonApi.BaseUrl = process.env.VUE_APP_HOST;
} else {
  // 测试环境
  CommonApi.BaseUrl = process.env.VUE_APP_HOST;
}
