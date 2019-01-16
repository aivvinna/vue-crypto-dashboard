<template>
  <v-container>
    <h1>COINS</h1>
      <v-layout row wrap>
        <v-flex xs4
          v-for="coin in this.coins" :key="coin.id">
          <CoinCard
            :name="coin.CoinInfo.FullName"
            :img="coin.CoinInfo.ImageUrl"
            :price="coin.DISPLAY.USD.PRICE"
          >
          </CoinCard>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import CoinCard from '../components/CoinCard.vue'

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = '4c7178cd-423e-47dc-9e2c-03cc341a767e';

export default {
  components: {
    CoinCard
  },
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
