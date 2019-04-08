<template>
  <div class="columns">
    <div class="column">
      Users
      <a v-for="user in usersConversed" :key="user.id"
        @click="selectUser(user)">
        {{user.username}}
      </a>
    </div>
    <div class="column">
      Message
      <p v-for="message in messages" :key="message.id">
        {{message.content}}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Messages',
  data() {
    return {
      userSelected: null
    }
  },
  created() {
    this.$store.dispatch('user/messages/getUsersConversed')
  },
  computed: {
    usersConversed() {
      return this.$store.getters['user/messages/usersConversed']
    },
    messages() {
      return this.$store.getters['user/messages/messages'].filter(message => {
        if (this.userSelected) {
          return message.author.id === this.userSelected.id || message.receiver.id === this.userSelected.id
        }
      })
    }
  },
  watch: {
    userSelected: function(newUserSelected) {
      this.$store.dispatch('user/messages/getMessages', newUserSelected.id)
    }
  },
  methods: {
    selectUser(user) {
      this.userSelected = user
    }
  }
}
</script>
