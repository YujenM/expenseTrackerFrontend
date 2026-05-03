<template>
  <div class="my-4">
    <span style="font-size: 2rem;">By Category</span>
    <v-row class="mt-1">
      <v-col
        v-for="item in category"
        :key="item.category_id"
        cols="12"
        sm="6"
        md="2"
      >
        <v-card
          class="d-flex flex-column align-center justify-center pa-3"
          
        >
          <v-icon color="red" size="40">{{ item.category.imageUrl }}</v-icon>
          <div class="text-caption mt-1">{{ item.category.name }}</div>
          <div class="text-body-2 font-weight-bold">
            Rs {{ Number(item.total_spent).toLocaleString() }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
