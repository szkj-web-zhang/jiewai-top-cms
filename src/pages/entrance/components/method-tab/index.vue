<script lang="ts" setup>
import { TabsPaneContext } from "element-plus";

const emit = defineEmits<{
  tabClick: [tab: TabsPaneContext];
}>();

// 点击tab
const handleClickTab = (tab: TabsPaneContext) => {
  emit("tabClick", tab);
};
</script>

<template>
  <el-tabs class="demo-tabs" @tab-click="handleClickTab">
    <el-tab-pane label="手机号登录" name="code">
      <slot name="code"></slot>
    </el-tab-pane>
    <el-tab-pane label="账号密码登录" name="password">
      <slot name="password"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped></style>
