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

            <!-- Title Input -->
            <v-layout row>
              <v-flex xs12>
                <v-text-field :rules="titleRules" v-model="title" label="Post Title" type="text" required></v-text-field>
              </v-flex>
            </v-layout>

            <!-- Body Text Area -->
            <v-layout row>
              <v-flex xs12>
                <v-textarea :rules="bodyRules" v-model="body" label="Body" type="text" required></v-textarea>
              </v-flex>
            </v-layout>

            <!-- Published Checkbox -->
            <v-layout row>
              <v-flex xs12>
                <v-checkbox
                  :label="`Check to publish`"
                  v-model="published"
                ></v-checkbox>
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
      title: "",
      body: "",
      published: false,
      titleRules: [
        title => !!title || "Title is required",
        title => title.length < 20 || "Title must have less than 20 characters"
      ],
      bodyRules: [
        body => !!body || "Body is required",
        body =>
          body.length < 200 || "Body must have less than 200 characters"
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
        this.title = ""
        this.body = ""
        this.$emit('input', value)
      }
    }
  },
  methods: {
    handleCreatePost() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("createPost", {
          data: {
            title: this.title,
            body: this.body,
            published: this.published
          }
        });
        console.log('create post action dispatched')
        this.title = ""
        this.body = ""
        this.$emit('input', false)
      }
    }
  }
};
</script>
