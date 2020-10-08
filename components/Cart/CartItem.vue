<template>
  <div class="product__wrapper">
    <div class="product__cart">
      <h1 class="product__title" v-html="product.title" />
      <p class="product__description" v-html="product.description" />
      <p class="product__price">
        {{ product.price | formatPrice }}
      </p>
      <button
        v-if="canAddToCart"
        class="product__btn"
        @click="addToCart"
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
      sitename: 'hello',
      product: {
        id: 11,
        title: 'Cat food, 25lb bag',
        description: 'A 25 pound bag of <em>irresistible</em>,' + ' organic goodness for your cat.',
        price: 2000,
        availableInventory: 5
      },
      cart: [],
      products: []
    }
  },
  computed: {
    canAddToCart () {
      return this.product.availableInventory > this.cart.length
    }
  },
  created: {
    // testApi () {
    //   this.$axios.get('cart.json')
    //     .then((response) => {
    //       this.products = response.data.products
    //     })
    // }
  },
  methods: {
    addToCart () {
      this.cart.push(this.product.id)
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
