import { defineStore } from "pinia";
import { ref } from "vue";

interface IMark {
  text: string;
}

enum AccountType {
  LOCAL = "Локальная",
  LDAP = "LDAP",
}

type AccountFieldKey = "login" | "password";

interface IAccount {
  id: string;
  mark: IMark[];
  type: AccountType;
  login: string;
  password: null | string;
}

export const useAccountStore = defineStore("account", () => {
  const accounts = ref<IAccount[]>([]);

  function addNewAccount() {
    const id = crypto.randomUUID();
    const newAccount: IAccount = {
      id,
      mark: [],
      type: AccountType.LOCAL,
      login: "",
      password: "",
    };

    accounts.value = [...accounts.value, newAccount];
  }

  function onChangeField(
    id: string,
    nameField: AccountFieldKey,
    value: string
  ) {
    const account = accounts.value.find((account) => account.id === id);

    if (account) {
      account[nameField] = value;
    }
  }

  function saveAccount(state: IAccount) {
    accounts.value = accounts.value.map((account) => {
      if (account.id === state.id) {
        if (state.type === AccountType.LDAP) {
          return { ...state, password: null };
        }
        return state;
      }

      return account;
    });
  }

  function deleteAccount(id: string) {
    accounts.value = accounts.value.filter((account) => account.id !== id);
  }

  return { accounts, addNewAccount, deleteAccount, saveAccount, onChangeField };
});
