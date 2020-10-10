<template>
  <div>
    <ul class="cart__list">
      <li class="cart__item">
        <h2 />
      </li>
    </ul>
    <div class="button__counter">
      <v-btn @click="minusCounterItem">-</v-btn>
      <input v-model="itemCounter" readonly disabled min="1" type="number">
      <v-btn @click="itemCounter++">+</v-btn>
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
  methods: {
    minusCounterItem () {
      if (this.itemCounter === 1) return;
      this.itemCounter--;
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
