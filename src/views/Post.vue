<template>
  <div>
    <div class="card">
      <h1>{{post.content}}</h1>
      <h2>{{post.author.username}} - {{post.category}}</h2>
    </div>
  </div>
</template>

<script>
import postMixin from '@/mixins/postMixin'

export default {
  name: "Post",
  mixins: [postMixin]
}
</script>
