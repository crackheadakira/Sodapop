<script setup>
import { toRefs } from 'vue'

const props = defineProps({
    albumInfo: {
        type: Object,
        required: true,
    },
})
const { albumInfo } = toRefs(props);

</script>

<template>
    <div id="albumBody">
        <div v-if="albumInfo.otherAlbums.length >= 2" id="artistAlbums">
            <div v-for="album in albumInfo.otherAlbums">
                <img :src="album.cover" alt="{{album.album}} cover">
                <p class="clickableItemInfo">{{ album.album }}</p>
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
