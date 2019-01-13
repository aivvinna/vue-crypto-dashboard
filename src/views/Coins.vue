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

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = '4c7178cd-423e-47dc-9e2c-03cc341a767e';

export default {
  data() {
    return {
      coins: [],
    }
  },
  mounted() {
    console.log('mounted')
  },
  computed: {
    newCoins() {
      return this.coins;
    }
  },
  methods: {
    // async getAllCoins(){
    //   const proxy = 'http://cors-anywhere.herokuapp.com/';
    //   let response = await axios.get(`${proxy}https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`);
    //   this.coins = response.data.data;
    //   console.log('response', response)
    //   console.log('this.coins', this.coins)
    // },
    async getAllCoins(){
      const proxy = 'http://cors-anywhere.herokuapp.com/';
      let response = await axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`);
      this.coins = response.data.Data;
      console.log('response', response)
      console.log('this.coins', this.coins)
    }
  }
}
</script>
