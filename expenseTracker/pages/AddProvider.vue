<template>
  <div class="d-flex justify-space-between">
    <div class="text-display-small mb-2">Accounts</div>
    <v-btn
      class="bg-red"
      append-icon="mdi-briefcase-plus-outline"
      @click="isAddAccount = true"
    >
      Add Account
    </v-btn>
  </div>

  <AccountTable
    :accounts="accounts"
    @edit="editAccount"
    @delete="deleteAccount"
  />
  <v-dialog v-model="isAddAccount" persistent max-width="500px">
    <UserAccount
      @close="isAddAccount = false"
      @accountAdded="
        isAddAccount = false;
        fetchAccount();
      "
    />
  </v-dialog>
</template>

<script>
import AccountTable from "../src/components/Account/AccountTable.vue";
import account from "../src/api/account.js";
import UserAccount from "../src/components/Account/UserAccount.vue";

export default {
  data() {
    return {
      accounts: [],
      isAddAccount: false,
    };
  },
  mounted() {
    this.fetchAccount();
  },
  methods: {
    async fetchAccount() {
      this.$http
        .get(account.account)
        .then((response) => {
          this.accounts = response.data.data.accounts;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchProvider() {
      this.$http.get(account.getProvider).then((response) => {
        this.providers = response.data.data.providers;
      });
    },

    editAccount(account) {
      console.log("Edit account:", account);
    },

    deleteAccount(account) {
      console.log("Delete account:", account);
    },
  },

  components: {
    AccountTable,
    UserAccount,
  },
};
</script>
