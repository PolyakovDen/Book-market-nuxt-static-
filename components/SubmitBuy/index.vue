<template>
  <div>
    <ul v-for="item in getItemInCart" :key="item.id" class="cart__list">
      <li class="cart__item">
        <span>{{ item.title }}</span> <span>{{ item.count }}</span>
      </li>
    </ul>
    <div class="button__counter">
      <v-btn @click="minusCounterItem">
        -
      </v-btn>
      <input v-model="itemCounter" readonly disabled min="1" type="number">
      <v-btn @click="itemCounter++">
        +
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itemCounter: 1
    }
  },
  computed: {
    getItemInCart () {
      return this.$store.getters.getItemInCart
    }
  },
  methods: {
    minusCounterItem () {
      if (this.itemCounter === 1) { return }
      this.itemCounter--
    }
  }
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
