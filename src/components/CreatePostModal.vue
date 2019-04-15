<template>
  <transition name="fade">
    <div class="modal" :class="{ 'is-active': showCreatePostDialog}" v-if="showCreatePostDialog">
      <div class="modal-background" @click.self.stop="closeModal"></div>
          <div class="modal-content">
            <div class="box">
              <form @submit.prevent="handleCreatePost">
                <div class="field">
                  <label class="label">Write a post</label>
                  <div class="control">
                    <textarea
                      class="textarea"
                      placeholder="Write about a cryptocurrency"
                      v-model="content"
                      @focus="textBoxFocused = true"
                      @blur="textBoxFocused = false"
                      :rows="3"></textarea>
                  </div>
                  <div class="level">
                    <p v-if="content.length > 250" class="level-left help is-danger">
                      Content must have less than or equal to 250 characters
                    </p>
                    <p v-else class="level-left help is-danger"></p>
                    <p class="level-right">
                      {{content.length}}
                    </p>
                  </div>
                </div>
                <div class="field is-grouped is-grouped-right">
                  <div class="control">
                    <button class="button is-dark"
                      type="submit"
                      :disabled="content.length === 0">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
      <button class="modal-close is-large" aria-label="close" @click.self.stop="closeModal"></button>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { cryptocurrencies } from "@/util/cryptocurrencies";
import { CREATE_POST } from '@/graphql/mutations'
import { GET_POSTS } from '@/graphql/queries'

export default {
  name: "CreatePostModal",
  props: ['value'],
  data() {
    return {
      cryptocurrencies,
      isFormValid: true,
      content: "",
      category: [],
      textBoxFocused: false
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
      try {
        this.$apollo.mutate({
          mutation: CREATE_POST,
          variables: {
            data: {
              content: this.content,
              category: {
                set: this.category
              }
            }
          },
          update: (cache, { data: { createPost }}) => {
            const data = cache.readQuery({
              query: GET_POSTS,
              variables: {
                first: 15,
                skip: 0
              }
            })
            data.posts.unshift(createPost)
            cache.writeQuery({
              query: GET_POSTS,
              variables: {
                first: 15,
                skip: 0
              },
              data
            })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createPost: {
              __typename: 'Post',
              id: -1,
              content: this.content,
              category: this.category,
              author: this.user,
              upvotes: [],
              downvotes: [],
              posts: [],
              createdAt: Date.now(),
              parent: null
            }
          }
        }).then(({ data }) => {
          console.log(data)
        })
      } catch(err) {
        console.error(err)
      }
      
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
    },
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.15s;
}

.fade-enter-active {
  transition-delay: 0.15s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

textarea {
  resize: none;
}
</style>
