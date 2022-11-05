<script setup>
import AlbumInfo from './components/AlbumInfo.vue'
import TrackList from './components/TrackList.vue'
import HorizontalMenu from './components/HorizontalMenu.vue'
</script>

<template>
  <AlbumInfo :albumInfo="{
    artistName: 'Joji',
    albumName: 'Nectar',
    releaseYear: '2020',
    albumCover: 'https://lastfm.freetls.fastly.net/i/u/770x0/71da7e08ec27c0c83b1133c0e6d1ca51.jpg#71da7e08ec27c0c83b1133c0e6d1ca51'
  }" />
  <HorizontalMenu />
  <TrackList
    :TrackList='["Ew", "MODUS", "Tick", "Tock", "Daylight", "Upgrade", "Gimme Love", "Run", "Sanctuary", "High Hopes (feat. Omar Apollo)", "NITROUS", "Pretty Boy (feat. Lil Yachty)", "Normal People (feat. rel brown)", "Afterthought", "Mr. Hollywood", "777", "Reanimator (feat. Yves Tumor)", "Like You Do", "Your Man"]' />
</template>

<style scoped>

</style>
