import { tryOnUnmounted } from "@vueuse/core";
import { ref, unref } from "vue";

export const useCountDown = (count: number) => {
  const currentCount = ref(count);

  const isStart = ref(false);

  let timerId: ReturnType<typeof setInterval> | null;

  const clear = () => {
    timerId && window.clearInterval(timerId);
  };

  const stop = () => {
    isStart.value = false;
    clear();
    timerId = null;
  };

  const reset = () => {
    currentCount.value = count;
    stop();
  };

  const start = () => {
    if (unref(isStart) || !!timerId) {
      return;
    }
    isStart.value = true;
    timerId = setInterval(() => {
      if (unref(currentCount) === 1) {
        reset();
      } else {
        currentCount.value -= 1;
      }
    }, 1000);
  };

  const reStart = () => {
    reset();
    start();
  };

  tryOnUnmounted(() => {
    reset();
  });

  return { reStart };
};
