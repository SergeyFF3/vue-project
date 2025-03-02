<template>
  <div class="header__wrapper">
    <h1>Учетные записи</h1>
    <el-button type="default" :icon="Plus" @click="addNewAccount" />
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { useAccountStore } from "@/stores/accounts";

const accountStore = useAccountStore();
const { addNewAccount } = accountStore;
</script>

<style scoped>
.header__wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
