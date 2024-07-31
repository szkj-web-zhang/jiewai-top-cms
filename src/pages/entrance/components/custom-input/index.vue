<script lang="ts" setup>
import { computed, ref, useAttrs } from "vue";
interface PropsType {
  // 是否开启校验
  passedVerify: boolean | null;
  // 校验失败信息
  errorMessage?: string;
}

const props = withDefaults(defineProps<PropsType>(), {
  errorMessage: "请输入正确的格式"
});

// 组件属性透传
const attrs = useAttrs();

// 边框颜色
const borderColor = computed(() => {
  return { borderColor: `#${props.passedVerify === false ? "#f55549" : ""}` };
});
</script>

<template>
  <div class="custom-input">
    <el-input
      v-bind="attrs"
      :style="
        passedVerify === false
          ? `--el-input-border-color:#f55549;--el-input-text-color:#e1eaf5`
          : ''
      "
    ></el-input>
    <span v-if="passedVerify === false">{{ errorMessage }}</span>
  </div>
</template>

<style lang="scss" scoped>
.custom-input {
  position: relative;
  :deep(.el-input__wrapper) {
    border-radius: 12px;
    border: 1px solid #e1eaf5;
    padding: 0 16px;
    .el-input__inner {
      font-size: 16px;
      font-family: PingFangMedium;
      color: #08090a;
      border-color: var(borderColor);
      &::placeholder {
        font-family: PingFangRegular;
        color: #7a8799;
      }
    }
  }
  > span {
    font-size: 12px;
    font-family: PingFangRegular;
    color: #f55549;
    position: absolute;
    bottom: -30%;
    left: 2%;
  }
}
</style>
