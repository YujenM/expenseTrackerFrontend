<template>
  <v-data-table
    :headers="headers"
    :items="accounts"
    item-key="id"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:item.provider="{ item }">
      <v-avatar size="40">
        <img
          :src="item.provider.logo_url"
          alt="logo"
          style="width: 100%; height: 100%; object-fit: contain"
        />
      </v-avatar>
    </template>

    <template v-slot:item.balance="{ item }"> Rs {{ item.balance }} </template>

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
export default {
  emits: ["edit", "delete"],
  props: {
    accounts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        { title: "Account", value: "account_name" },
        { title: "Provider", value: "provider" },
        { title: "Balance", value: "balance" },
        { title: "Actions", value: "actions" },
      ],
    };
  },
};
</script>
