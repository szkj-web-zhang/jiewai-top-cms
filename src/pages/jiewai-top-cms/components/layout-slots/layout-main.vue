<script lang="ts" setup>
import { h } from "vue";

interface PropsType {
  // keep-alive的缓存规则
  include: string[];
  // 动态组件的key
  componentKey: string | number;
}

defineProps<PropsType>();

// 解决动态组件keep-alive问题
const wrapperMap = new Map();
const createComponentWrapper = (component, route) => {
  if (!component) return;
  const wrapperName = route.fullPath;
  let wrapper = wrapperMap.get(wrapperName);
  if (!wrapper) {
    wrapper = { name: wrapperName, render: () => h(component) };
    wrapperMap.set(wrapperName, wrapper);
  }
  return h(wrapper);
};
</script>

<template>
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="include">
          <component
            :is="createComponentWrapper(Component, route)"
            :key="componentKey"
          />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<style lang="scss" scoped>
.el-main {
  box-sizing: border-box;
  padding: 0;
  overflow-x: hidden;
  background-color: #ffffff;
}
</style>
