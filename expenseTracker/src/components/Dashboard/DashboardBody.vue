<template>
  <p style="font-size: 1.5rem">Recent Activity</p>

  <v-card class="pa-4 d-flex justify-space-between align-center">
    <div class="d-flex align-center">
      <v-icon size="45" class="bg-red rounded mr-3">mdi-account</v-icon>

      <div>
        <v-card-title class="pa-0">Account Activity</v-card-title>

        <div class="d-flex align-center" style="gap: 6px">
          <span>Income</span>
          <span style="font-size: 18px; line-height: 0">•</span>
          <span>2 days ago</span>
        </div>
      </div>
    </div>

    <div>
      <span style="font-size: 1.5rem">Rs 2000</span>
    </div>
  </v-card>
</template>
