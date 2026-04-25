<template>
  <div class="page-wrapper">
    <div>
      <span class="text-display-small">Income</span>
    </div>

    <template v-if="isHeroBarLoading">
      <v-skeleton-loader type="card" class="mt-4" />
    </template>
    <HeroBar
      v-else
      :totalIncome="incomeData.totalIncome"
      :primarySource="primarySource"
    />

    <template v-if="isIncomeTableLoading">
      <v-skeleton-loader type="table-row@6" class="mt-9" />
    </template>
    <IncomeTable
      v-else
      class="mt-9"
      :accounts="incomeData"
      @edit="editform($event)"
      @delete="deleteform($event)"
    />

    <v-btn
      @click="(fetchCategory(), fetchAccount(), (isAddIncome = true))"
      class="fab rounded-pill"
      color="red-darken-1"
      dark
      fab
      small
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>

  <v-dialog v-model="isAddIncome" width="560px">
    <v-card class="pa-3">
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="text-red">{{
          editingItem ? "Edit Income" : "Add Income"
        }}</v-card-title>

        <v-icon @click="closeDialog()" class="mx-3" color="red"
          >mdi-close</v-icon
        >
      </div>
      <v-form class="pa-2">
        <label class="text-caption text-medium-emphasis mb-1 d-block"
          >Amount</label
        >
        <v-text-field
          v-model="amount"
          type="number"
          prepend-inner-icon="mdi-currency-usd"
          variant="outlined"
        />

        <v-row>
          <v-col cols="6">
            <label class="text-caption text-medium-emphasis mb-1 d-block"
              >Category</label
            >
            <v-select
              v-model="selectedCategory"
              :items="category"
              item-title="name"
              item-value="id"
              variant="outlined"
              prepend-inner-icon="mdi-tag-outline"
              required
            />
          </v-col>

          <v-col cols="6">
            <label class="text-caption text-medium-emphasis mb-1 d-block"
              >Account</label
            >
            <v-select
              v-model="selectedAccount"
              :items="account"
              item-title="account_name"
              item-value="id"
              variant="outlined"
              prepend-inner-icon="mdi-account"
              :disabled="!!editingItem"
              required
            />
          </v-col>
        </v-row>

        <div>
          <label class="text-caption text-medium-emphasis mb-1 d-block mr-2"
            >Source</label
          >
          <v-text-field
            v-model="incomeSource"
            type="text"
            placeholder="Enter your source.."
            variant="outlined"
          />
        </div>

        <label class="text-caption text-medium-emphasis mb-1 d-block"
          >description</label
        >
        <v-textarea
          v-model="incomeDescription"
          type="text"
          variant="outlined"
          prepend-inner-icon="mdi-text"
          placeholder="Enter description..."
        />

        <label class="text-caption text-medium-emphasis mb-1 d-block"
          >Income Recived Date</label
        >
        <v-menu v-model="dateMenu" :close-on-content-click="false">
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              v-model="incomeDate"
              variant="outlined"
              prepend-inner-icon="mdi-calendar"
              readonly
              placeholder="Select date..."
            />
          </template>
          <v-date-picker
            v-model="incomeDate"
            @update:model-value="dateMenu = false"
          />
        </v-menu>

        <label class="text-caption text-medium-emphasis mb-1 d-block"
          >Next Recieved Date</label
        >
        <v-menu v-model="nextReciveMenu" :close-on-content-click="false">
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              v-model="nextReciveDate"
              variant="outlined"
              prepend-inner-icon="mdi-calendar"
              readonly
              placeholder="Select date..."
            />
          </template>
          <v-date-picker
            v-model="nextReciveDate"
            @update:model-value="nextReciveMenu = false"
          />
        </v-menu>

        <div class="d-flex align-center">
          <label class="text-caption text-medium-emphasis mb-1 d-block mr-2"
            >Primary Source</label
          >
          <v-switch
            v-model="isPrimarySource"
            color="red-darken-1"
            hide-details
            inset
          />
        </div>

        <v-btn class="w-100 bg-red" @click="submitFormBtn()">Submit</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import HeroBar from "../src/components/income/herobar.vue";
import IncomeTable from "../src/components/income/IncomeTable.vue";
import incomeApi from "../src/api/income";
import category from "../src/api/category";
import account from "../src/api/account";

