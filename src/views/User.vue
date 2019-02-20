<template>
  <div>
    <div>
      User
    </div>
    <div>
      {{this.$route.params.id}}
    </div>
  </div>
</template>

<script>
import { defaultClient as apolloClient } from '../main';
import { GET_USER } from '../graphql/queries';

export default {
  async created() {
    console.log('user created')
    // await this.getUser()
    // console.log('getuserdone')
    // console.log(' created this.data', this.data)
  },
  async mounted() {
    console.log('user page')
    console.log(this.$route)
    await this.getUser()
    console.log(' mounted this.data', this.data)
  },
  data() {
    return {
      data: {}
    }
  },
  methods: {
    async getUser() {
      try {
        const { data } = await apolloClient.query({
          query: GET_USER,
          variables: {
            data: {
              id: this.$route.params.id
            }
          }
        })
        this.data = data
      } catch(err) {
        console.error(err)
      }
    }
  }
}
</script>
