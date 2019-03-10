import axios from 'axios'

const cryptoCompareBaseUrl = 'https://min-api.cryptocompare.com/data'
const coinMarketCapBaseUrl = 'https://api.coinmarketcap.com'

const cryptoCompareApi = axios.create({
  baseURL: cryptoCompareBaseUrl
})

const coinMarketCapApi = axios.create({
  baseURL: coinMarketCapBaseUrl
})

export { cryptoCompareApi, coinMarketCapApi }
