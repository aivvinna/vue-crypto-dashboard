<template>
  <v-layout>
    <CryptoCard
      @click.native="dialog = true"
      :fullName="fullName"
      :name="name"
      :price="price"
    />
    
    <v-dialog dark lazy max-width="600" v-model="dialog">
      <v-card>
        <v-layout v-if="data.USD">
          <v-flex xs5>
            <v-img
              :src="{src: require(`../assets/img/color/${name}.png`)}"
              aspect-ratio="1"
              height="100"
              contain>
            </v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div>Current Price: {{price}}</div>
                <div>Circulating Supply: {{data.USD.SUPPLY}}</div>
                <div>Market Cap: {{data.USD.MKTCAP}}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions>
          Add to favorites
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from 'axios'
import CryptoCard from './CryptoCard.vue'

export default {
  name: 'CryptoModal',
  components: {
    CryptoCard
  },
  props: ['fullName', 'name', 'price'],
  mounted() {
    console.log(this.cryptoData)
  },
  data() {
    return {
      dialog: false,
      data: {}
    }
  },
  watch: {
    dialog: async function(val) {
      if (val) {
        const capsName = this.name.toUpperCase()
        const response = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${capsName}&tsyms=USD`)
        this.data = response.data.DISPLAY[capsName]
        console.log(this.data)
      }
    }
  }
}
</script>
