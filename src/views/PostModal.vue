<template>
  <div class="modal" @click.stop.self="closeModal">
    <div class="modal-container">
    <v-card>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <template v-if="post">
            <h1 class="primary--text">{{post.content}}</h1>
            <h2>{{post.author.username}} - {{post.category}}</h2>
          </template>
        </v-flex>
      </v-layout>
    </v-card>
    </div>
  </div>  
</template>

<script>
import postMixin from '@/mixins/postMixin'

export default {
  name: "PostModal",
  mixins: [postMixin],
  methods: {
    closeModal() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
