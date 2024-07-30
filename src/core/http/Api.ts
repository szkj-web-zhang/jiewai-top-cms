/*
 * @Author: 申亚芳
 * @Date: 2022-08-09 17:16:24
 * @LastEditors: yafang shen 1376820393@qq.com
 * @LastEditTime: 2024-07-19 08:52:54
 * @Description: file content
 * @FilePath: \cloud-domain\src\core\http\Api.ts
 */
export enum ApiType {
  CommonApi
}

export class Api {
  private static _instance: Api;
  public static get instance() {
    if (!this._instance) {
      this._instance = Api.factory();
    } else {
      console.log("lazy loading singleton has created");
    }
    return this._instance;
  }

  static factory(type?: ApiType) {
    return new Api();
  }

  get fullPath(): string {
    return "";
  }
}

export enum NameSpaceType {
  login
}

export class CommonApi {
  // 环境的切换
  static BaseUrl = "";
  static BlockChUrl = "";
  static wsUrl = "";

  // 发送验证码（密码登录、注册、其他发送验证码类型）
  static get url_send_code(): string {
    return CommonApi.BaseUrl + "/cms-system/account/regCaptcha";
  }

  // 发送验证码（登录即注册）
  static get url_send_code_v2(): string {
    return CommonApi.BaseUrl + "/cms-system/account/loginByCode";
  }

  // 发送验证码（登录即注册）
  static get login_with_password(): string {
    return CommonApi.BaseUrl + "/cms-system/account/loginByPassword";
  }
}
