<template>
  <v-container pa-0 ma-0 fluid>
    <v-layout row wrap justify-center>
      <div v-for="coin in coins" :key="coin.id">
        <v-flex ma-1 xs12>
          <CryptoModal
          :fullName="coin.CoinInfo.FullName"
          :name="coin.CoinInfo.Name.toLowerCase()"
          :price="coin.DISPLAY.USD.PRICE">
          </CryptoModal>
        </v-flex>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CryptoCard from '@/components/CryptoCard.vue'
import CryptoModal from '@/components/CryptoModal.vue'

export default {
  name: 'CryptoGrid',
  components: {
    CryptoCard,
    CryptoModal
  },
  mounted() {
    if (this.$store.getters['coins/coins'].length === 0) {
      this.getAllCoins()
    }
  },
  computed: {
    ...mapGetters('coins', ['coins'])
  },
  methods: {
    async getAllCoins(){
      this.$store.dispatch('coins/getCoins')
    }
  }
}
</script>
