<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const router = useRoute();
const { type } = router.params;

let allAlbums = $ref(null);

async function getAlbums() {
    try {
        if (Neutralino.filesystem.getStats('artists/json/allAlbums.json')) {
            allAlbums = JSON.parse(await Neutralino.filesystem.readFile('artists/json/allAlbums.json'));
        }
    } catch (err) {
        console.error(err)
    }
}

onMounted(() => {
    getAlbums();
})
</script>

<template>
    <div id="allItemsBody">
        <ul class="showAll" v-if="type === 'albums'">
            <li v-for="album in allAlbums">
                <router-link tag="div" :to="'/album/' + album.album"><img :src="album.cover" alt="album cover" />
                </router-link>
                <p class="clickableItemInfo">{{ album.album }}</p>
                <p class="clickableItemInfo">{{ album.artist }}</p>
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