<template>
  <div class="hero-bar d-flex flex-wrap">
    <!-- LEFT -->
    <div class="left d-flex">
      <v-card class="pa-5 rounded-xl w-100 d-flex flex-column">
        <v-card-subtitle>
          <span style="font-weight: normal; font-size: larger">
            Total Income
          </span>
        </v-card-subtitle>

        <v-card-title class="flex-grow-1 d-flex align-center">
          <span style="font-weight: bold; font-size: clamp(1.5rem, 5vw, 4rem)">
            Rs {{ totalIncome }}
          </span>
        </v-card-title>

        <v-card-text class="mt-5 d-flex align-center">
          <v-icon class="mr-2" size="20"> mdi-trending-up </v-icon>
          <span style="font-weight: normal; font-size: larger">
            Breakdown
          </span>
        </v-card-text>
      </v-card>
    </div>

    <!-- RIGHT -->
    <div class="right d-flex flex-column">
      <v-card class="pa-5 rounded-xl flex-grow-1 d-flex align-center">
        <div class="d-flex align-center justify-space-between w-100">
          <div>
            <v-card-subtitle>
              <span style="font-weight: normal; font-size: larger">
                Primary Source
              </span>
            </v-card-subtitle>

            <v-card-title>
              <span style="font-weight: bold; font-size: 1.5rem">
                {{ primarySource?.source || "" }}
              </span>
            </v-card-title>
          </div>

          <div class="bg-red pa-3 rounded-xl">
            <v-icon size="25"> mdi-briefcase </v-icon>
          </div>
        </div>
      </v-card>

      <v-card class="pa-5 rounded-xl mt-2 flex-grow-1 d-flex align-center">
        <div class="d-flex align-center justify-space-between w-100">
          <div>
            <v-card-subtitle>
              <span style="font-weight: normal; font-size: larger">
                Next Expected
              </span>
            </v-card-subtitle>

            <v-card-title>
              <span style="font-weight: bold; font-size: 1.5rem">
                {{ primarySource?.nextExpectedDate || "" }}
              </span>
            </v-card-title>
          </div>

          <div class="bg-red pa-3 rounded-xl">
            <v-icon size="25"> mdi-calendar-month-outline </v-icon>
          </div>
        </div>
      </v-card>
    </div>  
  </div>
</template>

<script>
export default {
  props: {
    totalIncome: {
      type: Number,
      default: 0,
    },
    primarySource: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
.hero-bar {
  gap: 16px;
}

/* desktop */
.left {
  flex: 2;
  min-width: 0;
}

.right {
  flex: 1;
  min-width: 0;
  gap: 8px;
}

/* mobile */
@media (max-width: 960px) {
  .hero-bar {
    flex-direction: column;
  }

  .left,
  .right {
    flex: 100%;
  }
}
</style>
