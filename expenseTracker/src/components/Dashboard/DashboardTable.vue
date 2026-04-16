<template>
  <p style="font-size: 1.5rem">Linked Accounts</p>

  <table class="custom-table">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.value">
          {{ header.title }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-if="linkedAccounts.length"
        v-for="item in linkedAccounts"
        :key="item.id"
      >
        <td>{{ item.account_name }}</td>

        <td>
          <v-avatar size="36">
            <v-img :src="item.provider.logo_url" alt="logo" contain />
          </v-avatar>
        </td>

        <td>Rs {{ item.balance }}</td>
      </tr>
      <tr v-else>
        <td :colspan="headers.length" class="text-center no-data">
          No data available
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    linkedAccounts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        { title: "Account", value: "account_name" },
        { title: "Provider", value: "provider" },
        { title: "Balance", value: "balance" },
      ],
    };
  },
};
</script>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.custom-table thead {
  background-color: #f5f5f5;
}

.custom-table th {
  text-align: left;
  padding: 12px;
  font-weight: 600;
  color: #333;
}

.custom-table td {
  padding: 12px;
  border-top: 1px solid #eee;
}
.custom-table tbody tr:hover {
  background-color: #fafafa;
}
</style>
