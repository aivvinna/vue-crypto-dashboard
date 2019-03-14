import { redditApi } from '@/api/apis'

export default {
  getTopCryptocurrency() {
    return redditApi.get('/cryptocurrency/.json')
  }
}