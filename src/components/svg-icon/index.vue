<script setup lang="ts">
import { computed } from "vue";

// props type
interface IconProps {
  // icon的style
  style?: Record<string, string>;
  // icon的class
  class?: string;
  // icon的name，标识icon的类型
  name: string;
  // icon的color
  color?: string;
}

// props
const props = withDefaults(defineProps<IconProps>(), {
  color: "#ffffff"
});

// emit
const emit = defineEmits<{
  click: [];
}>();

// 计算svg的传递样式和本身样式
const iconClass = computed(() =>
  props.class ? "svg-icon " + props.class : "svg-icon"
);

// icon点击事件
const handlClick = () => emit("click");
</script>

<template>
  <svg :style="style" :class="iconClass" :fill="color" @click="handlClick">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 20px;
  height: 20px;
  overflow: hidden;
}
</style>
