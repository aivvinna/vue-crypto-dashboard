<template>
  <div>
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-side-icon
          @click="toggleSideNav"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">CryptoVue</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list>
        <v-list-tile v-for="item in sideNavItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="user" @click="handleLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed color="primary" dark dense>
      <v-toolbar-side-icon
        @click="toggleSideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          CryptoVue
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        flex
        prepend-icon="search"
        placeholder="Search"
        color="accent"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- Navbar buttons -->
      <v-toolbar-items class="hidden-xs-only">
        <!-- Buttons when user is logged in -->
        <template v-if="user">
          <v-btn flat @click="showCreatePostDialog = true">
            Post
          </v-btn>

          <v-btn flat :to="`/user/${user.username}`">
            Profile
          </v-btn>

          <v-btn flat @click="handleLogout">
            Logout
          </v-btn>
        </template>
        
        <!-- Buttons when there is no user -->
        <template v-else>
          <v-btn flat to="/login">
            Login
          </v-btn>

          <v-btn flat to="/signup">
            Sign Up
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
    <CreatePostModal v-model="showCreatePostDialog"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CreatePostModal from '@/components/CreatePostModal.vue'

export default {
  name: 'Toolbar',
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
    sideNavItems() {
      let items = [
        { icon: 'attach_money', title: 'Coins', link: '/coins'},
        { icon: 'lock_open', title: 'Log In', link: '/login'},
        { icon: 'create', title: 'Sign Up', link: '/signup'}
      ]
      if (this.user) {
        items = [
          { icon: 'chat', title: 'Posts', link: '/posts'},
          { icon: 'stars', title: 'Create Post', link: '/'},
          { icon: 'account_box', title: 'Profile', link: '/profile'}
        ]
      }
      return items
    }
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav
    },
    handleLogout() {
      this.$store.dispatch('user/logoutUser')
    }
  }
}
</script>
