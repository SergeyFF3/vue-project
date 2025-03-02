<template>
  <table v-if="Boolean(accounts.length)">
    <thead>
      <tr>
        <th v-for="column in nameColumns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <AccountItem
        v-for="account in accounts"
        :account="account"
        @saveData="saveData"
        @deleteAccount="deleteAccount"
      />
    </tbody>
  </table>
  <h1 v-if="!Boolean(accounts.length)">Список пуст</h1>
</template>

<script setup lang="ts">
import "element-plus/dist/index.css";
import { useAccountStore } from "@/stores/accounts";
import AccountItem from "./AccountItem.vue";

const accountStore = useAccountStore();
const { accounts, deleteAccount, saveData } = accountStore;

const nameColumns = ["Метка", "Тип записи", "Логин", "Пароль", ""];
</script>

<style scoped>
tr {
  display: flex;
}

th {
  font-size: 14px;
  font-weight: normal;
  color: lightgray;
  text-align: left;
  width: 25%;
}

th:nth-child(2) {
  width: 20%;
}

th:last-child {
  width: 5%;
}

h1 {
  text-align: center;
}
</style>
