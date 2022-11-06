<script setup>
import { computed } from 'vue';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

function getPlayState() {
    return localStorage.getItem('playState');
}

function setPlayState(value) {
    localStorage.setItem('playState', value);
}

function changePlayState() {
    if (getPlayState() === 'play') {
        setPlayState('pause');
    } else {
        setPlayState('play');
    }
}

const playStateIcon = computed(() => {
    console.log(getPlayState());
    if (getPlayState() === 'play' || getPlayState() == null) {
        setPlayState('play');
        return faPlay;
    } else {
        return faPause;
    }
})

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
            <label id="trackStartLength">1:36<progress max="100" value="67" id="musicProgressBar"></progress><label
                    id="trackEndLength">2:22</label> </label>
            <div id="playerButtons">
                <font-awesome-icon icon="fa-solid fa-shuffle" size="sm" color="#505050" class="footerPlayerButton" />
                <font-awesome-icon icon="fa-solid fa-backward" size="sm" color="#505050" class="footerPlayerButton" />
                <font-awesome-icon @click="changePlayState" :icon="playStateIcon" size="lg" class="footerPlayerButton"
                    id="mainPlay" />
                <font-awesome-icon icon="fa-solid fa-forward" size="sm" color="#505050" class="footerPlayerButton" />
                <font-awesome-icon icon="fa-solid fa-repeat" size="sm" color="#505050" class="footerPlayerButton" />
            </div>
        </div>
        <div id="volumeBar">
            <font-awesome-icon icon="fa-solid fa-volume-low" />
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
        </div>
    </div>
</template>

<style scoped>
#mainPlayer {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 99px;
    width: 100%;
    background-color: #171717;
    border-top: 1px solid #272727;
    bottom: 0;
    left: 0;
}

#playerButtons {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 20px;
}

#buttonsAndProgress {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.footerPlayerButton:hover {
    transform: scale(1.1);
}

.footerPlayerButton:active {
    transform: scale(1);
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
    justify-content: center;
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
    width: 450px;
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
