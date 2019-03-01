<template>
  <v-card>
    <v-card-title>
      <div>
        <template v-if="post.category.length !== 0">
          <span
            class="grey--text" v-for="(category, i) in post.category" :key="category">
            {{post.category[i]}}|
          </span><br>
        </template>
        <span>{{post.content}}</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn :href="'#'" flat>Like</v-btn>
      <v-spacer></v-spacer>
      <v-avatar>
        <img v-if="post.author.avatar" :src="post.author.avatar" alt="">
        <v-icon v-else>
          person
        </v-icon>
      </v-avatar>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PostCard',
  props: ['post']
}
</script>
