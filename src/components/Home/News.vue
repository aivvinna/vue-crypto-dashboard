<template>
  <v-container pa-0 ma-0 fluid>
    <v-layout row justify-center>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import NewsCard from '../NewsCard.vue'

export default {
  name: 'News',
  components: {
    NewsCard
  },
  data() {
    return {
      data: []
    }
  },
  mounted() {
    console.log('News section mounted')
    this.getNewsArticles()
  },
  methods: {
    async getNewsArticles() {
      const response = await axios.get(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN`)
      this.data = response.data.Data
      console.log(this.data)
    }
  }
}
</script>
