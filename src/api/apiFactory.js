import cryptoCompareApi from '@/api/cryptoCompareApi'

const apis = {
  cryptoCompare: cryptoCompareApi
}

export default {
  get: name => apis[name]
}