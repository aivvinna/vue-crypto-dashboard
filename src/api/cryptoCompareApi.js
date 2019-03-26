import { cryptoCompareApi } from '@/api/apis'

export default {
  getNews() {
    return cryptoCompareApi.get('/v2/news/?lang=EN')
  },
  getTopCryptos() {
    return cryptoCompareApi.get('/top/totalvolfull?limit=100&tsym=USD')
  },
  getCryptoPriceInfo(name) {
    return cryptoCompareApi.get(`pricemultifull?fsyms=${name}&tsyms=USD`)
  },
  getGeneralCryptoInfo(name) {
    return cryptoCompareApi.get(`coin/generalinfo?fsyms=${name}&tsym=USD`)
  },
  getCrypto24HrPrice(name) {
    return cryptoCompareApi.get(`histohour?fsym=${name}&tsym=USD&limit=24`)
  },
  getCrypto1DayPriceMinutes(name) {
    return cryptoCompareApi.get(`histominute?fsym=${name}&tsym=USD&limit=1440`)
  },
  getCrypto1WeekPriceHours(name) {
    return cryptoCompareApi.get(`histohour?fsym=${name}&tsym=USD&limit=168`)
  },
  getCrypto1MonthPriceHours(name) {
    return cryptoCompareApi.get(`histohour?fsym=${name}&tsym=USD&limit=720`)
  },
  getCrypto1YearPriceDays(name) {
    return cryptoCompareApi.get(`histohour?fsym=${name}&tsym=USD&limit=365`)
  }
}
