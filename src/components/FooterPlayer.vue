<script setup>
import { onMounted, watch } from 'vue';
import { usePlayerStore } from '../stores/player';
import { convertTime } from '../composables/convertTime.js';

const player_store = usePlayerStore();

const audioTag = $ref(null);
const trackInput = $ref(null);
const volumeInput = $ref(null);
let audioSrc = $ref(null);
let currentTrack = $ref(player_store.currentTrack);
let audioVolume = $ref(player_store.currentVolume);
let trackDisplayTime = $ref(convertTime(player_store.currentTime));
let trackEndTime = $ref(convertTime(player_store.currentTrackLength));
let playStateIconState = $ref(player_store.isPlaying ? "fa-pause" : "fa-play");

watch($$(audioTag), (newAudioTag) => {
    newAudioTag.addEventListener('timeupdate', () => {
        player_store.updateTime(newAudioTag.currentTime);
        trackDisplayTime = convertTime(newAudioTag.currentTime);
    });
    newAudioTag.addEventListener('ended', () => {
        stopSong();
    });
    newAudioTag.addEventListener('seek', () => {
        player_store.updateTime(newAudioTag.currentTime);
        trackDisplayTime = convertTime(newAudioTag.currentTime);
    });
});

watch($$(trackInput), (newTrackInput) => {
    newTrackInput.addEventListener('input', () => {
        player_store.updateTime(newTrackInput.value);
        updateTime(newTrackInput.value, true);
    });
});

watch($$(volumeInput), (volumeInput) => {
    volumeInput.addEventListener('input', () => {
        updateVolume(volumeInput.value);
    });
});

player_store.$subscribe((mutation, state) => {
    let newTrack = state.currentTrack;
    if (newTrack !== currentTrack) {
        currentTrack = newTrack;
        updateLength(newTrack.duration);
    }
});

function playUpdateIcon() {
    player_store.togglePlay();
    playStateIconState = player_store.isPlaying ? "fa-pause" : "fa-play";
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
    if (seek) audioTag.fastSeek(time);
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
            <img :src="currentTrack.cover" id="albumCover">
            <div id="songInfoText">
                <p class="clickableItemInfo" id="songName">{{ currentTrack.title }}</p>
                <p class="clickableItemInfo" id="songArtist">{{ currentTrack.artist }}</p>
            </div>
        </div>
        <div id="buttonsAndProgress">
            <div id="track">
                <label id="trackStartLength">{{ trackDisplayTime }}</label>
                <input ref="trackInput" type="range" :max="player_store.currentTrackLength"
                    :value=player_store.currentTime class="slider" id="musicProgressBar"><label id="trackEndLength">{{
                    trackEndTime
                    }}</label>
            </div>
            <div id="playerButtons">
                <i @click="player_store.toggleShuffle()" class="fa-solid fa-shuffle fa-sm footerPlayerButton"
                    id="shuffleButton" :class="{ activePlayerButton: player_store.isShuffling }"></i>
                <i class="fa-solid fa-backward fa-sm footerPlayerButton"></i>
                <i @click="playUpdateIcon()" :class="[playStateIconState]" class="fa-solid footerPlayerButton fa-fw"
                    id="mainPlayButton"></i>
                <i class="fa-solid fa-forward fa-sm footerPlayerButton"></i>
                <i @click="player_store.toggleRepeat()" class="fa-solid fa-repeat fa-sm footerPlayerButton"
                    :class="{ activePlayerButton: player_store.isRepeating }" id="repeatButton"></i>
            </div>
            <audio controls id="HTMLAudioPlayer" ref="audioTag">
                <source :src="audioSrc">
            </audio>
        </div>
        <div id="volumeBar">
            <i class="fa-solid fa-volume-low"></i>
            <input type="range" min="1" max="100" :value=audioVolume ref="volumeInput" class="slider" id="volumeSlider">
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

#trackEndLength {
    width: 24px;
}

label {
    font-size: 0.8rem;
    font-weight: 500;
    display: inline-block;
    -webkit-user-select: none;
    user-select: none;
    -ms-user-select: none;
    width: 24px;
}

#track{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 505px;
}
</style>
