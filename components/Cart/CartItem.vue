<template>
  <div class="product__wrapper">
    <div class="search__product">
      <v-text-field
        v-model="search"
        prepend-icon="mdi-magnify"
        centered-input
      >
        Search:
      </v-text-field>
    </div>
    <div v-for="product in filteredList" :key="product.id" class="product__cart mt-5">
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
    <v-pagination
      v-model="page"
      class="my-4"
      :length="productsSubarray.length"
    />
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
      search: '',
      cart: [],
      products: [],
      productsSubarray: [],
      size: 3,
      page: 1
    }
  },
  computed: {
    paginationArray () {
      return this.productsSubarray[this.page - 1]
    },
    filteredList () {
      return this.paginationArray.filter((item) => {
        return item.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  created () {
    this.products = [...cartItems]
    this.splitProductsList()
  },
  methods: {
    splitProductsList () {
      for (let i = 0; i < Math.ceil(this.products.length / this.size); i++) {
        this.productsSubarray[i] = this.products.slice((i * this.size), (i * this.size) + this.size)
      }
    },
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
  .search__product {
    width: 40%;
    margin: 0 auto;
  }
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
