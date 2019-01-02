<template>
  <div>
    <ul v-for="post in posts" :key="post.id">
      <li>
        {{post.id}}
        {{post.title}}
        {{post.body}}
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    posts: gql`query {
      posts {
        id
        title
        body
      }
    }`
  }
}
</script>

