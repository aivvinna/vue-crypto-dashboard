<template>
  <a @click="openCryptoModal" @mouseover="colorImg" @mouseleave="decolorImg">
    <div class="card">
      <div class="level">
        <div class="level-left">
          <figure class="image is-48x48">
            <img :src="imgPath" alt="alt">
          </figure>
          <span>
            {{name.toUpperCase()}}
            <br>
            {{fullName}}
          </span>
        </div>
        <div class="level-right">
          <div>
            <span>
              ${{price}}
            </span>
            <br>
            <span :class="{ 'has-text-success': positive, 'has-text-danger': !positive}">
              <template v-if="change > 0">▲</template>
              <template v-else>▼</template>
              {{change}}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'FavCryptosListCard',
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

<style lang="scss" scoped>
.card {
  box-shadow: none;
  border-bottom: 1px solid #e6ecf0;
  &:hover {
    background-color: #f5f8fa;
  }
  padding: 5px;
}

.image {
  margin-right: 5px;
}
</style>
