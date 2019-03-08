<template>
  <div id="app">
    <Navbar/>

    <main id="main">
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <router-view name="modal"></router-view>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
#app {
  background-color: #e6ecf0
}

#main {
  padding: 10px;
}

// transitions
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
