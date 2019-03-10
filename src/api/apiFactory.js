import cryptoCompareApi from '@/api/cryptoCompareApi'
import coinMarketCapApi from '@/api/coinMarketCapApi'

const apis = {
  cryptoCompare: cryptoCompareApi,
  coinMarketCap: coinMarketCapApi
}

export default {
  get: name => apis[name]
}
