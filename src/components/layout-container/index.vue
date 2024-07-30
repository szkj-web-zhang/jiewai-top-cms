<script lang="ts" setup></script>

<template>
  <el-container class="layout-container">
    <el-header>
      <slot name="header"></slot>
    </el-header>
    <el-container class="aside-content">
      <el-aside>
        <slot name="aside"></slot>
      </el-aside>
      <el-container class="mian-content">
        <slot name="main"></slot>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  min-width: 600px;
}

.el-container {
  width: 100%;
  height: 100%;
  :deep(.el-header) {
    height: 45px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #222;
  }
}

.aside-content {
  display: flex;
  height: calc(100% - 45px);
  :deep(.el-aside) {
    width: auto;
    background-color: #eeeeee;
  }
}

.mian-content {
  flex-direction: column;
}
</style>
