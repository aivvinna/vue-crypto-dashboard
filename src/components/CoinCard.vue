<template>
  <v-card width="170" height="100" ma-2>
    <v-layout>
      <v-flex xs5>
        <v-img
          :src="{src: require(`../assets/img/black/${img}.png`)}"
          aspect-ratio="1"
          height="100"
          contain>
        </v-img>
      </v-flex>
      <v-flex xs7>
        <v-card-title primary-title>
          <div>
            {{name}}
          </div>
          <div>
            {{price}}
          </div>
        </v-card-title>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>

export default {
  name: 'CoinCard',
  props: ['name', 'price', 'img']
}
</script>
