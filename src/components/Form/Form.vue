<template>
  <el-table :data="accounts" style="width: 100%">
    <el-table-column prop="mark" label="Метка">
      <template #default="{ row }">
        <el-input
          placeholder="Значение"
          :model-value="getMarkAsString(row)"
          @input="setMarkAsString(row, $event)"
          @blur="saveData"
        />
      </template>
    </el-table-column>

    <el-table-column prop="type" label="Тип записи">
      <template #default="{ row }">
        <el-select v-model="row.type" @change="saveData">
          <el-option
            v-for="option in typeOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </template>
    </el-table-column>

    <el-table-column prop="login" label="Логин">
      <template #default="{ row }">
        <el-input placeholder="Значение" v-model="row.login" @blur="saveData" />
      </template>
    </el-table-column>

    <el-table-column prop="password" label="Пароль">
      <template #default="{ row }">
        <el-input
          v-if="row.type === AccountType.LOCAL"
          v-model="row.password"
          :type="isVisiblePassword ? 'text' : 'password'"
          @blur="saveData"
          placeholder="Введите пароль"
        >
          <template #suffix>
            <el-icon :size="20" @click="toggleIsVisibilityPassword">
              <component :is="isVisiblePassword ? View : Hide" />
            </el-icon>
          </template>
        </el-input>
      </template>
    </el-table-column>

    <el-table-column>
      <template #default="{ row }">
        <el-button @click="deleteAccount(row.id)" icon="Delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "element-plus/dist/index.css";
import { View, Hide } from "@element-plus/icons-vue";
import { useAccountStore, type IAccount, AccountType } from "@/stores/accounts";

const accountStore = useAccountStore();
const { accounts, deleteAccount, saveData } = accountStore;

const isVisiblePassword = ref(false);
const typeOptions = [
  { value: AccountType.LOCAL, label: "Локальная" },
  { value: AccountType.LDAP, label: "LDAP" },
];

const toggleIsVisibilityPassword = () => {
  isVisiblePassword.value = !isVisiblePassword.value;
};

const getMarkAsString = (row: IAccount) => {
  return row.mark.map((item) => item.text).join(", ");
};

const setMarkAsString = (row: IAccount, value: string) => {
  row.mark = value
    .split(",")
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text) => ({ text }));
};
</script>
