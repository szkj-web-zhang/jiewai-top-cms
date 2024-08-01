<script lang="ts" setup>
import { useGlobalStore } from "@/stores/modules/jiewai-top-cms/global";
import { computed } from "vue";
import { HeaderItemType } from "../../views/main/home-page.vue";

interface PropsType {
  // header的title
  title: string;
  // header的下拉框
  dropList: HeaderItemType[];
}

const props = defineProps<PropsType>();

// pinia获取menu折叠状态
const globalStore = useGlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);

// pinia修改menu状态
const handleCollapseChange = () => {
  globalStore.setJiewaiTopState("isCollapse", !isCollapse.value);
};
</script>

<template>
  <div class="header-left">
    <p>{{ props.title }}</p>
    <svg-icon
      class="collapse-icon"
      :name="isCollapse ? 'left_toggle' : 'right_toggle'"
      @click="handleCollapseChange"
    />
  </div>
  <el-dropdown :hide-on-click="true">
    <div class="header-float flex-center">
      欢迎您:admin
      <el-icon size="18"><CaretBottom /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in dropList"
          :key="item.label"
          @click="item.callback"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.header-left {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  > p {
    width: 200px;
    font-family: PingFangRegular;
    color: #ffffff;
    font-size: 18px;
    user-select: none;
  }
}

.collapse-icon {
  width: 22px;
  height: 22px;
  cursor: pointer;
  margin-left: 10px;
}

.header-float {
  color: #ffffff;
  line-height: 45px;
  outline: none;
  user-select: none;
  cursor: pointer;
}

:deep(.el-dropdown-menu__item) {
  color: #333;
  transition: all 0.2s;
  &:hover {
    background-color: #f2f2f2;
    color: #333;
  }
}
</style>
