import { defaultClient as apolloClient } from '@/main'
import { GET_POST } from '@/graphql/queries'

export default {
  data() {
    return {
      post: null
    }
  },
  async created() {
    try {
      const { data } = await apolloClient.query({
        query: GET_POST,
        variables: {
          id: this.$route.params.id
        }
      })
      this.post = data.post
    } catch(err) {
      console.error(err)
    }
  }
}