<template>
  <v-app style="background: #E3E3E3">
    
    <Toolbar/>

    <main>
      <v-container mt-4 fluid>
        <transition name="fade">
          <router-view></router-view>
        </transition>
        <router-view name="modal"></router-view>
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  z-index: 99999;
  padding: 3vmax;
}

.modal-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 15px;
  cursor: auto;
  overflow: hidden;
}
</style>
