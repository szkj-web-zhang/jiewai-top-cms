<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import SubMenu from "@/components/sub-menu/index.vue";

defineProps<{ menuList: Menu.MenuOptions[] }>();

const router = useRouter();
const route = useRoute();

const handleItemClick = (item: Menu.MenuOptions) => {
  if (route.path !== item.path) {
    router.push(item.path);
  }
};
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu v-if="item.children?.length" :index="item.path">
      <template #title>
        <svg-icon name="business" class="business-icon" />
        <span class="menu-name">{{ item.meta.title }}</span>
      </template>
      <sub-menu :menu-list="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path" @click="handleItemClick(item)">
      <svg-icon name="business" class="business-icon" />
      <template #title>
        <span class="menu-name">{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped>
.business-icon {
  width: 16px;
  height: 16px;
  fill: #333;
}

.el-sub-menu {
  :deep(.el-sub-menu__title) {
    .business-icon {
      margin-right: 10px;
    }
    &:hover {
      color: #ffffff !important;
      background-color: #009688 !important;
      .business-icon {
        fill: #ffffff;
      }
    }
  }
}

:deep(.el-tooltip__trigger) {
  .business-icon {
    margin-right: 0 !important;
  }
}

.el-menu--collapse {
  .is-active {
    .business-icon {
      fill: #ffffff;
    }
    :deep(.el-sub-menu__title) {
      color: #ffffff;
      background-color: #009688 !important;
      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 4px;
        content: "";
        background-color: #04564e;
        left: 0;
      }
    }
  }
}

.el-menu-item {
  .business-icon {
    margin-right: 10px;
  }
  &:hover {
    color: #ffffff;
    background-color: #009688;
    .business-icon {
      fill: #ffffff;
    }
  }
  &.is-active {
    color: #ffffff !important;
    background-color: #009688 !important;
    .business-icon {
      fill: #ffffff;
    }
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: #04564e;
      left: 0;
    }
  }
}
</style>
