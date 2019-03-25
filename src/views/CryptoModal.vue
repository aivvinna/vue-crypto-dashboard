<template>

  <div class="modal is-active">
    <div class="modal-background" @click.self.stop="closeModal"></div>
    <div class="modal-content">
      <div class="box">
        <template v-if="priceInfo">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="imgPath">
              </figure>
            </div>
            
            <div class="media-content">
              <div class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">{{name}}</p>
                    <p class="title">{{generalInfo.FullName}}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Price</p>
                    <p class="title">${{Number(priceInfo.PRICE).toLocaleString()}}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Circulating Supply</p>
                    <p class="title">{{Number(priceInfo.SUPPLY).toLocaleString()}}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Market Cap</p>
                    <p class="title">{{Number(priceInfo.MKTCAP).toLocaleString()}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="chart"></div>
            <div class="level">
              <div class="level-item has-text-centered">
                <div>
                  <button class="button">Add to Portfolio</button>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <button class="button" @click="handleUpdateFavCryptos">
                    <span v-if="!isFav">Add to Favorites</span>
                    <span v-else>Remove from Favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </template>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import cryptoMixin from '@/mixins/cryptoMixin'

export default {
  name: 'CryptoModal',
  mixins: [cryptoMixin],
}
</script>

<style lang="scss" scoped>
.modal-content {
  width: 80vw;
}
</style>
