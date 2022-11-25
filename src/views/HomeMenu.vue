<script setup>
import { useRecentlyPlayedStore } from '../stores/recentlyplayed';
import { onMounted } from 'vue'
let recently_played_store = useRecentlyPlayedStore();

const trackList = $ref(recently_played_store.recentTracks);
const albumList = $ref(recently_played_store.recentAlbums);
const artistList = $ref(recently_played_store.recentArtists);

recently_played_store.$subscribe((mutation, state) => {
    trackList = state.recentTracks;
    albumList = state.recentAlbums;
    artistList = state.recentArtists;
});
</script>

<template>
    <div id="homeMenu">
        <div id="recentSongs" v-if="trackList.length > 0">
            <h2>Recently Played Songs</h2>
            <div class="recentCoasterMenu">
                <div class="coasterItem" v-for="Track in trackList">
                    <img class="albumCover" :src="Track.cover">
                    <div class="itemName clickableItemInfo">{{ Track.title }}</div>
                    <div class="artistName clickableItemInfo">{{ Track.artist }}</div>
                </div>
            </div>
        </div>

        <div id="recentAlbums" v-if="albumList.length > 0">
            <h2>Recently Played Albums</h2>
            <div class="recentCoasterMenu">
                <div class="coasterItem" v-for="Album in albumList">
                    <img class="albumCover" :src="Album.cover">
                    <div class="itemName clickableItemInfo">{{ Album.album }}</div>
                    <div class="artistName clickableItemInfo">{{ Album.artist }}</div>
                </div>
            </div>
        </div>

        <div id="recentArtists" v-if="artistList.length > 0">
            <h2>Recently Played Artists</h2>
            <div class="recentCoasterMenu">
                <div class="coasterItem" v-for="Artist in artistList">
                    <img class="albumCover" :src="Artist.cover">
                    <div class="itemName clickableItemInfo">{{ Artist.artist }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#homeMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    overflow-y: scroll;
    height: 100%;
    width: 100%;
}

.recentCoasterMenu {
    display: flex;
    gap: 30px;
    margin: 20px;
    height: 250px;
    border-radius: 10px;
    width: 1040px;
    max-width: 1040px;
    overflow: hidden;
    overflow-x: scroll;
    scroll-behavior: smooth;
}

.seeMoreItem {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 180px;
    border: solid 1px #272727;
    border-radius: 10px;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    transition: 250ms ease;
}

.seeMoreItem:hover {
    filter: brightness(85%);
    cursor: pointer;
}

.coasterItem {
    max-width: 180px;
    font-size: 0.9rem;
    font-weight: 500;
}

.artistName {
    font-size: 0.8rem;
}

.albumCover {
    height: 180px;
    width: 180px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    -ms-user-select: none;
}

.albumCover:hover {
    filter: brightness(85%);
}
</style>