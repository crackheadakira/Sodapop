<script setup>
import { onMounted } from 'vue';
import { useTopMenuBar } from '../stores/topmenubar';

let topMenuStore = useTopMenuBar();

function setTarget(target) {
    if (topMenuStore.activeID.length > 0) {
        document.getElementById(topMenuStore.activeID).dataset.active = "false";
    }
    topMenuStore.setActiveID(target.id)
    target.dataset.active = "true";
}

function changeActiveStateLook(type) {
    let enabledMenu = document.getElementById(topMenuStore.activeID)
    if (type === "mouseover") {
        enabledMenu.dataset.active = "semiactive";
    } else if (type === "mouseout") {
        enabledMenu.dataset.active = "true";
    }
}

onMounted(() => {
    document.getElementById(topMenuStore.activeID).dataset.active = "true";
});

</script>

<template>
    <div id="homeMenuBar">
        <i class="fa-solid fa-arrow-left" @click="$router.back()"></i>
        <div id="menuBar">
            <div @click="setTarget($event.target)" @mouseover="changeActiveStateLook('mouseover')"
                @mouseout="changeActiveStateLook('mouseout')" id="home" data-active="false">
                Home
            </div>
            <div @click="setTarget($event.target)" @mouseover="changeActiveStateLook('mouseover')" id="albums"
                @mouseout="changeActiveStateLook('mouseout')" data-active="false">Albums</div>
            <div @click="setTarget($event.target)" @mouseover="changeActiveStateLook('mouseover')"
                @mouseout="changeActiveStateLook('mouseout')" id="artists" data-active="false">Artists</div>
        </div>
        <i class="fa-solid fa-arrow-right" @click="$router.forward()"></i>
    </div>
</template>

<style scoped>
i:hover {
    filter: brightness(85%);
}

#homeMenuBar {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #171717;
    border-bottom: 1px solid #272727;
}

#menuBar {
    height: 40px;
    display: flex;
    justify-content: center;
    background-color: #282828;
    font-weight: 600;
    font-size: 0.9rem;
    width: fit-content;
    padding: 2px;
    margin: 0 20px 0 20px;
    border-radius: 500px;
}

#menuBar div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px 5px 10px;
    transition: 250ms ease;
    height: 100%;
    border-radius: 500px;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    -ms-user-select: none;
}

#menuBar div:hover {
    background: white;
    color: #282828;
    border-radius: 500px;
}

#menuBar div[data-active="true"] {
    background: white;
    color: #282828;
    border-radius: 500px;
}

#menuBar div[data-active="semiactive"] {
    background: #222222;
    color: white;
    border-radius: 500px;
}
</style>
