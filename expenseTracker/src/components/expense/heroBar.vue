<template>
  <div class="mr-2">
    <v-card class="pa-5 rounded-xl w-100 d-flex flex-column">
      <v-card-subtitle
        class="pa-0 mb-1"
        style="opacity: 0.7; letter-spacing: 1.5px; text-transform: uppercase"
      >
        Total Expense
      </v-card-subtitle>

      <v-card-title class="pa-0 mb-3 d-flex align-baseline">
        <span
          style="
            font-weight: bold;
            font-size: clamp(1.8rem, 5vw, 3rem);
            color: red;
          "
        >
          Rs {{ Math.floor(monthlyExpense || 0) }}
        </span>
      </v-card-title>

      <v-progress-linear
        :model-value="monthlySpentOnpercentage"
        color="red"
        bg-color="rgba(255, 0, 0, 0.15)"
        rounded
        height="5"
        class="mb-2"
      />

      <div class="d-flex justify-space-between">
        <span style="font-size: 0.85rem"
          >{{ monthlySpentOnpercentage }}% of Rs
          {{ monthlyBudget }} budget</span
        >
        <span style="font-size: 0.85rem">Rs 3,324.50 left</span>
      </div>
    </v-card>
  </div>
  <div class="hero-bar d-flex flex-wrap mt-4">
    <div class="left">
      <v-card class="pa-5 rounded-xl flex-grow-1 d-flex align-center">
        <div class="d-flex align-center justify-space-between w-100">
          <div>
            <v-card-subtitle>
              <span style="font-weight: normal; font-size: larger">
                This Week
              </span>
            </v-card-subtitle>

            <v-card-title>
              <span style="font-weight: bold; font-size: 1.5rem">
                Rs {{ weeklyExpense }}
              </span>
            </v-card-title>
          </div>
        </div>
      </v-card>
    </div>

    <div class="right">
      <v-card class="pa-5 rounded-xl flex-grow-1 d-flex align-center">
        <div class="d-flex align-center justify-space-between w-100">
          <div>
            <v-card-subtitle>
              <span style="font-weight: normal; font-size: larger">
                Avg / Day
              </span>
            </v-card-subtitle>

            <v-card-title>
              <span style="font-weight: bold; font-size: 1.5rem">
                {{ dailyAverage }}
              </span>
            </v-card-title>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    monthlyBudget: {
      type: Number,
      default: 0,
    },
    monthlyExpense: {
      type: Number,
      default: 0,
    },
    weeklyExpense: {
      type: Number,
      default: 0,
    },
    monthlySpentOnpercentage: {
      type: Number,
      default: 0,
    },
    dailyAverage: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
.hero-bar {
  gap: 16px;
}

.left,
.right {
  flex: 1 1 0;
  min-width: 0;
}

@media (max-width: 960px) {
  .hero-bar {
    flex-direction: column;
  }

  .left,
  .right {
    flex: 1 1 100%;
  }
}
</style>
