import { HttpRequestConfig } from "@/core/http/HttpRequestConfig";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// import Bus from "../../utils/bus";
import { HttpRequestParams } from "./HttpRequestParams";
// import StorageHelper from "@/utils/storage-helper";

export class HttpInstance {
  private static _instance: HttpInstance;
  public static getInstance(): HttpInstance {
    if (!this._instance) {
      this._instance = new HttpInstance();
    }
    return this._instance;
  }
  //******************************************//
  axiosInstance: AxiosInstance;

  //请求引用计数
  requestCount: number = 0;

  public static getAxiosInstance(): AxiosInstance {
    return HttpInstance.getInstance().axiosInstance;
  }

  constructor() {
    this.axiosInstance = axios.create();
    //添加请求拦截器
    this.axiosInstance.interceptors.request.use(
      (requestConfig: any) => {
        return requestConfig;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    //添加响拦截器
    // this.axiosInstance.interceptors.response.use(
    //   (responseConfig: any) => {
    //     return responseConfig;
    //   },
    //   (error: any) => {
    //     if (error.response) {
    //       switch (error.response.code) {
    //         case 1:
    //       }
    //     }
    //     console.log(error)
    //     return Promise.reject(error.response.data);
    //   }
    // );
  }
}

export class HttpManager {
  static sendPostRequest(config: HttpRequestConfig) {
    let baasProductId: string | null = "";
    let token: string | null = config.tempToken;
    let operateUUID = process.env.VUE_APP_UUID;
    if (!token || token == "") {
      // token = StorageHelper.getToken();
      if (config.path.includes("/operate/")) {
        // token = StorageHelper.getOperateToken();
        operateUUID = localStorage.getItem("operateUUID") ?? "";
      }
    }
    baasProductId = window.sessionStorage.getItem(
      window.sessionStorage.getItem("pidKey") ?? ""
    );
    if (process.env.NODE_ENV === "development") {
      // 开发环境
      // token = 'aufvjwce9oj5ihnstco8dwvyk39wdvdu'
    }
    let ctk = sessionStorage.getItem("clientTk") ?? "";
    let headers: any = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      noauth: token ? token : "",
      token: token ? token : "",
      satoken: token ? token : "",
      operateToken: token ? token : "",
      operateUuid: operateUUID,
      key: window.sessionStorage.getItem("secret") ?? "",
      source: "cloudChain"
    };
    let requestConfig: AxiosRequestConfig = {
      params: config.params.realParams,
      headers: headers,
      method: config.requestType,
      url: config.path,
      data: config.formData
        ? HttpRequestParams.encryptoFromData(config.formData)
        : "",
      timeout: 60000,
      timeoutErrorMessage: "链接超时"
    };
    if (config.requestContentType == "JSON") {
      headers["Content-Type"] = "application/json;charset=UTF-8";
      requestConfig.data = config.params.realParams;
      requestConfig.params = null;
    }
    if (config.loading) {
      // showLoadingToast({
      //   message: config.loadingMessage,
      //   duration: 0,
      //   forbidClick: true
      // });
    }
    HttpInstance.getAxiosInstance()
      .request(requestConfig)
      .then((response: any) => {
        if (config.loading) {
          // closeToast();
        }
        if (response.data.code == 401 || response.data.code == 402) {
          console.log("token 失效");
          if (config.path.includes("/operate/")) {
            //运营端请求失效
            // let token = StorageHelper.getOperateToken() ?? "";
            if (token.length != 0) {
              //token失效，异地登录
              // StorageHelper.removeOperateToken();
              // StorageHelper.removeOperateUserInfo();
              // //@ts-expect-error
              // Bus.$emit("token_expire", "operate");
            }
          } else {
            //门户端请求失效
            // let token = StorageHelper.getToken() ?? "";
            if (token.length != 0) {
              //token失效，异地登录
              // StorageHelper.removeToken();
              // StorageHelper.removeUserInfo();
              // //@ts-expect-error
              // Bus.$emit("token_expire", "");
            }
          }
          return;
        }
        if (response.data.code == 200) {
          config.businessSuccess(response.data);
        } else {
          if (response.data.state != undefined) {
            response.data.msg = response.data.message;
          }
          response.data.message = response.data.msg;
          config.businessFailed(response.data);
        }
        if (config.requestFinished) {
          config.requestFinished();
        }
      })
      .catch((error: any) => {
        if (config.loading) {
          // closeToast();
        }
        console.log("error => ", error);
        if (error.response) {
          if (
            error.response.data.code == 401 ||
            error.response.data.code == 402
          ) {
            //token失效，异地登录
            // StorageHelper.removeToken();
            // StorageHelper.removeUserInfo();
            // //@ts-expect-error
            // Bus.$emit("token_expire");
            return;
          }
        }
        config.requestFailed(error);
        if (config.requestFinished) {
          config.requestFinished();
        }
      });
  }
}
