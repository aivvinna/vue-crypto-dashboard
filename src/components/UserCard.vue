<template>
  <div class="card">
    <div class="card-content">
      <div class="level">
        <div class="level-left">
          <router-link
            :to="{ name: 'user', params: {username: user.username }}"
          >{{user.displayName === '' ? user.username : user.displayName}} @{{user.username}}</router-link>
        </div>
        <div class="level-right">
          <div v-if="user.username !== me.username">
            <button class="button is-rounded is-small">
              <span
                v-if="followingIds && !followingIds.includes(user.id)"
                @click="handleFollowUser()"
              >Follow</span>
              <span v-else @click="handleUnfollowUser()">Unfollow</span>
            </button>
          </div>
        </div>
      </div>
      <div class="content">{{user.bio}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserCard",
  props: ["user"],
  computed: {
    me() {
      return this.$store.getters["user/user"];
    },
    followingIds() {
      if (this.me) {
        return this.me.following.map(user => user.id);
      }
    }
  },
  methods: {
    handleFollowUser() {
      this.$store.dispatch("user/followUser", {
        user: this.user
      });
    },
    handleUnfollowUser() {
      this.$store.dispatch("user/unfollowUser", {
        user: this.user
      });
    }
  }
};
</script>

<style lang="scss">
.card {
  box-shadow: none;
}
</style>
