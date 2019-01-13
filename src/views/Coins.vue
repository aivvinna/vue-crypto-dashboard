<template>
  <v-container>
    <h1>COINS</h1>
    <button @click="getAllCoins">Get All Coins!</button>
    <div v-for="coin in this.coins" :key="coin.id">
      <h1>{{coin.CoinInfo.FullName}}</h1>
      <img :src="`https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`" alt="cover">
      <h2>USD: {{ coin.DISPLAY.USD.PRICE }}</h2>
      <h2>{{ coin.DISPLAY.MKTCAP }}</h2>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = '4c7178cd-423e-47dc-9e2c-03cc341a767e';

export default {
  mounted() {
    console.log('mounted')
    console.log(this.$store.getters)
    if (this.$store.getters.coins.length === 0) {
      this.getAllCoins()
    }
  },
  computed: {
    ...mapGetters(['coins'])
  },
  methods: {
    async getAllCoins(){
      this.$store.dispatch('getCoins')
    }
  }
}
</script>
