<template>
  <div class="columns">
    <div class="column is-3">
      <News/>
    </div>
    <div class="column is-6">
      <!-- <CryptoGrid/> -->
      <CryptoTable/>
    </div>
    <div class="column is-3">
      <PostsList/>
    </div>
  </div>
</template>

<script>
import News from '@/components/Home/News.vue'
import CryptoGrid from '@/components/Home/CryptoGrid.vue'
import PostsList from '@/components/Home/PostsList.vue'
import CryptoTable from '@/components/Home/CryptoTable.vue'

export default {
  components: {
    CryptoGrid,
    News,
    PostsList,
    CryptoTable
  },
  data() {
    return {
    }
  }
}
</script>
