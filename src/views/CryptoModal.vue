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
// node modules
import * as d3 from 'd3'
// api
import apiFactory from '@/api/apiFactory'
const cryptoCompareApi = apiFactory.get('cryptoCompare')
const coinMarketCapApi = apiFactory.get('coinMarketCap')
// util
import responsivefy from '@/util/responsivefy'

export default {
  name: 'CryptoModal',
  data() {
    return {
      priceInfo: null, // price info
      generalInfo: null, // general info
      name: null, // name abbreviation
    }
  },
  async created() {
    this.name = this.$route.params.name.toUpperCase()
    // set general info
    const generalInfo = await cryptoCompareApi.getGeneralCryptoInfo(this.name)
    this.generalInfo = generalInfo.data.Data[0].CoinInfo
    // set price info
    const priceInfo = await cryptoCompareApi.getCryptoPriceInfo(this.name)
    this.priceInfo = priceInfo.data.RAW[this.name].USD
    this.get24HrPrice()
  },
  computed: {
    imgPath() {
      try {
        return require(`@/assets/img/color/${this.name.toLowerCase()}.png`)
      } catch(err) {
        return require(`@/assets/img/color/generic.png`)
      }
    },
    favCryptos() {
      if (this.$store.getters['user/user']) {
        return this.$store.getters['user/user'].favCryptos
      }
    },
    isFav() {
      if (this.favCryptos) {
        return this.favCryptos.includes(this.name) ? true : false
      }
    }
  },
  methods: {
    handleUpdateFavCryptos() {
      let favCryptos
      if (this.isFav) {
        favCryptos = this.favCryptos.filter(crypto => crypto !== this.name)
      } else {
        favCryptos = [...this.favCryptos, this.name]
      }
      this.$store.dispatch('user/updateFavCryptos', {
        cryptos: favCryptos
      })
    },
    async get24HrPrice() {
      const response = await cryptoCompareApi.getCrypto24HrPrice(this.name)
      const dataRaw = response.data.Data

      const data = dataRaw.map((data) => {
        return {
          time: new Date( data.time * 1000),
          high: data.high,
          low: data.low,
          close: data.close,
          open: data.open
        }
      })
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = 1000;
      const height = 300;

      const svg = d3
        .select('.chart')
        .append('svg')
        .attr('width', width + margin['left'] + margin['right'])
        .attr('height', height + margin['top'] + margin['bottom'])
        .call(responsivefy)
        .append('g')
        .attr('transform', `translate(${margin['left']},  ${margin['top']})`);

      const xMin = d3.min(data, d => {
        return d['time'];
      });

      const xMax = d3.max(data, d => {
        return d['time'];
      });

      const yMin = d3.min(data, d => {
        return d['close'];
      });

      const yMax = d3.max(data, d => {
        return d['close'];
      });

      const xScale = d3
        .scaleTime()
        .domain([xMin, xMax])
        .range([0, width])
      
      const yScale = d3
        .scaleLinear()
        .domain([yMin - 5, yMax])
        .range([height, 0])

      svg
        .append('g')
        .attr('id', 'xAxis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));
      svg
        .append('g')
        .attr('id', 'yAxis')
        .attr('transform', `translate(${width}, 0)`)
        .call(d3.axisRight(yScale));

      const line = d3
        .line()
        .x(d => {
          return xScale(d['time']);
        })
        .y(d => {
          return yScale(d['close']);
        });

      svg
        .append('path')
        .data([data])
        .style('fill', 'none')
        .attr('id', 'priceChart')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', '1.5')
        .attr('d', line);
    },
    closeModal() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-content {
  width: 80vw;
}
</style>
