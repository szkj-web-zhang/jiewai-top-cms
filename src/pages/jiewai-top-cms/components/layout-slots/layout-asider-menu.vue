<script lang="ts" setup>
import SubMenu from "@/components/sub-menu/index.vue";

interface PropsType {
  // 折叠状态
  collapse: boolean;
  // 默认激活菜单的标识==>id,index,path
  defaultActive?: string | number;
  // menu组件是否保持一个菜单展开
  uniqueOpened?: boolean;
  // 折叠菜单动画
  collapseTransition?: boolean;
  // 菜单列表
  menuList: Menu.MenuOptions[];
}

withDefaults(defineProps<PropsType>(), {
  collapse: false,
  uniqueOpened: true,
  collapseTransition: true
});
</script>

<template>
  <div class="aside-box" :style="{ width: collapse ? '65px' : '220px' }">
    <el-scrollbar>
      <el-menu
        :collapse="collapse"
        :default-active="defaultActive"
        :unique-opened="uniqueOpened"
        :collapse-transition="collapseTransition"
      >
        <sub-menu :menu-list="menuList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.aside-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease;
  :deep(.el-menu) {
    width: 100%;
    overflow-x: hidden;
    border-right: none;
    background-color: transparent !important;
  }
}
</style>
