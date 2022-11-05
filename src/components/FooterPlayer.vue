<script setup>

</script>

<template>
    <div id="mainPlayer">
        <img src="https://discussions.apple.com/content/attachment/592590040" id="albumCover">
        <div id="buttonsAndProgress">
            <progress min="0" max="100" value="53" id="musicProgressBar"></progress>
            <div id="playerButtons">
                <font-awesome-icon icon="fa-solid fa-shuffle" size="sm" color="#505050" class="footerPlayerButton" />
                <font-awesome-icon icon="fa-solid fa-backward" size="sm" color="#505050" class="footerPlayerButton" />
                <font-awesome-icon icon="fa-solid fa-play" size="lg" class="footerPlayerButton" />
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 99px;
    width: 100%;
    background-color: #171717;
    border-top: 1px solid #272727;
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
    margin: 24px;
    width: 64px;
    border-radius: 5px;
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
    height: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 50px;
}

.slider:hover {
    opacity: 1;
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
}
</style>
