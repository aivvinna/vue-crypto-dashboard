<template>
  <div @click.stop="openModal">
    <div class="post-card">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img v-if="post.author.avatar" :src="post.author.avatar" alt="">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{post.author.displayName ? post.author.username : post.author.displayName}}</p>
              <p class="subtitle is-6">{{`@${post.author.username}`}}</p>
            </div>
          </div>

          <div class="content">
            <template v-if="post.category.length !== 0">
              <span
                class="grey--text" v-for="(category, i) in post.category" :key="category">
                {{post.category[i]}}|
              </span><br>
            </template>
            <br>
            <span>{{post.content}}</span>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Like</a>
          <a href="#" class="card-footer-item">Comment</a>
          <a href="#" class="card-footer-item">Share</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PostCard',
  props: ['post'],
  methods: {
    openModal() {
      this.$router.push({name: 'post', params: { id: this.post.id}})
    }
  }
}
</script>

<style lang="scss">
.post-card {
  margin-bottom: 10px;
}
</style>
