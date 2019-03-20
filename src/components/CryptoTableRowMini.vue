<template>
  <div @click="openCryptoModal">
    <tr @mouseover="colorImg" @mouseleave="decolorImg">
      <td>
        <img :src="imgPath" height="15" width="15">
        {{fullName}}
      </td>
      <td>{{price}}</td>
      <td :class="{ 'has-text-success': positive, 'has-text-danger': !positive}">{{change}}%</td>
    </tr>
  </div>
</template>

<script>
export default {
  name: 'CryptoTableRowMini',
  props: ['fullName', 'name', 'price', 'change'],
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
    },
    openCryptoModal() {
      this.$router.push({name: 'crypto', params: { name: this.name}})
    }
  },
  computed: {
    positive() {
      return this.change > 0 ? true : false
    },
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
