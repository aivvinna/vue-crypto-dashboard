import cryptoCompareApi from '@/api/cryptoCompareApi'
import coinMarketCapApi from '@/api/coinMarketCapApi'
import redditApi from '@/api/redditApi'

const apis = {
  cryptoCompare: cryptoCompareApi,
  coinMarketCap: coinMarketCapApi,
  reddit: redditApi
}

export default {
  get: name => apis[name]
}
