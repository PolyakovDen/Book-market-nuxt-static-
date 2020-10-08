<template>
  <div class="d-flex justify-end">
    <v-btn
      class="mr-5"
      to="/"
    >
      Головна
    </v-btn>
    <v-btn
      to="/store"
    >
      Cart: {{ getItemsCounter }}
    </v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    getItemsCounter () {
      return this.$store.getters.getItemsCounter
    }
  }
}
</script>
