<script lang="ts" setup>
import { onBeforeMount, ref, watch } from "vue";
import { dynamic_menu_get } from "@/api/modules/jiewai-top-cms";
import { getHandleMenuList } from "@/utils/list-handler";

// 入口列表
const dynamicList = ref<Menu.MenuOptions[]>();

onBeforeMount(async () => {
  // 获取左侧菜单数据
  const res = await dynamic_menu_get();
  if (res.code === 200) {
    const list = getHandleMenuList(res.data);
    dynamicList.value = list ?? [];
  }
});

const handleChooseItem = (item: Menu.MenuOptions) => {
  // window.location.href = "/jiewai-top-cms";
  window.location.href = "/system-module";
};
</script>

<template>
  <div class="entry-contianer">
    <div
      class="entry-boxItem"
      v-for="item in dynamicList"
      :key="item.name"
      @click="handleChooseItem(item)"
    >
      {{ item.meta.title }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.entry-contianer {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
}

.entry-boxItem {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  background-color: aliceblue;
  cursor: pointer;
}
</style>
