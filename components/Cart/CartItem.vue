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
      <h1 class="product__title" v-html="product.title" />
      <p class="product__description" v-html="product.description" />
      <p class="product__price">
        $ {{ product.price }}
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
      if (this.paginationArray) {
        return this.paginationArray.filter((item) => {
          return item.title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
      return []
    }
  },
  watch: {
    search (val) {
      if (val.trim()) {
        const filteredProducts = this.products.filter((item) => {
          return item.title.toLowerCase().includes(this.search.toLowerCase())
        })
        this.splitProductsList(filteredProducts);
      } else {
        this.splitProductsList(this.products);
      }
    }
  },
  created () {
    this.products = [...cartItems]
    this.splitProductsList(this.products)
  },
  methods: {
    splitProductsList (products) {
      this.productsSubarray = []
      for (let i = 0; i < Math.ceil(products.length / this.size); i++) {
        this.productsSubarray.push(products.slice((i * this.size), (i * this.size) + this.size))
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
      this.$store.commit('addItemToCart', product)
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
    background-color: #E38343;
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
    text-align: right;
  }
  .product__btn {
    background-color: #EFA916;
    border: none;
    padding: 5px 10px;
    font-size: 15px;
    border-radius: 5px;
  }
  .product__btn:hover {
    background-color: #E38343;
    outline: 2px solid #EFA916;
  }
  .product__btn--disabled {
    background-color:darkgray;
    border: none;
    padding: 5px 10px;
    font-size: 15px;
    border-radius: 5px;
  }
  ::v-deep .v-pagination__item.v-pagination__item--active.primary {
    background-color: #EFA916 !important;
    border-color: #EFA916 !important;
  }
</style>
