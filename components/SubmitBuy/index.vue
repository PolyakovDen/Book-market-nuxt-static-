<template>
  <div class="cart">
    <v-list color="transparent">
      <h2>Cart:</h2>
      <p v-if="getItemInCart.length === 0">
        Your cart is empty =(
      </p>
      <v-list-item v-for="item in getItemInCart" :key="item.id">
        <div class="cart-item__list-item">
          <div class="cart-item__name">
            {{ item.title }}
          </div>
          <div class="cart-item__price">
            <span>{{ item.price }} $</span>
          </div>
          <div class="cart-item__count">
            <v-btn icon color="primary" @click="subtractCartItem(item)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <input
              v-model="item.count"
              type="number"
              class="cart-item__input"
              min="1"
              readonly
              disabled
            >
            <v-btn icon color="primary" @click="appendCartItem(item)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <div class="cart-item__summary">
            <div class="d-flex justify-space-around align-center">
              <span>{{ getItemSummaryPrice(item) }} $</span>
            </div>
          </div>
          <v-btn x-small icon color="grey" @click="removeCartItem(item)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-list-item>
      <v-list-item v-if="getItemInCart.length !== 0">
        <v-list-item-content>
          <v-list-item-subtitle class="d-flex justify-space-between" style="align-items: center">
            <p class="ma-0">
              Загальна сума: <span class="font-weight-bold">{{ summaryCartItemsPrice(getItemInCart) }}</span> $
            </p>
            <v-btn
              color="rgb(88, 25, 221)"
              large
              rounded
              class="mb-2 ml-5 mr-1"
              dark
              elevation="0"
              min-width="200"
            >
              <p class="ma-0" style="font-size: 13px">
                Оформити замовлення
              </p>
            </v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
    appendCartItem (item) {
      this.$store.commit('appendCartItem', item)
    },
    subtractCartItem (item) {
      if (item.count <= 1) { return }
      this.$store.commit('subtractCartItem', item)
    },
    getItemSummaryPrice (item) {
      return item.count * item.price
    },
    removeCartItem (item) {
      this.$store.commit('removeItemFromCart', item)
    },
    summaryCartItemsPrice (item) {
      let price = 0
      item.map(el => price += el.count * el.price)
      return price.toFixed(2)
    }
  }
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>

<style scoped>
  .cart__list {
    margin: 0 auto;
  }
</style>

<style scoped>
  .cart-item__input {
    width: 50px;
    margin-left: 4px;
    margin-right: 4px;
    text-align: center;
    height: 25px;
    font-size: 14px;
    padding-left: 12px;
    padding-right: 12px;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.8);
    transition: border .2s ease-in-out;
    background-color: #fff;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    outline: 0;
  }
  .cart-item__price,
  .cart-item__summary
  {
    min-width: 70px;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.6);
    display: block;
  }
  .cart-item__name {
    font-size: 18px;
    text-align: start;
    width: 40%;
    margin-left: 10px;
  }
  .cart-item__list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
  }
  .cart-item__count {
    display: flex;
    align-items: center;
  }
</style>
