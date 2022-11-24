<script setup>
import HorizontalMenu from '../components/HorizontalMenu.vue'
import AlbumInfo from '../components/AlbumInfo.vue'
import TrackList from '../components/TrackList.vue'
import moreByArtist from '../components/MoreByArtist.vue'
import { useHorizontalMenuStore } from '../stores/horizontalmenu';

let albumInfo = $ref({ trackList: [], cover: '/noAlbumArt.png', artist: 'Unknown', album: 'Unknown', year: 'Unknown', otherAlbums: [] });
const horizontalMenuStore = useHorizontalMenuStore();
const tabs = [
    { name: 'TrackList', comp: TrackList, },
    { name: 'moreByArtist', comp: moreByArtist, }
];
let currentTab = $shallowRef(tabs[getTabsIndex(horizontalMenuStore.activeID)]);

function getTabsIndex(activeID) {
    if (tabs[0].name === activeID) {
        return 0;
    } else if (tabs[1].name === activeID) {
        return 1;
    }
}

horizontalMenuStore.$subscribe((mutation, state) => {
    currentTab = tabs[getTabsIndex(state.activeID)];
});
</script>

<template>
    <AlbumInfo :albumInfo='albumInfo' />
    <HorizontalMenu :albumInfo="albumInfo" />
    <component :is="currentTab.comp" :albumInfo="albumInfo"></component>
</template>

<style scoped>

</style>
