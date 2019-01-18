<template>
  <v-container>
    <v-layout row wrap>
      <div v-for="coin in coins" :key="coin.id">
        <CoinCard
          :name="coin.CoinInfo.FullName"
          :img="coin.CoinInfo.Name.toLowerCase()"
          :price="coin.DISPLAY.USD.PRICE"
        >
        </CoinCard>
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
