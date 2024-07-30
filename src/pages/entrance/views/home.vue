<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleToEntry = () => {
  router.push("/entry");
};
</script>

<template>
  <div @click="handleToEntry">login--home</div>
</template>

<style lang="scss" scoped></style>
