<template>
  <div>
    <nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" tag="span" style="cursor: pointer">
          CryptoVue
        </router-link>
      </div>

      <div class="navbar-menu">

        <div class="navbar-end">
          <template v-if="user">
            <a class="navbar-item" @click="showCreatePostDialog = true">
              Post
            </a>

            <router-link class="navbar-item" :to="`/messages`">
              Messages
            </router-link>

            <router-link class="navbar-item" :to="`/user/${user.username}`">
              Profile
            </router-link>

            <a class="navbar-item" @click="handleLogout">
              Logout
            </a>
          </template>

          <template v-else>
            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/login" class="button is-white">
                  <strong>Log in</strong>
                </router-link>
                <router-link to="/signup" class="button is-light">
                  <strong>Sign up</strong>
                </router-link>
              </div>
            </div>
          </template>
        </div>
      </div>
    </nav>
    <CreatePostModal :value="showCreatePostDialog" @close="showCreatePostDialog = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CreatePostModal from '@/components/CreatePostModal.vue'

export default {
  name: 'Navbar',
  components: {
    CreatePostModal
  },
  data() {
    return {
      sideNav: false,
      showCreatePostDialog: false
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('user/logoutUser')
    }
  }
}
</script>
