<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import navigationTabs from "@/components/navigation-tabs/index.vue";
import layoutContainer from "@/components/layout-container/index.vue";
import layoutAsiderMenu from "~/jiewai-top-cms/components/layout-slots/layout-asider-menu.vue";
import layoutHeader from "~/jiewai-top-cms/components/layout-slots/layout-header.vue";
import layoutMain from "~/jiewai-top-cms/components/layout-slots/layout-main.vue";
import { storeToRefs } from "pinia";
import { menuList } from "@/utils/entry-system";
import { useGlobalStore } from "@/stores/modules/jiewai-top-cms/global";
import { useAliveTabsStore } from "@/stores/modules/jiewai-top-cms/alive-tabs";
import { useTabsStore } from "@/stores/modules/jiewai-top-cms/tabs-menu";
import { TabPaneName, TabsPaneContext } from "element-plus";
import { user_logout } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { CMS } from "@/api/interface";
import { getHandleMenuList } from "@/utils/list-handler";
import { dynamic_menu_get } from "@/api/modules/dynamic-menu";
export interface HeaderItemType {
  label: string;
  callback: () => void;
}

const route = useRoute();
const router = useRouter();
// pinia获取全局状态
const globalStore = useGlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);
const accordion = computed(() => globalStore.accordion);
const userStore = useUserStore();
// pinia获取keepalive状态
const aliveTabsStore = useAliveTabsStore();
const { aliveTabList } = storeToRefs(aliveTabsStore);
// pinia获取tabs数据
const tabsMenuStore = useTabsStore();
const tabsMeunList = computed(() => tabsMenuStore.tabsMenuList);
// 存储左侧menu
const dynamicData = ref<CMS.DynamicMenuItem[]>();
// header下拉框的列表
const headerList: HeaderItemType[] = [
  { label: "修改密码", callback: () => {} },
  { label: "修改密钥", callback: () => {} },
  { label: "退出", callback: () => handleUserLogout() }
];

onBeforeMount(async () => {
  // 获取左侧菜单数据
  const res = await dynamic_menu_get();
  // dynamicData.value = res.data ?? [];
});

// 用户退出
const handleUserLogout = async () => {
  const res = await user_logout();
  if (res.code === 200) {
    userStore.setToken("");
    userStore.setUserInfo(null);
    window.localStorage.clear();
    window.location.href = "/entrance/entry";
  }
};

// 添加main顶部的tab导航
const handleClickTab = (item: TabsPaneContext) => {
  const fullPath = item.props.name as string;
  router.push(fullPath);
};
// 删除tab，因为pinia无法使用useRouter，所以通过传递callback在actions中完成路由跳转
const handleRemoveTab = (path: TabPaneName) => {
  const callback = (path: string) => router.push(path);
  const payload = {
    tabPath: path as string,
    isCurrent: path === route.path,
    callback
  };
  tabsMenuStore.handleRemoveAliveTab(payload);
};
</script>

<template>
  <layout-container>
    <template #header>
      <layout-header title="灵戒-CMS" :drop-list="headerList" />
    </template>
    <template #aside>
      <layout-asider-menu
        :collapse="isCollapse"
        :default-active="route.path"
        :unique-opened="accordion"
        :collapse-transition="false"
        :menu-list="menuList"
      />
    </template>
    <template #main>
      <navigation-tabs
        :tab-list="tabsMeunList"
        @click="handleClickTab"
        @remove="handleRemoveTab"
      />
      <layout-main :include="aliveTabList" :component-key="route.path" />
    </template>
  </layout-container>
</template>

<style lang="scss" scoped></style>
