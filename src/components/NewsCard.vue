<template>
  <v-card>
    <v-img
    class="white--text"
    height="180"
    :src="imgPath">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline">{{title}}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-title>
      <div>
        <span class="grey--text">{{categories}}</span><br>
        <!-- <span>{{body.slice(0, 200)}}...</span> -->
        <span>{{body}}</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn :href="url" target="_blank" flat>Go to article</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NewsCard',
  props: ['title', 'imgPath', 'body', 'categories', 'url']
}
</script>
