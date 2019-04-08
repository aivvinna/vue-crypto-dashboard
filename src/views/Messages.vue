<template>
  <div>
    Messages
    <p v-for="user in usersConversed" :key="user.id">
      {{user.username}}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Messages',
  created() {
    this.$store.dispatch('user/messages/getUsersConversed')
    console.log('this.usersConversed', this.usersConversed)
  },
  computed: {
    usersConversed() {
      return this.$store.getters['user/messages/usersConversed']
    }
  }
}
</script>
