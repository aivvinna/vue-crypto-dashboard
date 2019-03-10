import { coinMarketCapApi } from '@/api/apis'

export default {
  getCryptoInfo(name) {
    return coinMarketCapApi.get(`/v1/ticker/${name}`)
  },
  getTop10Cryptos() {
    return coinMarketCapApi.get('/v1/ticker/?limit=10')
  }
}
