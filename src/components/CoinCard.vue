<template>
  <v-card>
    <v-img
      :src="`https://www.cryptocompare.com${img}`">
    </v-img>
    <v-card-title>
      <div>
        {{name}}
      </div>
      <div>
        {{price}}
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'CoinCard',
  props: ['name', 'price', 'img']
}
</script>
