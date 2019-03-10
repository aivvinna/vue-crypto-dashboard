<template>

  <div class="modal is-active">
    <div class="modal-background" @click.self.stop="closeModal"></div>
    <div class="modal-content">
      <div class="box">
        <template v-if="data">
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
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
  <!-- <v-layout>
    
    <v-dialog dark lazy max-width="1200" v-model="dialog">
      <v-card>
        <v-layout v-if="data.USD">
          <v-flex xs5>
            <v-img
              :src="{src: require(`../assets/img/color/${name}.png`)}"
              aspect-ratio="1"
              height="100"
              contain>
            </v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div>Current Price: {{price}}</div>
                <div>Circulating Supply: {{data.USD.SUPPLY}}</div>
                <div>Market Cap: {{data.USD.MKTCAP}}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <div class="chart" v-if="dialog"></div>
        <v-divider light></v-divider>
        <v-card-actions>
          <v-btn @click="handleUpdateFavCryptos">
            <span v-if="!isFav">Add to favorites</span>
            <span v-else>Remove from favorites</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout> -->
</template>

<script>
// node modules
import * as d3 from 'd3'
// api
import apiFactory from '@/api/apiFactory'
const cryptoCompareApi = apiFactory.get('cryptoCompare')
// util
import responsivefy from '@/util/responsivefy'

export default {
  name: 'CryptoModal',
  data() {
    return {
      data: null,
      name: null
    }
  },
  async created() {
    this.name = this.$route.params.name.toUpperCase()
    const response = await cryptoCompareApi.getCryptoInfo(this.name)
    this.data = response.data.DISPLAY[this.name]
    console.log(this.data)
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
      const capsName = this.$route.params.name.toUpperCase()
      const response = await cryptoCompareApi.getCrypto24HrPrice(capsName)
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
