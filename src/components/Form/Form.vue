<script setup lang="ts">
import { computed } from "vue";
import { useAccountStore } from "../../stores/accounts";

const accountStore = useAccountStore();
const accounts = computed(() => accountStore.accounts);
</script>

<template>
  <el-table :data="accounts" style="width: 100%">
    <el-table-column prop="mark" label="Метки" min-width="22%" />
    <el-table-column prop="type" label="Тип записи" min-width="14%" />
    <el-table-column prop="login" label="Логин" min-width="22%" />
    <el-table-column prop="password" label="Пароль" min-width="22%" />
    <el-table-column min-width="5%"> </el-table-column>
  </el-table>
</template>
