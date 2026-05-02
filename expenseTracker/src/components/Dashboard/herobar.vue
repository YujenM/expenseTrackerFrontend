<template>
  <v-row class="my-4" align="stretch">
    
    <!-- Available Balance -->
    <v-col cols="12" sm="12" md="6" class="d-flex">
      <v-card class="pa-4 w-100 d-flex flex-column" elevation="2" rounded="lg">
        <div class="text-title-large mb-2">Available Balance</div>
        <div class="text-display-large">Rs {{ availableBalance }}</div>
      </v-card>
    </v-col>

    <!-- Monthly Income -->
    <v-col cols="12" sm="6" md="3" class="d-flex">
      <v-card class="pa-4 w-100 d-flex flex-column" elevation="2" rounded="lg">
        <v-icon class="bg-green rounded-xl pa-3 mb-2">
          mdi-arrow-bottom-left
        </v-icon>
        <div class="text-title-small">Monthly Income</div>
        <div class="text-display-small mt-auto">Rs {{ monthlyIncome }}</div>
      </v-card>
    </v-col>

    <!-- Monthly Expense -->
    <v-col cols="12" sm="6" md="3" class="d-flex">
      <v-card class="pa-4 w-100 d-flex flex-column" elevation="2" rounded="lg">
        <v-icon class="bg-red rounded-xl pa-3 mb-2">
          mdi-arrow-top-right
        </v-icon>
        <div class="text-title-small">Monthly Spending</div>
        <div class="text-display-small mt-auto">Rs {{ monthlyExpense }}</div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    availableBalance: {
      type: Number,
      default: 0,
    },
    monthlyIncome: {
      type: Number,
      default: 0,
    },
    monthlyExpense: {
      type: Number,
      default: 0,
    },
  },
};
</script>
