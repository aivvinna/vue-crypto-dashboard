<template>
  <div id="app">
    <Toolbar/>

    <main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <router-view name="modal"></router-view>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Toolbar from '@/components/Toolbar.vue'

export default {
  name: 'App',
  components: {
    Toolbar
  }
}
</script>

<style lang="scss">
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
