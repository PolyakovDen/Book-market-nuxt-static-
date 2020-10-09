<template>
  <div class="product__wrapper">
    <div class="product__cart mt-5" v-for="product in products" :key="product.id">
      <p>{{ product.title }}</p>
      <h1 class="product__title" v-html="product.title" />
      <p class="product__description" v-html="product.description" />
      <p class="product__price">
        {{ product.price | formatPrice }}
      </p>
      <button
        v-if="canAddToCart(product)"
        class="product__btn"
        @click="addToCart(product)"
      >
        Add to cart
      </button>
      <button
        v-else
        disabled
        class="product__btn--disabled"
        @click="addToCart"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
import cartItems from './cart.json'
export default {
  name: 'CartItem',
  filters: {
    formatPrice (price) {
      if (!parseInt(price)) { return '' }
      if (price > 99999) {
        const priceString = (price / 100).toFixed(2)
        const priceArray = priceString.split('').reverse()
        let index = 3
        while (priceArray.length > index + 3) {
          priceArray.splice(index + 3, 0, ',')
          index += 4
        }
        return '$' + priceArray.reverse().join('')
      } else {
        return '$' + (price / 100).toFixed(2)
      }
    }
  },
  data () {
    return {
      cart: [],
      products: []
    }
  },
  created () {
    this.products = [...cartItems]
  },
  computed: {
  },
  methods: {
    canAddToCart (product) {
      return product.availableInventory > this.cartCount(product.id)
    },
    cartCount (id) {
      // const count = this.cart.reduce((ac, el) => {
      //   ac[el] = ac[el] + 1 || 1
      //   return ac
      // }, {})
      // return count[id] || 0
      let count = 0
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++
        }
      }
      return count
    },
    addToCart (product) {
      this.cart.push(product.id)
      this.$store.commit('setItemsCounter', this.cart.length)
    }
  }
}
</script>

<style scoped>
  .product__cart {
    max-width: 320px;
    margin: 0 auto;
    background-color: darkorange;
    padding: 15px;
    border-radius: 12px;
  }
  .product__title {
    font-size: 22px;
  }
  .product__description {
    font-size: 14px;
  }
  .product__price {
    font-size: 16px;
    font-style: italic;
  }
  .product__btn {
    background-color: mediumturquoise;
    border: none;
    padding: 5px 10px;
    font-size: 15px;
    border-radius: 5px;
  }
  .product__btn:hover {
    background-color: darkorange;
    outline: 2px solid mediumturquoise;
  }
  .product__btn--disabled {
    background-color:darkgray;
    border: none;
    padding: 5px 10px;
    font-size: 15px;
    border-radius: 5px;
  }
</style>
