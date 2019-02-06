<template>
  <v-dialog dark max-width="600" v-model="showCreatePostDialog">
    <v-card>
      <!-- Create Post Title -->
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <h1 class="primary--text">Create Post</h1>
        </v-flex>
      </v-layout>

      <!-- Create Post Form -->
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>

          <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleCreatePost">

            <!-- Content Text Area -->
            <v-layout row>
              <v-flex xs12>
                <v-textarea :rules="contentRules" v-model="content" label="Content" type="text" required></v-textarea>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                <v-btn :loading="loading" :disabled="!isFormValid || loading" color="info" type="submit">
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                  Submit</v-btn>
              </v-flex>
            </v-layout>

          </v-form>

        </v-flex>
      </v-layout>

    </v-card>

  </v-dialog>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CreatePostModal",
  props: ['value'],
  data() {
    return {
      isFormValid: true,
      content: "",
      contentRules: [
        content => !!content || "Content is required",
        content =>
          content.length < 200 || "Content must have less than 200 characters"
      ]
    };
  },
  computed: {
    ...mapGetters(["loading", "user"]),
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
  methods: {
    handleCreatePost() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("createPost", {
          data: {
            content: this.content,
          }
        });
        console.log('create post action dispatched')
        this.content = ""
        this.$emit('input', false)
      }
    }
  }
};
</script>
