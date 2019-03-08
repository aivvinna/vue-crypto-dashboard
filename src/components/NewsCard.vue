<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-2by1">
        <img :src="imgPath" alt="alt">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{title}}</p>
        </div>
      </div>

      <div class="content">
        <span class="has-text-grey">{{categories}}</span>
        <br>
        <a class="button is-white" target="_blank" :href="url">Go to article</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: ['title', 'imgPath', 'body', 'categories', 'url']
}
</script>
