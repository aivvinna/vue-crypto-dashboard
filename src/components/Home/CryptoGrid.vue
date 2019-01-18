<template>
  <v-container pa-0 ma-0 fluid>
    <v-layout row wrap justify-center>
      <div v-for="coin in coins" :key="coin.id">
        <v-flex ma-1>
          <CoinCard
            :fullName="coin.CoinInfo.FullName"
            :name="coin.CoinInfo.Name.toLowerCase()"
            :price="coin.DISPLAY.USD.PRICE"
          >
          </CoinCard>
        </v-flex>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CoinCard from '../CoinCard.vue'

export default {
  name: 'CryptoGrid',
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
