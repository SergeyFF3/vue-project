import { getMarkAsString, parseMarks } from "@/helpers/parseMarks";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export interface IMark {
  text: string;
}

export enum AccountType {
  LOCAL = "Локальная",
  LDAP = "LDAP",
}

export interface IAccount {
  id: string;
  mark: IMark[];
  type: AccountType;
  login: string;
  password: null | string;
}

const LOCAL_STORAGE_KEY = "state";
const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

export const useAccountStore = defineStore("accountStore", () => {
  const accounts = ref<IAccount[]>(data);

  function addNewAccount() {
    const id = crypto.randomUUID();
    const newAccount: IAccount = {
      id,
      mark: [{ text: "" }],
      type: AccountType.LOCAL,
      login: "",
      password: "",
    };

    accounts.value.push(newAccount);
  }

  function deleteAccount(id: string) {
    const index = accounts.value.findIndex((account) => account.id === id);
    if (index !== -1) {
      accounts.value.splice(index, 1);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accounts.value));
    }
  }

  function saveData() {
    const newAccounts = accounts.value.map((account) => {
      const markAsString = getMarkAsString(account.mark);
      const parseMark = parseMarks(markAsString, ";");

      if (account.type === AccountType.LDAP) {
        return { ...account, mark: parseMark, password: null };
      }

      return { ...account, mark: parseMark };
    });

    const validAccounts = newAccounts.filter((account) => {
      if (account.type === AccountType.LDAP) {
        return account.login;
      }
      return account.login && account.password;
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(validAccounts));
  }

  watch(accounts, saveData, { deep: true });

  return {
    accounts,
    addNewAccount,
    deleteAccount,
    saveData,
  };
});
