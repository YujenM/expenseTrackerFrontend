<template>
  <v-data-table
    :headers="headers"
    :items="formattedExpense"
    item-key="id"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Recent Expense Flows</v-toolbar-title>
      </v-toolbar>
    </template>

    <template v-slot:item.account="{ item }">
      <div class="d-flex align-center">
        <v-avatar size="24" class="mr-2">
          <v-img
            :src="item.account.provider.logo_url"
            :alt="item.account.account_name"
          />
        </v-avatar>
        {{ item.account.account_name }}
      </div>
    </template>

    <template v-slot:item.actions="{ item }">
      <div class="pa-3 d-flex justify-start">
        <v-btn
          class="mr-2"
          icon
          color="primary"
          @click="$emit('edit', item.raw)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn class="mx-2" icon color="red" @click="$emit('delete', item.raw)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script>
export default {
  emits: ["edit", "delete"],
  props: {
    accounts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    formattedExpense() {
      return (this.accounts || []).map((item) => ({
        id: item.id,
        expense: item.category?.name,
        account: item.account,
        date: item.expense_date.split("T")[0],
        amount: Number(item.amount),
        raw: item,
      }));
    },
  },
  data() {
    return {
      headers: [
        { title: "Expense", value: "expense" },
        { title: "Account", value: "account" },
        { title: "Date", value: "date" },
        { title: "Amount", value: "amount" },
        { title: "Actions", value: "actions" },
      ],
    };
  },
};
</script>
