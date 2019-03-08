import { cryptoCompareApi } from '@/api/apis'

export default {
  getNews() {
    return cryptoCompareApi.get('/v2/news/?lang=EN')
  },
  getTopCryptos() {
    return cryptoCompareApi.get('/top/totalvolfull?limit=50&tsym=USD')
  },
  getCryptoInfo(name) {
    return cryptoCompareApi.get(`pricemultifull?fsyms=${name}&tsyms=USD`)
  },
  getCrypto24HrPrice(name) {
    return cryptoCompareApi.get(`histohour?fsym=${name}&tsym=USD&limit=24`)
  }
}