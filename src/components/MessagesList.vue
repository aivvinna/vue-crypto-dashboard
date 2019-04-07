<template>
  <div>
    MessagesList
    <p v-for="message in messages" :key="message.content">
      {{message.content}}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MessagesList',
  created() {
    this.$store.dispatch("user/messages/listenToMessages")
  },
  computed: {
    ...mapGetters('user/messages', ['messages'])
  }
}
</script>
