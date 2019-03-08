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
import apiFactory from '@/api/apiFactory'
const cryptoCompareApi = apiFactory.get('cryptoCompare')

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
      const response = await cryptoCompareApi.getNews()
      this.data = response.data.Data.slice(0, 10)
      console.log(this.data)
    }
  }
}
</script>
