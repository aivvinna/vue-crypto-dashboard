<template>
  <div class="box">
    <template v-if="priceInfo">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="imgPath">
              </figure>
            </div>
            <div class="media-content">
              <!-- <p class="title is-4">Current Price: {{price}}</p> -->
              <!-- <p class="subtitle is-6">Circulating Supply: {{data.USD.SUPPLY}}</p> -->
            </div>
          </div>

          <div class="content">
            <div class="chart"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import cryptoMixin from '@/mixins/cryptoMixin'

export default {
  name: 'CryptoModal',
  mixins: [cryptoMixin],
}
</script>
