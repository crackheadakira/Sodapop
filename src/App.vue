<script setup>
import FooterPlayer from './components/FooterPlayer.vue'
import TopMenuBarVue from './components/TopMenuBar.vue';
</script>

<template>
  <TopMenuBarVue />
  <div id="routerViewMiddle">
    <RouterView />
  </div>
  <FooterPlayer />
</template>

<style scoped>
#routerViewMiddle {
  position: relative;
  height: calc(100% - 61px - 113px);
}
</style>
