<template>
  <v-app dark>
    <v-content :style="{'background': backgroundColor}">
      <v-container class="px-4 mt-auto" fluid>
        <Header />
        <transition
          name="fade"
          mode="out-in"
        >
          <nuxt />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from '../components/Header/index'
export default {
  components: {
    Header
  },
  data () {
    return {
      backgroundColor: '#5A414C'
    }
  }
}
</script>
