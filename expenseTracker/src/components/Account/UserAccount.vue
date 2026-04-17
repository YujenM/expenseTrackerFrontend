<template>
  <v-card class="pa-4">
    <div class="d-flex justify-space-between align-center">
      <v-title>Add New Account</v-title>
      
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
        >
        </v-select>

        <v-text-field
          v-model="balance"
          label="Initial Balance"
          class="mt-4"
        ></v-text-field>

        <!-- FIXED -->
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
  data() {
    return {
      providers: [],
      selectedProvider: null,
      accountName: "",
      balance: "",
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

  methods: {
    fetchProvider() {
      this.$http.get(account.getProvider).then((response) => {
        this.providers = response.data;
      });
    },

    addaccounts() {
      this.$http
        .post(account.account, {
          provider_id: this.selectedProvider,
          account_name: this.accountName,
          balance: parseFloat(this.balance),
        })
        .then((response) => {
          this.$setSnackbar("Account added successfully", "success");
          this.$emit("accountAdded");
        })
        .catch((error) => {
          this.$setSnackbar("Error adding account", "error");
          console.error("Error adding account:", error);
        });
    },
  },
};
</script>
