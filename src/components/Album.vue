<script setup>
import { ref } from 'vue'

defineProps({
  artistName: String
})

const count = ref(0)
</script>

<template>
  <div id="album">
    <img
      src="https://lastfm.freetls.fastly.net/i/u/770x0/71da7e08ec27c0c83b1133c0e6d1ca51.jpg#71da7e08ec27c0c83b1133c0e6d1ca51"
      alt="nectar - joji" id="albumCover">
    <div id="albumInfo">
      <h2 id="albumTitle">Nectar</h2>
      <h4>Alternative • 2020</h4>
      <h3 id="artistName">{{ artistName }}</h3>
    </div>
  </div>
</template>

<style scoped>
#album {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  gap: 20px;
}

#albumInfo {
  display: flex;
  flex-direction: column;
  flex-direction: column;
  align-items: center;
}

#albumCover {
  height: 300px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
