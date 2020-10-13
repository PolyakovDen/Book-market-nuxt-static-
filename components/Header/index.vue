<template>
  <div class="d-flex justify-end">
    <v-btn
      class="mr-5"
      to="/"
    >
      Home
    </v-btn>
    <v-btn
      v-if="getCartCounter.length === 0"
      to="/store"
    >
      Cart:
    </v-btn>
    <v-btn
      v-else
      to="/store"
    >
      Cart: {{ getCartCounter.length }}
    </v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    getCartCounter () {
      return this.$store.getters.getItemInCart
    }
  }
}
</script>
