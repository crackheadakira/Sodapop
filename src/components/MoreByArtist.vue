<script setup>
import { watch, toRefs } from 'vue'

const props = defineProps({
    albumInfo: {
        type: Object,
        required: true,
    },
})
const { albumInfo } = toRefs(props);
const moreAlbumsExist = $ref(props.albumInfo.otherAlbums.length >= 2);

watch(albumInfo, (newData) => {
    moreAlbumsExist = newData.otherAlbums.length >= 2;
});
</script>

<template>
    <div id="albumBody">
        <div v-if="moreAlbumsExist" id="artistAlbums">
            <div v-for="album in albumInfo.otherAlbums.filter((album, index) => album.albumName !== albumInfo.album)">
                <img :src="album.albumCover" :alt="album.albumName">
                <p class="clickableItemInfo">{{ album.albumName }}</p>
            </div>
        </div>
        <div v-else>
            <p>Sorry there's nothing to see here...</p>
        </div>
    </div>
</template>

<style scoped>
#albumBody {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
}

#artistAlbums {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    gap: 20px;
    width: 90%;
    max-height: 450px;
    flex-wrap: wrap;
}

#artistAlbums div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 170px;
    max-height: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
    gap: 10px;
}

img {
    width: 170px;
    border-radius: 15px;
    cursor: pointer;
}
</style>
