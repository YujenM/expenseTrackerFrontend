<template>
  <v-data-table
    :headers="headers"
    :items="formattedIncome"
    item-key="id"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Recent Income Flows</v-toolbar-title>
      </v-toolbar>
    </template>

    <template v-slot:item.account="{ item }">
      <div class="d-flex align-center">
        <v-avatar size="24" class="mr-2">
          <v-img :src="item.account.logo" :alt="item.account.name" />
        </v-avatar>
        {{ item.account.name }}
      </div>
    </template>

    <template v-slot:item.actions="{ item }">
      <div class="pa-3 d-flex justify-start">
        <v-btn class="mr-2" icon color="primary" @click="$emit('edit', item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn class="mx-2" icon color="red" @click="$emit('delete', item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import category from "../../api/category";

export default {
  emits: ["edit", "delete"],
  props: {
    accounts: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedIncome() {
      return (this.accounts.income || []).map((item) => ({
        id: item.id,
        source: item.source,
        account: {
          id: item.account_id,
          name: item.account?.provider?.name,
          logo: item.account?.provider?.logo_url,
        },
        date: new Date(item.income_date).toLocaleDateString(),
        amount: item.amount,
        description: item.description,
        income_date: item.income_date,
        nextExpectedDate: item.nextExpectedDate,
        category: item.category,
        isPrimary: item.isPrimary,
      }));
    },
  },
  data() {
    return {
      headers: [
        { title: "Source", value: "source" },
        { title: "Account", value: "account" },
        { title: "Date", value: "date" },
        { title: "Amount", value: "amount" },
        { title: "Actions", value: "actions" },
      ],
    };
  },
};
</script>
