<script setup>
import AlbumInfo from '../components/AlbumInfo.vue'
import TrackList from '../components/TrackList.vue'
import HorizontalMenu from '../components/HorizontalMenu.vue'
</script>

<template>
    <AlbumInfo :albumInfo="{
        artistName: 'Joji',
        albumName: 'SMITHEREENS',
        releaseYear: '2022',
        albumCover: 'https://lastfm.freetls.fastly.net/i/u/770x0/6f2784172913db6982b2f6de18b837f6.jpg#6f2784172913db6982b2f6de18b837f6'
    }" />
    <HorizontalMenu />
    <TrackList
        :TrackList='[{ trackName: "Glimpse of Us", length: "3:53", }, { trackName: "Feeling Like The End", length: "1:42", }, { trackName: "Die For You", length: "3:31", }, { trackName: "Before The Day Is Over", length: "3:33" }, { trackName: "Dissolve", length: "2:57" }, { trackName: "Night Rider", length: "2:07" }, { trackName: "BLAHBLAHBLAH DEMO", length: "2:22" }, { trackName: "YUKON (INTERLUDE)", length: "2:21" }, { trackName: "1AM Freestyle", length: "1:53" }]' />
</template>

<style scoped>

</style>
