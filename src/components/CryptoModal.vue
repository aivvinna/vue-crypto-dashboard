<template>
  <v-layout>
    <!-- <v-card @click="dialog = true">
      <v-card-title>
        Open Dialog
      </v-card-title>
    </v-card> -->
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
            {{fullName}}
          </div>
          <div>

          </div>
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import CryptoCard from './CryptoCard.vue'

export default {
  name: 'CryptoModal',
  components: {
    CryptoCard
  },
  props: ['fullName', 'name', 'price'],
  mounted() {
    console.log('cryptomodal mounted')
  },
  data() {
    return {
      dialog: false
    }
  },
}
</script>
