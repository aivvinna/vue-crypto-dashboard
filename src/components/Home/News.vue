<template>
  <div>
    <div v-for="article in data" :key="article.title">
      <NewsCard
        :title="article.title"
        :imgPath="article.imageurl"
        :categories="article.categories"
        :body="article.body"
        :url="article.url"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NewsCard from '@/components/NewsCard.vue'

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
      this.data = response.data.Data.slice(0, 10)
      console.log(this.data)
    }
  }
}
</script>
