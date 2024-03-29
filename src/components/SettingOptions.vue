<script setup>
import { uniqueAlbumCover } from '../composables/uniqueAlbumCover'
import { cacheMetadata } from '../composables/cacheMetadata.js'
import { getMetadata } from '../composables/getMetadata.js';
import { useSettings } from '../stores/settings';
import { path, fs } from '@empathize/framework';
import { inject } from 'vue';

const swal = inject('$swal');
let albumInfo = $ref({ trackList: [], cover: '/noAlbumArt.png', artist: 'Unknown', album: 'Unknown', year: 'Unknown', otherAlbums: [] });

const props = defineProps({
    menuType: {
        type: String,
        required: true
    },
});

const settingsStore = useSettings();
const settingOptions = $ref(settingsStore.items);

async function getAlbumImage() {
    try {
        let { audioFiles, musicDir } = await getMetadata();
        settingsStore.setItem('musicFolder', musicDir);
        if (audioFiles !== null) {
            let otherAlbums = [...new Map(audioFiles.map(song => [song.album, song])).values()].slice(1);
            let swalModal = swal.mixin({
                showConfirmButton: true,
                html: `<p>Imported ${otherAlbums.length + 1} album(s)</p>`,
            })

            swalModal.fire({
                icon: "info",
                title: "Successful import!",
            })

            let trackList = await uniqueAlbumCover(audioFiles);
            /*albumInfo = trackList;
            albumInfo.trackList = trackList;
            albumInfo.cover = albumInfo[0].cover;
            albumInfo.album = audioFiles[0].album
            albumInfo.artist = audioFiles[0].artist
            albumInfo.year = audioFiles[0].year
            otherAlbums.length >= 2 ? albumInfo.otherAlbums = otherAlbums : albumInfo.otherAlbums = [];*/
            let { cachedMetadata, allAlbums } = cacheMetadata(trackList);
            await Neutralino.filesystem.writeFile(path.join("artists", "json", "allAlbums.json"), JSON.stringify(allAlbums));
            for (let artist of cachedMetadata) {
                await Neutralino.filesystem.writeFile(path.join("artists", "json", artist.artist + '.json'), JSON.stringify(artist));
            }
        }
    } catch (e) {
        console.error(e);
    }
}

</script>

<template>
    <div v-if="menuType === 'General'">
        <h2>General</h2>
        <ul>
            <li>
                <div class="settingTitle">Theme</div>
                <div class="settingDescription">Choose your theme for Sodapop</div>
                <div class="settingOptions">
                    <select name="theme" id="themeSelect" v-model="settingOptions.theme">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </li>
        </ul>
    </div>

    <div v-if="menuType === 'Music'">
        <h1>{{ menuType }}</h1>
        <ul>
            <li>
                <div class="settingTitle">Music Folder</div>
                <div class="settingDescription">Select the path to your Music folder</div>
                <div class="settingOptions" id="musicPath">
                    <button @click="getAlbumImage()"><i class="fa-regular fa-folder-open"></i></button>
                    <div class="path">{{ settingOptions.musicFolder }}</div>
                </div>
            </li>

            <li>
                <div class="settingTitle">Resave album covers</div>
                <div class="settingDescription">Let Sodapop resave your album covers for faster loading times. ( They
                    will be compressed for smaller file sizes )</div>
                <div class="settingOptions">
                    <input type="checkbox" id="resaveFiles"
                        @change="settingsStore.setItem('resave', $event.target.checked)"
                        v-model="settingOptions.resave">
                    <label></label>
                </div>
            </li>

            <li v-if="settingOptions.resave">
                <div class="settingTitle">Resave quality</div>
                <div class="settingDescription">At what quality to resave the image at. 1 being best quality.</div>
                <div class="settingOptions">
                    <input type="range" id="resaveQuality"
                        @change="settingsStore.setItem('resaveQuality', $event.target.value)" min="0" max="1" step="0.1"
                        v-model="settingOptions.resaveQuality" class="slider">
                    <label for="resaveQuality">{{ settingOptions.resaveQuality }}</label>
                </div>
            </li>

            <li v-if="settingOptions.resave">
                <div class="settingTitle">Resave image size</div>
                <div class="settingDescription">At what size to resave the image at. ( Recommended 300 )</div>
                <div class="settingOptions">
                    <input type="range" id="resaveSize"
                        @change="settingsStore.setItem('resaveSize', $event.target.value)" min="150" max="500" step="10"
                        v-model="settingOptions.resaveSize" class="slider">
                    <label for="resaveSize">{{ settingOptions.resaveSize }}</label>
                    <div id="previewResaveSize" :style="{ 'width': settingOptions.resaveSize + 'px' }"></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
body div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
}

button {
    width: 60px;
    height: 30px;
    background-color: #171717;
    border: 1px solid #272727;
    cursor: pointer;
}

button:hover i {
    filter: brightness(85%);
}

#previewResaveSize {
    background-color: #171717;
    border: 1px solid #272727;
    width: 100px;
    aspect-ratio: 1/1;
    background-image: url('/noAlbumArt.png');
    background-size: cover;
}

.settingOptions {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 3px;
}

#musicPath {
    flex-direction: row;
    gap: 0;
}

.settingTitle {
    font-size: 1.1rem;
    font-weight: 500;
}

.settingDescription {
    font-size: 0.9rem;
    font-weight: 400;
    color: #808080;
    padding-bottom: 10px;
}

.path {
    width: 600px;
    height: 30px;
    background-color: #171717;
    border: 1px solid #272727;
    overflow: hidden;
    margin-left: -1px;
    padding-left: 10px;
    padding-right: 10px;
}

h1 {
    border-radius: 1px;
    width: fit-content;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    margin-bottom: 20px;
    max-width: 660px;
}

input {
    margin-right: 5px;
    max-width: 100px;
}

input[type="checkbox"] {
    opacity: 0;
    height: 20px;
    width: 40px;
    position: absolute;
    cursor: pointer;
}

input[type="checkbox"]+label {
    height: 20px;
    width: 40px;
    border-radius: 60px;
    padding: 10px;
    background-color: #171717;
    border: 2px solid #272727;
    transition: 300ms ease;
}

input[type="checkbox"]:checked+label {
    background-color: #3b82f6;
    border: 2px solid #3b82f6;
}

input[type="checkbox"]+label::before {
    pointer-events: none;
    content: "";
    position: absolute;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: white;
    left: 0;
    top: 0px;
    transition: 200ms ease;
}

input[type="checkbox"]:checked+label::before {
    left: 16px;
}
</style>