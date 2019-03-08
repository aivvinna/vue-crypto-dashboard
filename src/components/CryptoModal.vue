<template>
  <v-layout>
    <CryptoCard
      @click.native="dialog = true"
      :fullName="fullName"
      :name="name"
      :price="price"
    />
    
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
  </v-layout>
</template>

<script>
// node modules
import * as d3 from 'd3'
// api
import apiFactory from '@/api/apiFactory'
const cryptoCompareApi = apiFactory.get('cryptoCompare')
// util
import responsivefy from '@/util/responsivefy'
// components
import CryptoCard from '@/components/CryptoCard.vue'

export default {
  name: 'CryptoModal',
  components: {
    CryptoCard
  },
  props: ['fullName', 'name', 'price'],
  data() {
    return {
      dialog: false,
      data: {}
    }
  },
  watch: {
    dialog: async function(val) {
      if (val) {
        const capsName = this.name.toUpperCase()
        const response = await cryptoCompareApi.getCryptoInfo(capsName)
        this.data = response.data.DISPLAY[capsName]
        console.log(this.data)
      }
      this.get24HrPrice();
    }
  },
  computed: {
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
      const capsName = this.name.toUpperCase();
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
    }
  }
}
</script>
