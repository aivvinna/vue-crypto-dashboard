<template>
  <div class="modal" :class="{ 'is-active': showCreatePostDialog}">
    <div class="modal-background" @click.self.stop="closeModal"></div>
    <div class="modal-content">
      <form @submit.prevent="handleCreatePost">
        <div class="field">
          <label class="label">Write a post</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Write about a cryptocurrency"
              v-model="content"></textarea>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-link" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { cryptocurrencies } from "@/util/cryptocurrencies";

export default {
  name: "CreatePostModal",
  props: ['value'],
  data() {
    return {
      cryptocurrencies,
      isFormValid: true,
      content: "",
      category: [],
      contentRules: [
        content => !!content || "Content is required",
        content =>
          content.length < 200 || "Content must have less than 200 characters"
      ]
    };
  },
  computed: {
    ...mapGetters(["loading"]),
    ...mapGetters('user', ['user']),
    showCreatePostDialog: {
      get() {
        return this.value
      },
      set(value) {
        this.content = ""
        this.$emit('input', value)
      }
    }
  },
  watch: {
    showCreatePostDialog: function(newVal) {
      if (!newVal) {
        this.category = [];
      }
    }
  },
  methods: {
    handleCreatePost() {
      console.log('hi')
      this.$store.dispatch("posts/createPost", {
        data: {
          content: this.content,
          category: {
            set: this.category
          }
        }
      })
        
      console.log('create post action dispatched')
      this.content = ""
      this.category = [];
      this.closeModal()
    },
    removeCategory(category) {
      const index = this.category.indexOf(category.symbol);
      this.category.splice(index, 1);
    },
    closeModal() {
      this.$emit('close')
    }
  }
};
</script>
