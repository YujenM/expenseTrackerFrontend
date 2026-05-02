<template>
  <div>
    <span class="text-display-small">Expense</span>
  </div>

  <tmeplate v-if="isGetExpense">
    <v-skeleton-loader type="card" class="mt-2" />
  </tmeplate>

  <HeroBar
    v-else
    class="mt-2"
    :monthlyBudget="getExpenseData.monthlyBudget"
    :monthlyExpense="getExpenseData.monthlyExpense"
    :weeklyExpense="getExpenseData.weeklyExpense"
    :monthlySpentOnpercentage="getExpenseData.monthlySpentOnpercentage"
    :dailyAverage="getExpenseData.dailyAverage"
  />

  <template v-if="isGetExpense">
    <v-skeleton-loader type="table-row@6" class="mt-9" />
  </template>

  <div v-else>
    <ExpenseTable
      class="mt-5"
      :accounts="getExpenseData.expenseTable"
      @edit="openEditDialog"
      @delete="openDeleteDialog"
    />
  </div>
  <div>
    <v-btn
      @click="(fetchCategory(), fetchAccount(), (isExpense = true))"
      class="fab rounded-pill"
      color="red-darken-1"
      dark
      fab
      small
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>

  <v-dialog v-model="isExpense" width="560px">
    <v-card class="pa-3">
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="text-red">{{
          editingItem ? "Edit Expense" : "Add Expense"
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

        <label class="text-caption text-medium-emphasis mb-1 d-block"
          >description</label
        >
        <v-textarea
          v-model="expenseDescription"
          type="text"
          variant="outlined"
          prepend-inner-icon="mdi-text"
          placeholder="Enter description..."
        />

        <label class="text-caption text-medium-emphasis mb-1 d-block"
          >Expense Recived Date</label
        >
        <v-menu v-model="dateMenu" :close-on-content-click="false">
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              v-model="expenseDate"
              variant="outlined"
              prepend-inner-icon="mdi-calendar"
              readonly
              placeholder="Select date..."
            />
          </template>
          <v-date-picker
            v-model="expenseDate"
            @update:model-value="dateMenu = false"
          />
        </v-menu>

        <v-btn class="w-100 bg-red" @click="submitFormBtn()">{{
          editingItem ? "update" : "submit"
        }}</v-btn>
      </v-form>
    </v-card>
  </v-dialog>

  <v-dialog v-model="isDeleteModel" width="560px">
    <v-card class="pa-2 rounded-xl">
      <div class="mx-3 my-2 d-flex justify-space-between">
        <v-title class="text-red">Delete Expense</v-title>
        <v-icon @click="isDeleteModel = false" class="mx-3" color="red"
          >mdi-close</v-icon
        >
      </div>
      <v-card-text
        >Do you really want yo delete "{{ deletingExpenseData.category.name }}"
        expense from "{{ deletingExpenseData.account.account_name }}"
        account"</v-card-text
      >
      <v-row class="pa-3">
        <v-col cols="6">
          <v-btn @click="isDeleteModel = false" class="w-100">cancel</v-btn>
        </v-col>

        <v-col cols="6">
          <v-btn
            @click="deleteExpense(deletingExpenseData.id)"
            class="w-100 bg-red"
            >Delete</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import HeroBar from "../src/components/expense/heroBar.vue";
import expense from "../src/api/expense";
import ExpenseTable from "../src/components/expense/ExpenseTable.vue";
import category from "../src/api/category";
import account from "../src/api/account";

export default {
  components: {
    HeroBar,
    ExpenseTable,
  },
  data() {
    return {
      isGetExpense: false,
      getExpenseData: [],
      isExpense: false,
      editingItem: null,
      category: [],
      account: [],
      selectedCategory: null,
      selectedAccount: null,
      expenseDate: null,
      expenseDescription: "",
      dateMenu: false,
      amount: 0,
      expenseId: null,
      isDeleteModel: false,
      deletingExpenseData: [],
    };
  },
  mounted() {
    this.getExpense();
  },
  methods: {
    closeDialog() {
      this.isExpense = false;
      this.amount = 0;
      this.expenseDescription = "";
      this.selectedCategory = null;
      this.selectedAccount = null;
      this.expenseDate = null;
      this.editingItem = null;
    },

    async getExpense() {
      this.isGetExpense = true;
      this.$http
        .get(expense.expense)
        .then((response) => {
          this.getExpenseData = response.data.data;
          this.isGetExpense = false;
        })
        .catch((err) => {
          this.isGetExpense = false;
          console.error(err);
        });
    },

    async fetchCategory() {
      this.$http
        .get(category.category("expense"))
        .then((response) => {
          this.category = response.data.category;
        })
        .catch(() => {
          this.$setSnackbar("Failed to fetch category", "error");
        });
    },

    async fetchAccount() {
      this.$http
        .get(account.account)
        .then((response) => {
          this.account = response.data.data.accounts;
        })
        .catch(() => {
          this.$setSnackbar("Failed to fetch account", "error");
        });
    },

    openEditDialog(item) {
      this.editingItem = item;
      this.amount = item.amount;
      this.expenseDescription = item.description;
      this.selectedCategory = item.category?.id;
      this.selectedAccount = item.account?.id;
      this.expenseDate = item.expense_date.split("T")[0];
      this.fetchCategory();
      this.fetchAccount();
      this.isExpense = true;
    },

    openDeleteDialog(item) {
      this.isDeleteModel = true;
      this.deletingExpenseData = item;
    },

    deleteExpense(item_id) {
      this.$http
        .delete(expense.updateDeleteExpense(item_id))
        .then((res) => {
          this.$setSnackbar("Expense has been deleted");
          this.isDeleteModel = false;
          this.getExpense();
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async submitFormBtn() {
      const payload = {
        amount: this.amount,
        category_id: this.selectedCategory,
        account_id: this.selectedAccount,
        description: this.expenseDescription,
        expense_date: this.expenseDate,
      };

      if (this.editingItem) {
        this.$http
          .put(expense.updateDeleteExpense(this.editingItem.id), payload)
          .then(() => {
            this.$setSnackbar("Expense updated successfully", "success");
            this.closeDialog();
            this.getExpense();
          })
          .catch((err) => {
            this.$setSnackbar("Failed to update expense", "error");
            console.error(err);
          });
      } else {
        console.log("here1");
        this.$http
          .post(expense.expense, payload)
          .then(() => {
            this.$setSnackbar("Expense added successfully", "success");
            this.closeDialog();
            this.getExpense();
          })
          .catch((err) => {
            this.$setSnackbar("Failed to add expense", "error");
          });
      }
    },
  },
};
</script>

<style>
.fab {
  position: fixed;
  right: 28px;
  bottom: 90px;
  z-index: 2000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
