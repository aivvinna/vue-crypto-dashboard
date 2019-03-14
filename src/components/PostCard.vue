<template>
  <div @click.stop="openModal">
    <div class="post-card">
      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column is-1">
              <span class="icon is-small"><i class="fas fa-chevron-up"></i></span>
              <br>
              <span class="icon is-small"><i class="fas fa-chevron-down"></i></span>
            </div>
            <div class="column is-11">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <!-- <img v-if="post.author.avatar" :src="post.author.avatar" alt=""> -->
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-6">{{post.author.displayName ? post.author.displayName : post.author.username}} {{`@${post.author.username}`}}</p>
                  <p class="subtitle is-6">
                    <template v-if="post.category.length !== 0">
                      <span
                        class="grey--text" v-for="(category, i) in post.category" :key="category">
                        {{post.category[i]}}|
                      </span><br>
                    </template>
                  </p>
                </div>
              </div>

              <div class="content">
                <span>{{post.content}}</span>
              </div>

            </div>
          </div>
        </div>
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

<style lang="scss" scoped>
.post-card {
  margin-bottom: 10px;
}

.column {
  margin: 0px;
  padding: 0px;
}
</style>
