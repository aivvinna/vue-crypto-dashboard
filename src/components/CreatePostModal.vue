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

            <!-- Content Text Input -->
            <v-layout row v-if="showCreatePostDialog">
              <v-flex xs12>
                <v-textarea
                  :rules="contentRules"
                  v-model="content"
                  label="Content"
                  type="text"
                  required
                  auto-grow
                  box
                  autofocus
                  outline></v-textarea>
              </v-flex>
            </v-layout>

            <!-- Category Select -->
            <v-layout row v-if="showCreatePostDialog">
              <v-flex xs12>
                <v-autocomplete
                  v-model="category"
                  :items="cryptocurrencies"
                  item-text="symbol"
                  item-value="symbol"
                  label="Choose a category"
                  box
                  chips
                  multiple
                >
                  <template
                    slot="selection"
                    slot-scope="data">
                    <v-chip
                      :selected="data.selected"
                      close
                      @input="removeCategory(data.item)">
                      <v-avatar>
                        <img :src="require(`../assets/img/color/${data.item.symbol.toLowerCase()}.png`)">
                      </v-avatar>
                        {{data.item.symbol}}
                    </v-chip>
                  </template>
                  <template
                    slot="item"
                    slot-scope="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-avatar>
                        <img :src="require(`../assets/img/color/${data.item.symbol.toLowerCase()}.png`)">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.symbol"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
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
import { cryptocurrencies } from "../util/cryptocurrencies";

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
  watch: {
    showCreatePostDialog: function(newVal) {
      if (!newVal) {
        this.category = [];
      }
    }
  },
  methods: {
    handleCreatePost() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("createPost", {
          data: {
            content: this.content,
            category: {
              set: this.category
            }
          }
        });
        console.log('create post action dispatched')
        this.content = ""
        this.category = [];
        this.$emit('input', false)
      }
    },
    removeCategory(category) {
      const index = this.category.indexOf(category.symbol);
      this.category.splice(index, 1);
    }
  }
};
</script>
