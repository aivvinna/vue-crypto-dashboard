<template>
  <div class="container" v-if="me && user">
    <div class="column is-8 is-offset-2">
      <div class="box">
        <h1 class="title">Account Settings</h1>
        <form @submit.prevent="updateUser">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input" type="text" placeholder="Username" v-model="user.username">
            </div>
          </div>

          <div class="field">
            <label class="label">Display Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Display Name"
                v-model="user.displayName"
              >
            </div>
          </div>

          <div class="field">
            <label class="label">Location</label>
            <div class="control">
              <input class="input" type="text" placeholder="Location" v-model="user.location">
            </div>
          </div>

          <div class="field">
            <label class="label">Bio</label>
            <div class="control">
              <textarea class="textarea" placeholder="Bio" v-model="user.bio"></textarea>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-fullwidth is-dark" type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_USER_SETTINGS } from "@/graphql/queries";

export default {
  name: "UserSettings",
  apollo: {
    user: {
      query: GET_USER_SETTINGS,
      variables() {
        if (this.me) {
          return {
            username: this.me.username
          };
        }
      }
    }
  },
  computed: {
    me() {
      return this.$store.getters["user/user"];
    }
  },
  methods: {
    updateUser() {
      console.log(this.user);
    }
  }
};
</script>
