import { ResultEnum } from "@/enums/http-enum";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import { AxiosCanceler } from "./helper/axios-canceler";
import { useUserStore } from "@/stores/modules/user";
import { ElMessage } from "element-plus";
import { checkStatus } from "./helper/status-check";
import { ResultData } from "./interface";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
  cancel?: boolean;
}

const config = {
  // 默认地址
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域允许携带凭证
  withCredentials: true
};

const axiosCanceler = new AxiosCanceler();

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const userStore = useUserStore();
        config.cancel ??= true;
        config.cancel && axiosCanceler.addPending(config);
        config.loading ??= true;
        config.loading && console.log("我正在loading");
        if (config.headers && typeof config.headers.set === "function") {
          config.headers.set("noauth", userStore.token);
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse & { config: CustomAxiosRequestConfig }) => {
        const { data, config } = response;
        const userStore = useUserStore();
        axiosCanceler.removePending(config);
        // config.loading && console.log("loading结束了");
        console.log("response", data);
        // if (data.code == ResultEnum.OVERDUE) {
        //   userStore.setToken("");
        //   window.location.href = "/login";
        //   ElMessage.error(data.msg);
        //   return Promise.reject(data);
        // }
        // if (data.code && data.code !== ResultEnum.SECCESS) {
        //   ElMessage.error(data.msg);
        //   return Promise.reject(data);
        // }
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        console.log("response", error);
        // console.log("loading结束了");
        if (error.message.indexOf("timeout") !== -1)
          ElMessage.error("请求超时！请您稍后重试");
        if (error.message.indexOf("Network Error") !== -1)
          ElMessage.error("网络错误！请您稍后重试");
        if (response) checkStatus(response.status);
        if (!window.navigator.onLine) window.location.href = "/500";
        // return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(
    url: string,
    params?: object | string,
    _object = {}
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: "blob" });
  }
}

export default new RequestHttp(config);
