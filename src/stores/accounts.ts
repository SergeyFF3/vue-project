import { defineStore } from "pinia";
import { ref, watch } from "vue";

interface IMark {
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
  password: string;
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

  const saveData = () => {
    const newAccounts = accounts.value.map((account) => {
      const mark = account.mark.map((item) => item.text).join("; ");
      return { ...account, mark };
    });

    const validAccounts = newAccounts.filter(
      (account) =>
        account.mark && account.type && account.login && account.password
    );

    const normalizeAccounts = accounts.value.filter((account) =>
      validAccounts.some((newAccount) => newAccount.id === account.id)
    );

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(normalizeAccounts));
  };

  watch(accounts, saveData, { deep: true });

  return {
    accounts,
    addNewAccount,
    deleteAccount,
    saveData,
  };
});
