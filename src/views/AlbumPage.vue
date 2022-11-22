<script setup>
import HorizontalMenu from '../components/HorizontalMenu.vue'
import AlbumInfo from '../components/AlbumInfo.vue'
import TrackList from '../components/TrackList.vue'
import moreByArtist from '../components/MoreByArtist.vue'

import { useHorizontalMenuStore } from '../stores/horizontalmenu';
import { getMetadata } from '../composables/getMetadata.js';
import { fs } from '@empathize/framework';
import { inject, shallowRef } from 'vue';

const swal = inject('$swal');
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

/** Fetches one cover per album and then gives it to the rest of the songs in the album
 * @param {object} data The object containing all the metadata.
 * @returns {array} Returns an array where all the songs have their respective cover.
 */
async function uniqueAlbumCover(data) {
    let fixedData = [];
    // Gets one track per album
    let unique = [...new Map(data.map(song => [song.album, song])).values()];

    // Then fetches one album cover per album
    for (let i = 0; i < unique.length; i++) {
        // Finds the album the track should be in
        let matching = data.filter(res => (res.album == unique[i].album) && (res.artist == unique[i].artist));
        // Checks if the album has a cover image in the folder
        if (matching[0]?.coverPath) {
            matching[0].cover = await makeAlbumImage(matching[0], true);
        } else {
            matching[0].cover = await makeAlbumImage(matching[0], false);
        }
        for (let j = 0; j < matching.length; j++) {
            matching[j].cover = matching[0].cover;
        }
        fixedData.push(matching);
    }
    return fixedData.flat();
}

async function makeAlbumImage(track, artExists) {
    if (artExists) {
        let albumImage = new Uint8Array(await fs.read(track.coverPath, true));
        let blob = new Blob([albumImage], { type: "image/jpeg" });
        return URL.createObjectURL(blob);
    } else {
        return `data:image/jpeg;base64,${track.albumCover}`
    }
}

async function getAlbumImage() {
    try {
        let metadata = await getMetadata();
        if (metadata !== null) {
            let otherAlbums = [...new Map(metadata.map(song => [song.album, song])).values()].slice(1);
            let toast = swal.mixin({
                toast: true,
                showConfirmButton: false,
                position: 'top-end',
                timer: 3000,
                html: `<p>Imported ${otherAlbums.length + 1} album(s)</p>`,
            })

            toast.fire({
                icon: "info",
                title: "Successful import!",
            })

            let trackList = await uniqueAlbumCover(metadata);
            albumInfo = trackList;
            albumInfo.trackList = trackList;
            albumInfo.cover = albumInfo[0].cover;
            albumInfo.album = metadata[0].album
            albumInfo.artist = metadata[0].artist
            albumInfo.year = metadata[0].year
            otherAlbums.length >= 2 ? albumInfo.otherAlbums = otherAlbums : albumInfo.otherAlbums = [];

        }
    } catch (e) {
        console.error(e);
    }
}
</script>

<template>
    <button @click="getAlbumImage()">Directory Loading</button>
    <AlbumInfo :albumInfo='albumInfo' />
    <HorizontalMenu :albumInfo="albumInfo" />
    <component :is="currentTab.comp" :albumInfo="albumInfo"></component>
</template>

<style scoped>

</style>
