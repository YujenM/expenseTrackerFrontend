<template>
  <div class="page-wrapper">
    <div>
      <span class="text-display-small">Income</span>
    </div>

    <HeroBar
      :totalIncome="incomeData.totalIncome"
      :primarySource="primarySource"
    />
    <IncomeTable class="mt-9" :accounts="incomeData" />

    <v-btn class="fab rounded-pill" color="red-darken-1" dark fab small>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import HeroBar from "../src/components/income/herobar.vue";
import IncomeTable from "../src/components/income/IncomeTable.vue";
import incomeApi from "../src/api/income";

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
    };
  },

  methods: {
    async fetchIncome() {
      this.$http.get(incomeApi.income).then((response) => {
        this.incomeData = response.data.income;
      });
    },

    async fetchprimarySource() {
      this.$http.get(incomeApi.primarySource).then((response) => {
        console.log(response);
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
