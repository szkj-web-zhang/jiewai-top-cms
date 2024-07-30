<script lang="ts" setup>
import { useTabsStore } from "@/stores/modules/jiewai-top-cms/tabs-menu";
import { TabsPaneContext, TabPaneName } from "element-plus";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
interface PropsType {
  // tab pane列表
  tabList: Menu.TabsMenuProps[];
}

interface RightMenuItem {
  label: string;
  callback: () => void;
}

defineProps<PropsType>();

const emit = defineEmits<{
  click: [value: TabsPaneContext];
  remove: [value: TabPaneName];
}>();

// 右键菜单列表
const rightMenuList: RightMenuItem[] = [
  {
    label: "关闭当前",
    callback: () => handleDeleteSelectTab()
  },
  {
    label: "关闭其他",
    callback: () => handleDeleteOtherTabs()
  },
  {
    label: "关闭全部",
    callback: () => handleDeleteAllTabs()
  }
];

const route = useRoute();
const router = useRouter();
// 获取main顶部的tab导航
const tabsStore = useTabsStore();
// 指定outside click的ref
const target = ref(null);
// 设置当前激活的tabs
const defaultTabs = ref(route.fullPath);
// 下拉框状态
const folatState = ref<boolean>(false);
// 右键选中的tab
const activeTab = ref<Menu.TabsMenuProps | null>(null);
// 右键列表的位置
const position = reactive<{ x: number; y: number }>({
  x: 0,
  y: 0
});

// 计算右键菜单的位置
const style = computed(() => {
  return { left: `${position.x}px`, top: `${position.y}px` };
});

onMounted(() => {
  // 设置默认tab
  tabsStore.handelSetDefaultTab();
});

// 监听路由变化添加tab==>route.path changes equal tab changes
watch(
  () => route.fullPath,
  () => {
    defaultTabs.value = route.fullPath;
    const tabParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      isKeepAlive: route.meta.isKeepAlive as boolean
    };
    tabsStore.handleIncreaseTab(tabParams);
  },
  { immediate: true }
);

// 添加main顶部的tab导航
const handleTabClick = (item: TabsPaneContext) => emit("click", item);

// 删除tab，因为pinia无法使用useRouter，所以通过传递callback在actions中完成路由跳转
const handleDeleteTab = (path: TabPaneName) => emit("remove", path);

// 右键tab时才会加载dropdown组件
const handleRightClick = (e: MouseEvent, item: Menu.TabsMenuProps) => {
  folatState.value = true;
  position.x = e.clientX + 5;
  position.y = e.clientY < 75 ? 75 : e.clientY;
  if (activeTab.value?.path !== item.path) {
    activeTab.value = item;
  }
};

// 全局点击关闭右键菜单
onClickOutside(target, () => {
  folatState.value = false;
});

// 点击删除其他所有tab
const handleDeleteOtherTabs = () => {
  const path = activeTab.value?.path as string;
  const callback = () => router.push(path);
  const payload = { path, callback };
  tabsStore.handleRemoveUnselectTab(payload);
};

// 点击删除选中的tab
const handleDeleteSelectTab = () => {
  const path = activeTab.value?.path as string;
  const callback = (path: string) => router.push(path);
  const payload = {
    tabPath: path as string,
    isCurrent: path === route.path,
    callback
  };
  path !== "/home" && tabsStore.handleRemoveAliveTab(payload);
};

// 点击关闭全部
const handleDeleteAllTabs = () => {
  const callback = () => router.push("/home");
  tabsStore.handleRemoveAllTabs(callback);
};
</script>

<template>
  <div class="tabs-container">
    <Teleport to="body" v-if="folatState">
      <div :style="style" class="float-box">
        <span
          v-for="item in rightMenuList"
          :key="item.label"
          @click="item.callback"
        >
          {{ item.label }}
        </span>
      </div>
    </Teleport>
    <div class="tabs-menu">
      <el-tabs
        type="card"
        v-model="defaultTabs"
        @tab-click="handleTabClick"
        @tab-remove="handleDeleteTab"
      >
        <el-tab-pane
          v-for="item in tabList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.name !== 'home'"
        >
          <template #label>
            <span
              class="pane-box"
              ref="target"
              @contextmenu.prevent="e => handleRightClick(e, item)"
            >
              <el-icon>
                <component :is="item.icon" :key="item.path"></component>
              </el-icon>
              {{ item.title }}
            </span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs-container {
  position: relative;
  background-color: #ffffff;
}

.tabs-menu {
  position: relative;
  width: 100%;
  :deep(.el-tabs) {
    .el-tabs__header {
      box-sizing: border-box;
      height: 40px;
      padding: 0 8px;
      margin: 0;
      .el-tabs__nav-wrap {
        position: absolute;
        width: calc(100% - 70px);
        .el-tabs__nav {
          display: flex;
          border: none;
          .el-tabs__item {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #afafaf;
            border: none;
            padding: 0 10px;
            .el-icon {
              margin-right: 8px;
            }
            .tabs-icon {
              margin: 1.5px 4px 0 0;
              font-size: 15px;
            }
            .is-icon-close {
              margin-top: 1px;
            }
            &.is-active {
              color: #009688;
              &::before {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 0;
                content: "";
                border-bottom: 2px solid #009688 !important;
              }
            }
          }
        }
      }
    }
  }
  :deep(.el-dropdown) {
    height: 100%;
    > span {
      display: flex;
      align-items: center;
    }
  }
}

.pane-box {
  height: 100%;
  display: flex;
  align-items: center;
}

.float-box {
  width: 90px;
  background-color: #ffffff;
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  z-index: 100;
  box-sizing: border-box;
  padding: 4px 0;
  > span {
    height: 34px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s;
    padding: 0 8px;
    &:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>
