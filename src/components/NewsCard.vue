<template>
  <a :href="url" target="_blank">
    <div class="card">
      <div class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img :src="imgPath" alt="alt">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <span class="is-italic has-text-grey">{{categories}}</span>
            <p>{{title}}</p>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'NewsCard',
  props: ['title', 'imgPath', 'body', 'categories', 'url']
}
</script>

<style lang="scss" scoped>
.card {
  box-shadow: none;
  border-bottom: 1px solid #e6ecf0;
  &:hover {
    background-color: #f5f8fa;
  }
}
</style>
