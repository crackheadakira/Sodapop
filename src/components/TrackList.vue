<script setup>
import { usePlayerStore } from '../stores/player';
import { useRecentlyPlayedStore } from '../stores/recentlyplayed';
import { convertTime } from '../composables/convertTime.js';
const player_store = usePlayerStore();
const recently_played_store = useRecentlyPlayedStore();

function trackChange(track) {
    player_store.replaceTrack(track);
    recently_played_store.addTrack({ title: track.title, artist: track.artist, album: track.album, cover: track.cover });
    recently_played_store.addAlbum({ artist: track.artist, album: track.album, cover: track.cover });
    recently_played_store.addArtist({ artist: track.artist, cover: track.cover });
}

const props = defineProps({
    albumInfo: {
        type: Object,
        required: true,
    },
})

</script>

<template>
    <ol id="tracks">
        <li v-for="Track in albumInfo.trackList" @dblclick="trackChange(Track)">
            <div>{{ Track.title }}</div>
            <span>{{ convertTime(Track.duration) }}</span>
        </li>
    </ol>
</template>

<style scoped>
li div {
    max-width: 1000px;
    overflow-wrap: break-word;
    display: inline-table;
}

#tracks {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 450px;
    scrollbar-width: thin;
}

ol {
    list-style: none;
    counter-reset: item;
    backface-visibility: hidden;
    margin-bottom: 0px;
}

li {
    counter-increment: item;
    width: 98%;
    border-radius: 6px;
    margin: 1px;
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 10px;
    transition: 150ms ease;
    border: 2px solid #404040;
    border-color: transparent;
    font-weight: 500;
    -webkit-user-select: none;
    user-select: none;
    -ms-user-select: none;
}

li span {
    float: right;
}

li:hover {
    border: 2px solid #404040;
    background-color: #282828;
    cursor: pointer;
}

li::before {
    display: inline-block;
    content: counter(item);
    width: 1.2rem;
    font-size: 0.9rem;
    font-weight: 400;
    text-align: center;
    margin-right: 6px;
}

li:hover::before {
    display: inline-block;
    content: '\f04b';
    font: var(--fa-font-solid);
    font-size: 0.9rem;
    margin-right: 6px;
    height: 1.2rem;
}
</style>
