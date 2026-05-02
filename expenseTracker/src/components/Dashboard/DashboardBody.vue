<template>
  <p style="font-size: 1.5rem">Recent Activity</p>

  <div style="height: 400px; overflow-y: auto">
    <!-- Empty state -->
    <div
      v-if="!recentActivities || recentActivities.length === 0"
      class="d-flex flex-column justify-center align-center"
      style="height: 100%; gap: 8px; color: #9e9e9e"
    >
      <v-icon size="48">mdi-clipboard-text-off-outline</v-icon>
      <span class="text-body-1">No recent activities</span>
    </div>

    <!-- Activity list -->
    <v-card
      v-else
      v-for="activity in recentActivities"
      :key="activity.id"
      class="pa-3 pa-sm-4 d-flex justify-space-between align-center mb-2"
    >
      <div class="d-flex align-center" style="min-width: 0">
        <div
          style="background-color: #eeeeee; flex-shrink: 0"
          class="d-flex justify-center align-center pa-2 mx-2 mx-sm-3 rounded"
        >
          <v-icon size="28" class="bg-gray rounded">{{
            activity.categoryImage
          }}</v-icon>
        </div>

        <div style="min-width: 0">
          <v-card-title class="pa-0 text-body-1 text-sm-h6 text-truncate">{{
            activity.title
          }}</v-card-title>

          <div class="d-flex align-center flex-wrap" style="gap: 4px">
            <span class="text-caption text-sm-body-2">{{ activity.type }}</span>
            <span style="font-size: 18px; line-height: 0">•</span>
            <span class="text-caption text-sm-body-2">{{
              formatDate(activity.date)
            }}</span>
          </div>
        </div>
      </div>

      <div style="flex-shrink: 0" class="ml-2">
        <span
          :style="{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: activity.type === 'expense' ? 'red' : 'inherit',
          }"
        >
          {{ activity.amount }}
        </span>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    recentActivities: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
};
</script>
