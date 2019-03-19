<template>
  <div class="columns">
    <div class="column">
      <News/>
    </div>
    <div class="column is-5">
      <!-- <CryptoGrid/> -->
      <PostsList/>
      <!-- <CryptoTable/> -->
    </div>
    <div class="column">
      <!-- <PostsList/> -->
      <CryptoTable/>
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
