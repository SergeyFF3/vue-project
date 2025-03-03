<template>
  <tr>
    <td>
      <div class="column">
        <el-input
          :class="errors.mark && 'red'"
          placeholder="Значение"
          v-model="markAsString"
          @blur="saveData"
        />
        <span v-if="errors.mark" class="error">{{
          errors.mark._errors[0]
        }}</span>
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
          :class="errors.login && 'red'"
          placeholder="Значение"
          v-model="reactiveAccount.login"
          @blur="saveData"
        />
        <span v-if="errors.login" class="error">{{
          errors.login._errors[0]
        }}</span>
      </div>
    </td>

    <td :class="isTypeLDAP ? 'hidden' : 'quarter'">
      <div class="column">
        <PasswordInput
          v-model="account.password"
          :isError="Boolean(errors.password)"
          @blur="saveData"
        />
        <span v-if="errors.password" class="error">{{
          errors.password._errors[0]
        }}</span>
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
import { defineProps, defineEmits, computed, reactive, watch, ref } from "vue";
import { AccountType, type IAccount } from "@/stores/accounts";
import { getMarkAsString, parseMarks } from "@/helpers/parseMarks";
import PasswordInput from "./PasswordInput.vue";
import { validationSchema } from "@/helpers/validateData";

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
const errors = ref<{ [key: string]: any }>({});
const isTypeLDAP = computed(() => reactiveAccount.type === AccountType.LDAP);

const markAsString = computed({
  get: () => getMarkAsString(reactiveAccount.mark),
  set: (value: string) => {
    reactiveAccount.mark = parseMarks(value, ", ");
  },
});

const validateForm = () => {
  const markAsString = getMarkAsString(reactiveAccount.mark);

  const result = validationSchema.safeParse({
    ...reactiveAccount,
    mark: markAsString,
  });
  errors.value = result.success ? {} : result.error.format();
};

const saveData = () => {
  validateForm();

  if (Object.keys(errors.value).length === 0) {
    emits("saveData");
  }
};

const onDelete = () => {
  emits("deleteAccount", account.id);
};

watch(
  () => account,
  (newAccount) => {
    reactiveAccount = newAccount;
  }
);
</script>

<style scoped>
:deep(.red .el-input__wrapper) {
  border: 1px solid rgb(218, 60, 60);
}

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
  position: relative;
  margin-top: 15px;
  padding-right: 5px;
}

.button {
  position: relative;
  z-index: 10;
}

.error {
  position: absolute;
  bottom: -13px;
  left: 0;
  color: rgb(218, 60, 60);
  font-size: 12px;
}
</style>