export default {
  components: {
    HeroBar,
    IncomeTable,
  },

  mounted() {
    this.fetchIncome();
    this.fetchprimarySource();
  },

  data() {
    return {
      incomeData: [],
      primarySource: [],
      category: [],
      account: [],
      isPrimarySource: false,
      isAddIncome: false,
      editingItem: null,
      amount: 0,
      incomeSource: "",
      incomeDescription: "",
      selectedCategory: null,
      selectedAccount: null,
      incomeDate: null,
      nextReciveDate: null,
      dateMenu: false,
      nextReciveMenu: false,
      isHeroBarLoading: false,
      isIncomeTableLoading: false,
    };
  },

  methods: {
    async fetchIncome() {
      this.isHeroBarLoading = true; 
      this.isIncomeTableLoading = true; 
      this.$http.get(incomeApi.income).then((response) => {
        this.incomeData = response.data.income;
        this.isHeroBarLoading = false;
        this.isIncomeTableLoading = false; 
      });
    },

    async submitFormBtn() {
      if (
        !this.amount ||
        !this.selectedCategory ||
        !this.selectedAccount ||
        !this.incomeSource ||
        !this.incomeDate
      ) {
        this.$setSnackbar("Fill Form Completely", "error");
        return;
      }

      const payload = {
        account_id: this.selectedAccount,
        category_id: this.selectedCategory,
        amount: this.amount,
        source: this.incomeSource,
        description: this.incomeDescription,
        income_date: this.incomeDate,
        isPrimary: this.isPrimarySource,
        nextExpectedDate: this.nextReciveDate,
      };

      if (this.editingItem) {
        this.$http
          .put(incomeApi.updateDeleteIncome(this.editingItem.id), payload)
          .then(() => {
            this.$setSnackbar("Income updated", "success");
            this.fetchIncome();
            this.fetchprimarySource();
            this.closeDialog();
          })
          .catch((error) => {
            this.$setSnackbar(error, "error");
          });
      } else {
        this.$http
          .post(incomeApi.income, payload)
          .then(() => {
            this.$setSnackbar("Income added", "success");
            this.fetchIncome();
            this.fetchprimarySource();
            this.closeDialog();
          })
          .catch((error) => {
            this.$setSnackbar(error, "error");
          });
      }
    },

    editform(item) {
      console.log(item.account.id);
      this.editingItem = item;
      this.amount = item.amount;
      this.incomeSource = item.source;
      this.incomeDescription = item.description;
      this.selectedCategory = item.category.id;
      this.selectedAccount = item.account;
      this.incomeDate = item.income_date;
      this.nextReciveDate = item.nextExpectedDate;
      this.isPrimarySource = item.isPrimary;
      this.fetchCategory();
      this.fetchAccount().then(() => {
        this.selectedAccount = item.account.id;
        console.log(this.selectedAccount);
      });
      this.isAddIncome = true;
    },

    closeDialog() {
      this.isAddIncome = false;
      this.editingItem = null;
      this.amount = 0;
      this.incomeSource = "";
      this.incomeDescription = "";
      this.selectedCategory = null;
      this.selectedAccount = null;
      this.incomeDate = null;
      this.nextReciveDate = null;
      this.isPrimarySource = false;
    },

    deleteform(item) {
      this.$http.delete(incomeApi.updateDeleteIncome(item.id)).then(() => {
        this.fetchIncome();
        this.fetchprimarySource();
        this.$setSnackbar(`${item.source} sucessfully deleted`, "success");
      });
    },

    async fetchCategory() {
      this.$http
        .get(category.category("income"))
        .then((response) => {
          this.category = response.data.category;
        })
        .catch(() => {
          this.$setSnackbar("Failed to fetch category", "error");
        });
    },

    async fetchAccount() {
      return this.$http
        .get(account.account)
        .then((response) => {
          this.account = response.data.data.accounts;
        })
        .catch(() => {
          this.$setSnackbar("Failed to fetch account", "error");
        });
    },

    async fetchprimarySource() {
      this.$http.get(incomeApi.primarySource).then((response) => {
        this.primarySource = response.data;
      });
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  position: relative;
  min-height: 100vh;
  padding-bottom: 88px;
}

.fab {
  position: fixed;
  right: 28px;
  bottom: 90px;
  z-index: 2000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>