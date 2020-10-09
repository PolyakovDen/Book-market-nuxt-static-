<template>
  <div class="product__cart mt-5">
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
</template>

<script>
  export default {
    props: {

    }
  }
</script>
