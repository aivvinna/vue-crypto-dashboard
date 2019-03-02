<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs3>
        <v-container fluid pa-0 ma-0>
          <v-layout row>
            <News/>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs6>
        <v-container fluid pa-0 ma-0>
          <v-layout row>
            <CryptoGrid/>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs3>
        <v-container fluid pa-0 ma-0>
          <v-layout row>
            <PostsList/>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import News from '@/components/Home/News.vue'
import CryptoGrid from '@/components/Home/CryptoGrid.vue'
import PostsList from '@/components/Home/PostsList.vue'

export default {
  components: {
    CryptoGrid,
    News,
    PostsList
  },
  data() {
    return {
    }
  }
}
</script>
