<template>
  <div>
    <table class="table is-fullwidth is-scrollable is-hoverable is-narrow is-fullwidth" v-if="coins">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>Circulating Supply</th>
          <th>Change (24h)</th>
        </tr>
      </thead>
      <tbody height="200px">
        <tr v-for="(crypto, i) in coins" :key="crypto.name">
          <td>{{i}}</td>
          <td>{{crypto.CoinInfo.FullName}}</td>
          <td>{{crypto.RAW.USD.PRICE}}</td>
          <td>{{crypto.RAW.USD.MKTCAP}}</td>
          <td>{{crypto.RAW.USD.SUPPLY}}</td>
          <td>{{crypto.RAW.USD.CHANGE24HOUR}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CryptoTable',
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

<style lang="scss">
.table {
  table-layout: auto;
  &.is-scrollable {
    tbody {
      overflow-y: scroll;
      width: auto;
      position: absolute;
    }
  } 
}

</style>
