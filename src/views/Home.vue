<template>
  <div class="columns">
    <div class="column">
      <News/>
    </div>
    <div class="column is-5">
      <PostsList/>
    </div>
    <div class="column">
      <!-- <CryptoTableMini/> -->
      <FavCryptosList/>
    </div>
  </div>
</template>

<script>
import News from '@/components/Home/News.vue'
import PostsList from '@/components/Home/PostsList.vue'
import CryptoTableMini from '@/components/CryptoTableMini.vue'
import FavCryptosList from '@/components/FavCryptosList.vue'

export default {
  components: {
    News,
    PostsList,
    CryptoTableMini,
    FavCryptosList
  },
}
</script>
