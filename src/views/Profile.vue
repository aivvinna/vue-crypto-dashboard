<template>
  <div>
    Profile
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(['error', 'loading']),
    ...mapGetters('user', [
      'user'
    ])
  },
  mounted() {
    console.log('hi')
    console.log(this.user)
  },
  methods: {
    getUser: function() {
      
    }
  }
}
</script>
