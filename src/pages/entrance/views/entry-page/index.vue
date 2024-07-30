<script lang="ts" setup>
import { entryCmsList } from "@/utils/entry-system";

const handleChooseItem = (path: string) => {
  window.location.href = path;
};
</script>

<template>
  <div class="entry-contianer">
    <div
      class="entry-boxItem"
      v-for="item in entryCmsList"
      :key="item.name"
      @click="handleChooseItem(item.path)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style.scss";
</style>
