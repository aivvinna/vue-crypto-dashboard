<template>
  <v-app style="background: #E3E3E3">
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-side-icon
          @click="toggleSideNav"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">CoinView</h1>
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

    <v-toolbar fixed color="primary" dark>
      <v-toolbar-side-icon
        @click="toggleSideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          CoinView
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

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon
            class="hidden-sm-only"
            left>
            {{item.icon}}
          </v-icon>
          {{item.title}}
        </v-btn>

        <v-btn flat v-if="user" @click="handleLogout">
          <v-icon class="hdiden-sm-only" left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    ...mapGetters(['user']),
    horizontalNavItems() {
      let items = [
        { icon: 'attach_money', title: 'Coins', link: '/coins'},
        { icon: 'lock_open', title: 'Log In', link: '/login'},
        { icon: 'create', title: 'Sign Up', link: '/signup'}
      ]
      if (this.user) {
        items = [
          { icon: 'chat', title: 'Posts', link: '/posts'},
          { icon: 'account_box', title: 'Profile', link: '/profile'}
        ]
      }
      return items
    },
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
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
