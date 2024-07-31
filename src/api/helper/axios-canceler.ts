import qs from "qs";
import { CustomAxiosRequestConfig } from "..";

// map存储每个请求的标识和取消函数
let pendingMap = new Map<string, AbortController>();

const sortedStringify = (obj: any) => {
  return qs.stringify(obj, {
    arrayFormat: "repeat",
    sort: (a: string, b: string) => a.localeCompare(b)
  });
};

// 获取请求的唯一标识
export const getPendingUrl = (config: CustomAxiosRequestConfig) => {
  return [config.method, config.url, sortedStringify(config.data)].join("&");
};

export class AxiosCanceler {
  // 请求开始之前对所有请求检查取消操作
  addPending(config: CustomAxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    const controller = new AbortController();
    config.signal = controller.signal;
    pendingMap.set(url, controller);
  }

  // 移除请求
  removePending(config: CustomAxiosRequestConfig) {
    const url = getPendingUrl(config);
    const controller = pendingMap.get(url);
    if (controller) {
      controller.abort();
      pendingMap.delete(url);
    }
  }

  // 清空所有pending请求
  removeAllPending() {
    pendingMap.forEach(controller => {
      controller && controller.abort();
    });
    pendingMap.clear();
  }
}
