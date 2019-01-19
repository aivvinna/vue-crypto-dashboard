<template>
  <v-layout>
    <CryptoCard
      @click.native="dialog = true"
      :fullName="fullName"
      :name="name"
      :price="price"
    />
    
    <v-dialog max-width="600" v-model="dialog">
      <v-card>
        <v-card-title>
          <div>
            {{name}}
          </div>
          <div>
            cryptoData: {{data}}
          </div>
        </v-card-title>
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
    console.log('cryptomodal mounted')
    console.log(this.cryptoData)
  },
  data() {
    return {
      dialog: false,
      data: null
    }
  },
  watch: {
    dialog: async function(val) {
      if (val) {
        const capsName = this.name.toUpperCase()
        const response = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${capsName}&tsyms=USD`)
        this.data = response.data.DISPLAY[capsName]
      }
    }
  }
}
</script>
