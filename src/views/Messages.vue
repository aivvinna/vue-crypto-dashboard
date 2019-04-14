<template>
  <div class="columns">
    <div class="column is-4">
      <nav class="panel">
        <div class="panel-heading">
          Users
        </div>

        <template v-if="usersConversed && usersConversed.length > 0">
          <a v-for="user in usersConversed" :key="user.id"
            class="panel-block" :class="{'is-active': markSelectedUser(user)}"
            @click="selectUser(user)">
            {{user.username}}
          </a>
        </template>
      </nav>

    </div>
    
    <div class="column" v-if="userSelected">
      <MessagesList :userSelected="userSelected" />
    </div>
  </div>
</template>

<script>
import { GET_USERS_CONVERSED } from '@/graphql/queries'
import MessagesList from '@/components/MessagesList.vue'

export default {
  name: 'Messages',
  components: {
    MessagesList
  },
  data() {
    return {
      userSelected: null
    }
  },
  apollo: {
    usersConversed: {
      query: GET_USERS_CONVERSED
    }
  },
  methods: {
    selectUser(user) {
      this.userSelected = user
    },
    markSelectedUser(user) {
      if (this.userSelected) {
        return user.id === this.userSelected.id
      }
      return false
    },
  },
}
</script>
