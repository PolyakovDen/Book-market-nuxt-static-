<template>
  <div class="d-flex justify-end">
    <v-btn
      text
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
