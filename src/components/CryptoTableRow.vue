<template>
  <tr @mouseover="colorImg" @mouseleave="decolorImg">
    <td>{{rank}}</td>
    <td>
      <img :src="imgPath" height="15" width="15">
      {{fullName}}
    </td>
    <td>{{price}}</td>
    <td>{{marketCap}}</td>
    <td>{{supply}}</td>
    <td>{{change}}%</td>
  </tr>
</template>

<script>
export default {
  name: 'CryptoTableRow',
  props: ['rank', 'fullName', 'name', 'price', 'marketCap', 'supply', 'change'],
  data() {
    return {
      mouseover: false
    }
  },
  methods: {
    colorImg() {
      this.mouseover = true
    },
    decolorImg() {
      this.mouseover = false
    }
  },
  computed: {
    imgPath() {
      if (this.mouseover === true) {
        try {
          return require(`@/assets/img/color/${this.name}.png`)
        } catch(err) {
          return require(`@/assets/img/color/generic.png`)
        }
      } else {
        try {
          return require(`@/assets/img/black/${this.name}.png`)
        } catch(err) {
          return require(`@/assets/img/black/generic.png`)
        }
      }
    }
  }
}
</script>
