<template>
  <v-app dark>
    <v-content :style="{'background': backgroundColor}">
      <v-container class="px-4 mt-auto" fluid>
        <Header />
        <nuxt />
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
      backgroundColor: 'linear-gradient(#ff9a9e, #fecfef)'
    }
  }
}
</script>
