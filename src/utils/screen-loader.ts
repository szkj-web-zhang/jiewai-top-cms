import { ElLoading } from "element-plus";

// 全局请求loading
let loadingInstance: ReturnType<typeof ElLoading.service>;

// 开启loading
const handleLoadingStart = () => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)"
  });
};

// 结束loading
const handleLoaingEnd = () => {
  loadingInstance.close();
};

// 显示全屏加载
let needLoadingRequestCount = 0;
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    handleLoadingStart();
  }
  needLoadingRequestCount++;
};

// 隐藏全品加载
export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    handleLoaingEnd();
  }
};
