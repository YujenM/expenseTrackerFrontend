<template>
  <v-card class="pa-4">
    <div class="d-flex justify-space-between align-center">
      <v-card-title>{{ accountTitle }}</v-card-title>

      <v-icon @click="$emit('close')">mdi-close</v-icon>
    </div>

    <v-divider class="my-4"></v-divider>

    <v-card-text>
      <v-form>
        <v-select
          v-model="selectedProvider"
          label="Financial Provider"
          :items="providers"
          item-title="name"
          item-value="id"
          @click="fetchProvider"
          :disabled="isEdit"
        >
        </v-select>

        <v-text-field
          v-model="balance"
          label="Initial Balance"
          class="mt-4"
        ></v-text-field>

        <v-btn class="mt-4 bg-red" block @click="addaccounts">
          Save Account
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import account from "../../api/account";

export default {
  emits: ["close", "accountAdded"],

  props: {
    accountTitle: String,
    accountData: Object,
    isEdit: Boolean,
  },

  data() {
    return {
      providers: [],
      selectedProvider: null,
      accountName: "",
      balance: 0,
    };
  },

  watch: {
    selectedProvider(value) {
      const provider = this.providers.find((item) => item.id === value);

      if (provider) {
        this.accountName = provider.name;
      }
    },
  },

  mounted() {
    if (this.isEdit && this.accountData) {
      this.selectedProvider = this.accountData.account_name;
      this.accountName = this.accountData.account_name;
      this.balance = this.accountData.balance;
    }
  },

  methods: {
    fetchProvider() {
      this.$http.get(account.getProvider).then((response) => {
        this.providers = response.data;
      });
    },

    addaccounts() {
      const request = this.isEdit
        ? this.$http.put(
            `${account.updateDeleteAccount(this.accountData.id)}`,
            {
              balance: parseFloat(this.balance),
            },
          )
        : this.$http.post(account.account, {
            provider_id: this.selectedProvider,
            account_name: this.accountName,
            balance: parseFloat(this.balance),
          });

      request
        .then(() => {
          this.$setSnackbar(
            this.isEdit
              ? "Account updated successfully"
              : "Account added successfully",
            "success",
          );
          this.$emit("accountAdded");
        })
        .catch((error) => {
          this.$setSnackbar("Error saving account", "error"); // CHANGED
          console.error("Error saving account:", error);
        });
    },
  },
};
</script>
