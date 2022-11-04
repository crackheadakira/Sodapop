<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import AlbumInfo from './components/AlbumInfo.vue'
import TrackList from './components/TrackList.vue'
</script>

<template>
  <AlbumInfo :albumInfo="{
    artistName: 'Joji',
    albumName: 'Nectar',
    releaseYear: '2020',
    albumMainGenre: 'Alternative',
    albumCover: 'https://lastfm.freetls.fastly.net/i/u/770x0/71da7e08ec27c0c83b1133c0e6d1ca51.jpg#71da7e08ec27c0c83b1133c0e6d1ca51'
  }" />
  <TrackList
    :TrackList='["Ew", "MODUS", "Tick", "Tock", "Daylight", "Upgrade", "Gimme Love", "Run", "Sanctuary", "High Hopes (feat. Omar Apollo)", "NITROUS", "Pretty Boy (feat. Lil Yachty)", "Normal People (feat. rel brown)", "Afterthought", "Mr. Hollywood", "777", "Reanimator (feat. Yves Tumor)", "Like You Do", "Your Man"]' />
</template>

<style scoped>

</style>
