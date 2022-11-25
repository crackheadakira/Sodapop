<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useHorizontalMenuStore } from '../stores/horizontalmenu';
const horizontalMenuStore = useHorizontalMenuStore();

const router = useRoute();

let allAlbums = $ref(null);
let allArtists = $ref(null);
let itemType = $ref(router.params.type);

watch(() => router.params.type, newType => itemType = newType);

async function getAlbums() {
    try {
        if (Neutralino.filesystem.getStats('artists/json/allAlbums.json')) {
            let fetchedAlbums = JSON.parse(await Neutralino.filesystem.readFile('artists/json/allAlbums.json'));
            fetchedAlbums.sort((a, b) => a.album.localeCompare(b.album));
            allAlbums = fetchedAlbums;
        }
    } catch (err) {
        console.error(err)
    }
}

function sortArtists() {
    try {
        let albumCopy = [...allAlbums];
        albumCopy.sort((a, b) => a.artist.localeCompare(b.artist));
        allArtists = [...new Map(albumCopy.map(track => [track.artist, track])).values()].flat();
    } catch (err) {
        console.error(err)
    }
}

function addAlbumToStore(album) {
    horizontalMenuStore.setAlbum(album);
}

onMounted(async () => {
    await getAlbums();
    sortArtists();
})
</script>

<template>
    <div id="allItemsBody">
        <ul class="showAll" v-if="itemType === 'albums'">
            <li v-for="album, index in allAlbums">
                <router-link tag="div" @click="addAlbumToStore(album)"
                    :to="'/album/' + album.album.replaceAll('/', '').replaceAll('#', '')">
                    <img :src="album.cover" alt="album cover" />
                </router-link>
                <p class="clickableItemInfo">{{ album.album }}</p>
                <p class="clickableItemInfo">{{ album.artist }}</p>
            </li>
        </ul>
        <ul class="showAll" v-else-if="itemType === 'artists'">
            <li v-for="artist, index in allArtists">
                <router-link tag="div" :to="'/artist/' + artist.artist"><img :src="artist.cover" alt="album cover" />
                </router-link>
                <p class="clickableItemInfo">{{ artist.artist }}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
#allItemsBody {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.showAll {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-top: 20px;
    gap: 20px;
    width: 90%;
    flex-wrap: wrap;
    overflow: hidden;
    overflow-y: scroll;
}

img {
    width: 170px;
    border-radius: 15px;
    cursor: pointer;
}
</style>