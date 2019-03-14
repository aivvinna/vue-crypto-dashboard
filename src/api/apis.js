import axios from 'axios'

const cryptoCompareBaseUrl = 'https://min-api.cryptocompare.com/data'
const coinMarketCapBaseUrl = 'http://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com'
const redditBaseUrl = 'https://www.reddit.com/r'

const cryptoCompareApi = axios.create({
  baseURL: cryptoCompareBaseUrl
})

const coinMarketCapApi = axios.create({
  baseURL: coinMarketCapBaseUrl
})

const redditApi = axios.create({
  baseURL: redditBaseUrl
})

export { cryptoCompareApi, coinMarketCapApi, redditApi }
