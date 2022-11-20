<script setup>
import { onMounted, watch } from 'vue';
import { fs } from '@empathize/framework';
import { usePlayerStore } from '../stores/player';
import { convertTime } from '../composables/convertTime.js';

const player_store = usePlayerStore();

const audioTag = $ref(null);
const trackInput = $ref(null);
let audioSrc = $ref(bufferTrack(player_store.currentTrack?.fileLocation));
let currentTrack = $ref(player_store.currentTrack || { cover: '/noAlbumArt.png', title: '', artist: '', album: '' });
let audioVolume = $ref(player_store.currentVolume);
let trackDisplayTime = $ref(convertTime(player_store.currentTime));
let trackEndTime = $ref(convertTime(player_store.currentTrackLength));
let playStateIcon = $ref(player_store.isPlaying ? "fa-pause" : "fa-play");

player_store.$subscribe((mutation, state) => {
    let newTrack = state.currentTrack;
    if (newTrack !== currentTrack) bufferTrack(newTrack.fileLocation);
    currentTrack = newTrack;
    updateLength(newTrack.duration);
});

async function bufferTrack(fileLocation) {
    try {
        console.log(fileLocation);
        let startTime = performance.now();
        let buffer = new Uint8Array(await fs.read(fileLocation, true));
        console.log(`${Math.ceil(performance.now() - startTime)}ms - Finished Buffering track`);
        let blob = new Blob([buffer], { type: 'audio/flac' });
        audioSrc = URL.createObjectURL(blob);
        audioTag.load();
        audioTag.play();
        setTimeout(() => {
            audioSrc = URL.createObjectURL(blob);
            audioTag.load();
            audioTag.currentTime = player_store.currentTime;
            audioTag.pause();
            playUpdateIcon();
        }, 5000);
    } catch (e) {
        console.error(e);
    }
}

function playUpdateIcon() {
    player_store.togglePlay();
    playStateIcon = player_store.isPlaying ? "fa-pause" : "fa-play";
    if (player_store.isPlaying) {
        let playPromise = audioTag.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => { }).catch(error => { console.error(error); });
        }
    } else {
        let pausePromise = audioTag.pause();
        if (pausePromise !== undefined) {
            pausePromise.then(_ => { }).catch(error => { console.error(error); });
        }
    }
}

function stopSong() {
    playUpdateIcon();
    audioTag.currentTime = 0;
}

function updateTime(time, seek = false) {
    player_store.updateTime(time);
    trackDisplayTime = convertTime(time);
    if (time === player_store.currentTrackLength) {
        stopSong();
    }
    if (seek) {
        audioTag.fastSeek(time);
    }
}

function updateLength(length) {
    player_store.updateTrackLength(Math.floor(length));
    trackEndTime = convertTime(length);
    audioTag.max = Math.floor(length);
}

function updateVolume(volume) {
    player_store.updateSoundVolume(volume);
    audioVolume = volume;
    audioTag.volume = volume / 100;
}

onMounted(() => {
    audioTag.currentTime = player_store.currentTime;
    audioTag.volume = audioVolume / 100;
});

</script>

<template>
    <div id="mainPlayer">
        <div id="songInfo">
            <img :src="currentTrack.coverPath" id="albumCover">
            <div id="songInfoText">
                <p class="clickableItemInfo" id="songName">{{ currentTrack.title }}</p>
                <p class="clickableItemInfo" id="songArtist">{{ currentTrack.artist }}</p>
            </div>
        </div>
        <div id="buttonsAndProgress">
            <label id="trackStartLength">{{ trackDisplayTime }}<input @change="updateTime($event.target.value, true)"
                    ref="trackInput" type="range" :max="player_store.currentTrackLength" :value=player_store.currentTime
                    class="slider" id="musicProgressBar"><label id="trackEndLength">{{ trackEndTime }}</label>
            </label>
            <div id="playerButtons">
                <i @click="player_store.toggleShuffle()" class="fa-solid fa-shuffle fa-sm footerPlayerButton"
                    id="shuffleButton" :class="{ activePlayerButton: player_store.isShuffling }"></i>
                <i class="fa-solid fa-backward fa-sm footerPlayerButton"></i>
                <i @click="playUpdateIcon()" :class="[playStateIcon]" class="fa-solid footerPlayerButton fa-fw"
                    id="mainPlayButton"></i>
                <i class="fa-solid fa-forward fa-sm footerPlayerButton"></i>
                <i @click="player_store.toggleRepeat()" class="fa-solid fa-repeat fa-sm footerPlayerButton"
                    :class="{ activePlayerButton: player_store.isRepeating }" id="repeatButton"></i>
            </div>
            <audio controls id="HTMLAudioPlayer" ref="audioTag"
                @timeupdate="updateTime(Math.floor($event.target.currentTime))"
                @play="updateLength(Math.floor($event.target.duration))">
                <source :src="audioSrc">
            </audio>
        </div>
        <div id="volumeBar">
            <i class="fa-solid fa-volume-low"></i>
            <input type="range" min="1" max="100" :value=audioVolume @change="updateVolume($event.target.value)"
                class="slider" id="volumeSlider">
        </div>
    </div>
</template>

<style scoped>
audio {
    display: none;
}

#mainPlayer {
    position: absolute;
    bottom: 0;
    margin-top: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #171717;
    border-top: 1px solid #272727;
}

#playerButtons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 21px;
}

.footerPlayerButton {
    user-select: none;
}

.activePlayerButton::before {
    position: relative;
    top: 3.5px;
    text-emphasis-style: dot;
    text-emphasis-position: under left;
    -webkit-text-emphasis-style: dot;
    -webkit-text-emphasis-position: under;
    user-select: none;
}

#shuffleButton .disablePlayerButton {
    color: #505050;
}

#buttonsAndProgress {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

#albumCover {
    margin: 24px 12px 24px 24px;
    width: 64px;
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
}

#songInfo {
    display: flex;
    align-items: center;
}

#songInfoText {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

#songArtist {
    font-size: 0.8rem;
}

#volumeBar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin: 32px;
}

#volumeSlider {
    width: 80px;
    height: 6px;
}


#musicProgressBar {
    width: 400px;
    height: 9px;
    margin: 0 15px 0 15px;
}

.slider {
    background: #272727;
    opacity: 1;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 50px;
    border: none;
}

.slider::-webkit-progress-value {
    background-color: rgb(168, 249, 255);
    border-radius: 500px;
    height: inherit;
}

.slider::-moz-range-progress {
    background-color: rgb(168, 249, 255);
    border-radius: 500px;
    height: inherit;
}

.slider::-webkit-slider-thumb {
    aspect-ratio: 1/1;
    height: calc(inherit*2);
    width: fit-content;
    border-radius: 100%;
    background: #a5a8ba;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    aspect-ratio: 1/1;
    height: calc(inherit*2);
    width: fit-content;
    border-radius: 100%;
    background: #a5a8ba;
    cursor: pointer;
}

#trackStartLength {
    display: flex;
    justify-content: center;
    align-items: center;
}

label {
    font-size: 0.8rem;
    font-weight: 500;
    display: inline-block;
    -webkit-user-select: none;
    user-select: none;
    -ms-user-select: none;
}
</style>
