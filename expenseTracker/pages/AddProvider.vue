<template>
  <div class="d-flex justify-space-between">
    <div class="text-display-small mb-2">Accounts</div>
    <div>
      <v-skeleton-loader v-if="loading" type="button" class=" w-100" />
      <v-btn
        v-else
        class="bg-red"
        append-icon="mdi-briefcase-plus-outline"
        @click="
          isAddAccount = true;
          isEdit = false;
          selectedAccount = null;
        "
      >
        Add Account
      </v-btn>
    </div>
  </div>

  <div>
    <v-skeleton-loader v-if="loading" type="table" class="mt-4" />
    <AccountTable
      v-else
      :accounts="accounts"
      @edit="editAccount"
      @delete="deleteAccount"
    />
  </div>
  <v-dialog v-model="isAddAccount" persistent max-width="500px">
    <UserAccount
      @close="isAddAccount = false"
      @accountAdded="
        isAddAccount = false;
        fetchAccount();
      "
      :accountTitle="isEdit ? 'Update Account' : 'Add New Account'"
      :accountData="selectedAccount"
      :isEdit="isEdit"
    />
  </v-dialog>

  <v-dialog v-model="isAccountDelete" max-width="400px">
    <v-card>
      <v-card-title class="text-h5">Confirm Deletion</v-card-title>
      <v-card-text
        >Are you sure you want to delete this "{{
          selectedAccount.account_name
        }}" account?</v-card-text
      >
      <v-card-actions>
        <div class="d-flex justify-space-between w-100 pa-3">
          <v-btn
            class="text-white w-50"
            style="background-color: grey"
            text
            @click="isAccountDelete = false"
            >Cancel</v-btn
          >
          <v-btn
            class="text-white w-50 mx-2"
            style="background-color: red"
            text
            @click="confirmDelete"
            >Delete</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
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
      isEdit: false,
      selectedAccount: null,
      isAccountDelete: false,
      loading: false,
    };
  },
  mounted() {
    this.fetchAccount();
  },
  methods: {
    async fetchAccount() {
      this.loading = true;
      this.$http
        .get(account.account)
        .then((response) => {
          this.accounts = response.data.data.accounts;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchProvider() {
      this.$http.get(account.getProvider).then((response) => {
        this.providers = response.data.data.providers;
      });
    },

    editAccount(account) {
      this.selectedAccount = account;
      this.isEdit = true;
      this.isAddAccount = true;
    },

    deleteAccount(account) {
      this.selectedAccount = account;
      this.isAccountDelete = true;
    },

    confirmDelete() {
      this.$http
        .delete(account.updateDeleteAccount(this.selectedAccount.id))
        .then(() => {
          this.$setSnackbar("Account deleted successfully", "success");
          this.fetchAccount();
        })
        .catch((error) => {
          this.$setSnackbar("Error deleting account", "error");
          console.error("Error deleting account:", error);
        })
        .finally(() => {
          this.isAccountDelete = false;
        });
    },
  },

  components: {
    AccountTable,
    UserAccount,
  },
};
</script>
