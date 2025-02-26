<script setup lang="ts">
import "./AddNewAccount.css";
import { Plus } from "@element-plus/icons-vue";
import { useAccountStore } from "../../stores/accounts";

const accountStore = useAccountStore();

function addNewAccountHandler() {
  accountStore.addNewAccount();
}
</script>

<template>
  <div class="header__wrapper">
    <h1>Учетные записи</h1>
    <el-button type="default" :icon="Plus" @click="addNewAccountHandler" />
  </div>
</template>
