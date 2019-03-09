<template>
  <div>
    <table class="table is-fullwidth is-hoverable is-narrow is-fullwidth" v-if="coins">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price (USD)</th>
          <th>Market Cap (USD)</th>
          <th>Circulating Supply</th>
          <th>Change (24h)</th>
        </tr>
      </thead>
      <tbody>
        <CryptoTableRow
          v-for="(crypto, i) in coins" :key="i"
          :rank="i + 1"
          :fullName="crypto.CoinInfo.FullName"
          :name="crypto.CoinInfo.Name.toLowerCase()"
          :price="crypto.RAW.USD.PRICE.toLocaleString()"
          :marketCap="Math.round(crypto.RAW.USD.MKTCAP).toLocaleString()"
          :supply="Math.round(crypto.RAW.USD.SUPPLY).toLocaleString()"
          :change="crypto.RAW.USD.CHANGEPCT24HOUR.toLocaleString()"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CryptoTableRow from '@/components/CryptoTableRow.vue'

export default {
  name: 'CryptoTable',
  components: {
    CryptoTableRow
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

<style lang="scss">
.table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  tbody {
    display:block;
    width: 100%;
    overflow: auto;
    height: 75vh;
  }
  thead {
    tr {
      display: block;
    }
  }
  th, td {
    padding: 5px;
    text-align: left;
    width: 200px;
  }
}

</style>
