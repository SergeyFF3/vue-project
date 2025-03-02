<template>
  <tr>
    <td>
      <div class="column">
        <el-input
          placeholder="Значение"
          v-model="markAsString"
          @blur="saveData"
        />
      </div>
    </td>

    <td>
      <div class="column">
        <el-select v-model="reactiveAccount.type">
          <el-option
            v-for="option in typeOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </div>
    </td>

    <td :class="isTypeLDAP ? 'full' : 'quarter'">
      <div class="column">
        <el-input
          placeholder="Значение"
          v-model="reactiveAccount.login"
          @blur="saveData"
        />
      </div>
    </td>

    <td :class="isTypeLDAP ? 'hidden' : 'quarter'">
      <div class="column">
        <PasswordInput v-model="account.password" @blur="saveData" />
      </div>
    </td>

    <td>
      <div class="column">
        <el-button class="button" @click="onDelete" icon="Delete"></el-button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import "element-plus/dist/index.css";
import { defineProps, defineEmits, computed, reactive, watch } from "vue";
import { AccountType, type IAccount } from "@/stores/accounts";
import { getMarkAsString, parseMarks } from "@/helpers/parseMarks";
import PasswordInput from "./PasswordInput.vue";

const { account } = defineProps<{ account: IAccount }>();
const emits = defineEmits<{
  (e: "deleteAccount", id: string): void;
  (e: "saveData"): void;
}>();

const typeOptions = [
  { value: AccountType.LOCAL, label: "Локальная" },
  { value: AccountType.LDAP, label: "LDAP" },
];

let reactiveAccount = reactive<IAccount>(account);
const isTypeLDAP = computed(() => reactiveAccount.type === AccountType.LDAP);

const markAsString = computed({
  get: () => getMarkAsString(reactiveAccount.mark),
  set: (value: string) => {
    reactiveAccount.mark = parseMarks(value, ", ");
  },
});

const onDelete = () => {
  emits("deleteAccount", account.id);
};

const saveData = () => {
  emits("saveData");
};

watch(
  () => account,
  (newAccount) => {
    reactiveAccount = newAccount;
  }
);
</script>

<style scoped>
tr {
  width: 100%;
}

td:first-child {
  width: 25%;
}

td:nth-child(2) {
  width: 20%;
}

td:nth-child(3) {
  transition: width 0.5s ease;
}

td:nth-child(4) {
  transition: width 0.5s ease, opacity 0.5s ease;
}

td:last-child {
  width: 5%;
}

.quarter {
  width: 25%;
}
.full {
  width: 50%;
}
.hidden {
  width: 0%;
  opacity: 0;
}

.column {
  margin-top: 5px;
  padding-right: 5px;
}

.button {
  position: relative;
  z-index: 100;
}
</style>
