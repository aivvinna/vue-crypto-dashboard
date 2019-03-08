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
        <tr v-for="(crypto, i) in coins" :key="crypto.name">
          <td>{{i + 1}}</td>
          <td>
            <img :src="imgSrc(crypto.CoinInfo.Name.toLowerCase())" height="15" width="15">
            {{crypto.CoinInfo.FullName}}
          </td>
          <td>{{crypto.RAW.USD.PRICE.toLocaleString()}}</td>
          <td>{{Math.round(crypto.RAW.USD.MKTCAP).toLocaleString()}}</td>
          <td>{{Math.round(crypto.RAW.USD.SUPPLY).toLocaleString()}}</td>
          <td>{{crypto.RAW.USD.CHANGEPCT24HOUR.toLocaleString()}}%</td>
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
    },
    imgSrc(name) {
      console.log(name)
      try {
        return require(`@/assets/img/black/${name}.png`)
      } catch(err) {
        return require(`@/assets/img/black/generic.png`)
      }
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
