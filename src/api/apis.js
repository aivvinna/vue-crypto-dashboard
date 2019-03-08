import axios from 'axios'

const cryptoCompareBaseUrl = 'https://min-api.cryptocompare.com/data'

const cryptoCompareApi = axios.create({
  baseURL: cryptoCompareBaseUrl
})

export { cryptoCompareApi }