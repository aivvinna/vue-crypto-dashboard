<template>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <img v-if="post.author.avatar" :src="post.author.avatar" alt="">
      <v-icon v-else>
        person
      </v-icon>
    </v-list-tile-avatar>
    
    <v-list-tile-content>
      <v-list-tile-title>{{post.title}}</v-list-tile-title>
      <v-list-tile-sub-title>{{post.author.username}} - {{post.body}}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PostCard',
  props: ['post']
}
</script>
