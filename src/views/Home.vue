<template>
  <div class="columns">
    <div class="column">
      <News/>
    </div>
    <div class="column is-5">
      <PostsList/>
      <MessagesList/>
    </div>
    <div class="column">
      <CryptoTableMini/>
    </div>
  </div>
</template>

<script>
import News from '@/components/Home/News.vue'
import PostsList from '@/components/Home/PostsList.vue'
import CryptoTableMini from '@/components/CryptoTableMini.vue'
import MessagesList from '@/components/MessagesList.vue'

export default {
  components: {
    News,
    PostsList,
    CryptoTableMini,
    MessagesList
  },
  data() {
    return {
    }
  }
}
</script>
