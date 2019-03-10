import apiFactory from '@/api/apiFactory'
const cryptoCompareApi = apiFactory.get('cryptoCompare')

export default {
  data() {
    return {
      crypto: null
    }
  },
  async created() {
    this.crypto = await cryptoCompareApi.getCryptoInfo(this.$route.params.name.toUpperCase())
    
  },
  methods: {

  }
}