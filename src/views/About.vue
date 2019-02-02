<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CreatePost/>
  </div>
</template>

<script>
import CreatePost from '../components/CreatePost.vue'

export default {
  components: {
    CreatePost
  },
  mounted() {
    console.log('About mounted')
  }
}
</script>
