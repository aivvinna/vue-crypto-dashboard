<template>
  <v-app style="background: #E3E3E3">
    
    <Toolbar/>

    <main>
      <v-container mt-4 fluid>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-container>
    </main>
  </v-app>
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
