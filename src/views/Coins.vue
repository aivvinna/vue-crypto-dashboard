<template>
  <v-container>
    <h1>COINS</h1>
      <v-layout row wrap>
        <v-flex xs4>
        <draggable>
          <div v-for="coin in coins" :key="coin.id">
            <CryptoCard
              :name="coin.CoinInfo.FullName"
              :img="coin.CoinInfo.Name.toLowerCase()"
              :price="coin.DISPLAY.USD.PRICE"
            >
            </CryptoCard>
          </div>
        </draggable>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import CryptoCard from '../components/CryptoCard.vue'
import draggable from 'vuedraggable'

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = '4c7178cd-423e-47dc-9e2c-03cc341a767e';

export default {
  components: {
    draggable,
    CryptoCard
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
