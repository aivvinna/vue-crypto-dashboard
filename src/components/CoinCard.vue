<template>
  <v-card flat tile>
    <v-img
      :src="{src: require(`../assets/img/black/${img}.png`)}"
      aspect-ratio="1">
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
