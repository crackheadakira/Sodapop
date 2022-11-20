<script setup>
import AlbumInfo from '../components/AlbumInfo.vue'
import TrackList from '../components/TrackList.vue'
import HorizontalMenu from '../components/HorizontalMenu.vue'
import { getMetadata } from '../composables/getMetadata.js';
import { fs } from '@empathize/framework';
import { inject } from 'vue';
const swal = inject('$swal');

let albumInfo = $ref({ trackList: [], cover: new URL('/noAlbumArt.png', import.meta.url).href });

async function getAlbumImage() {
    try {
        let metadata = await getMetadata();
        let toast = swal.mixin({
            toast: true,
            showConfirmButton: false,
            position: 'top-end',
            timer: 3000,
            html: `<p>Imported ${[...new Map(metadata.map(song => [song.album, song])).values()].length} album(s)</p>`,
        })

        toast.fire({
            icon: "info",
            title: "Successful import!",
        })
        if (metadata !== null) {
            albumInfo.albumName = metadata[0].album
            albumInfo.artistName = metadata[0].artist
            albumInfo.releaseYear = metadata[0].year
            if (metadata[0]?.coverPath) {
                let albumImage = new Uint8Array(await fs.read(metadata[0].coverPath, true));
                let blob = new Blob([albumImage], { type: "image/jpeg" });
                albumInfo.cover = URL.createObjectURL(blob);

            } else if (metadata[0]?.albumCover) {
                albumInfo.cover = `data:image/jpeg;base64,${metadata[0].albumCover}`;
            }
        }
        let trackList = [];
        for (let track of metadata) {
            track.coverPath = albumInfo.cover;
            trackList.push(track)
        }
        albumInfo.trackList = trackList;
    } catch (e) {
        console.error(e);
    }
}
</script>

<template>
    <button @click="getAlbumImage()">Directory Loading</button>
    <AlbumInfo :albumInfo='albumInfo' />
    <HorizontalMenu />
    <TrackList :albumInfo='albumInfo' />
</template>

<style scoped>

</style>
