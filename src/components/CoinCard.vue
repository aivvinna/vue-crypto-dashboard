<template>
  <v-card width="170" height="100" ma-2 @mouseover="colorImg" @mouseleave="decolorImg">
    <v-layout>
      <v-flex xs5>
        <v-img
          :src="imgPath"
          aspect-ratio="1"
          height="100"
          contain>
        </v-img>
      </v-flex>
      <v-flex xs7>
        <v-card-title primary-title>
          <div>
            {{fullName}}
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
  props: ['fullName', 'price', 'name'],
  data() {
    return {
      mouseover: false
    }
  },
  computed: {
    imgPath: function() {
      if (this.mouseover) {
        return {
          src: require(`../assets/img/color/${this.name}.png`)
        }
      } else {
        return {
          src: require(`../assets/img/black/${this.name}.png`)
        }
      }
    }
  },
  methods: {
    colorImg: function() {
      this.mouseover = true
    },
    decolorImg: function() {
      this.mouseover = false
    }
  }
}
</script>
