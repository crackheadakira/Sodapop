<script setup>
import { ref, onMounted } from 'vue';
import { usePlayerStore } from '../stores/player';

const player_store = usePlayerStore();

const playStateIcon = ref(player_store.isPlaying ? "fa-pause" : "fa-play");
function playUpdateIcon() {
    player_store.togglePlay();
    playStateIcon.value = player_store.isPlaying ? "fa-pause" : "fa-play";
}

function shuffleUpdateIcon() {

}

function repeatUpdateIcon() {

}

onMounted(() => {

});
</script>

<template>
    <div id="mainPlayer">
        <div id="songInfo">
            <img src="https://lastfm.freetls.fastly.net/i/u/770x0/6f2784172913db6982b2f6de18b837f6.jpg#6f2784172913db6982b2f6de18b837f6"
                id="albumCover">
            <div id="songInfoText">
                <p id="songName">BLAHBLAHBLAH DEMO</p>
                <p id="songArtist">Joji</p>
            </div>
        </div>
        <div id="buttonsAndProgress">
            <label id="trackStartLength">1:36<progress max="142" value="96" id="musicProgressBar"></progress><label
                    id="trackEndLength">2:22</label> </label>
            <div id="playerButtons">
                <i @click="player_store.toggleShuffle()"
                    class="fa-solid fa-shuffle fa-sm footerPlayerButton activePlayerButton" id="shuffleButton"></i>
                <i class="fa-solid fa-backward fa-sm footerPlayerButton"></i>
                <i @click="playUpdateIcon()" :class="[playStateIcon]" class="fa-solid footerPlayerButton fa-fw"
                    id="mainPlayButton"></i>
                <i class="fa-solid fa-forward fa-sm footerPlayerButton"></i>
                <i @click="player_store.toggleRepeat()"
                    class="fa-solid fa-repeat fa-sm footerPlayerButton activePlayerButton" id="repeatButton"></i>
            </div>
        </div>
        <div id="volumeBar">
            <i class="fa-solid fa-volume-low"></i>
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
        </div>
    </div>
</template>

<style scoped>
#mainPlayer {
    position: fixed;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    justify-content: center;
    align-items: center;
    height: fit-content;
    width: 100%;
    background-color: #171717;
    border-top: 1px solid #272727;
    bottom: 0;
}

#playerButtons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.footerPlayerButton {
    user-select: none;
}

.activePlayerButton {
    color: white;
    text-emphasis-style: dot;
    text-emphasis-position: under left;
    -webkit-text-emphasis-style: dot;
    -webkit-text-emphasis-position: under;
}

.disablePlayerButton {
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

#songInfoText p {
    margin: 0;
    width: fit-content;
    max-width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    cursor: pointer;
}

#songInfoText p:hover {
    text-decoration: underline;
    transform: scale(1.01);
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

.slider {
    width: 80px;
    height: 6px;
    background: #d3d3d3;
    outline: none;
    opacity: 1;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 50px;
}

.slider::-webkit-slider-thumb {
    appearance: none;
    width: 13px;
    height: 13px;
    background: #a5a8ba;
    border-radius: 50%;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #a5a8ba;
    cursor: pointer;
}

#musicProgressBar {
    width: 400px;
    height: 5px;
    margin: 0 15px 0 15px;
    background: #272727;
    border-radius: 500px;
    border: none;
}

#musicProgressBar::-webkit-progress-bar {
    background-color: #272727;
    border-radius: 500px;
}

progress::-webkit-progress-value {
    background-color: rgb(168, 249, 255);
    ;
    border-radius: 500px;
}

#musicProgressBar::-moz-progress-bar {
    background-color: rgb(168, 249, 255);
    border-radius: 500px;
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
    user-select: none;
}
</style>
