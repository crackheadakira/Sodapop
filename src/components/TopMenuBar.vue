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
        <div id="historyArrows">
            <i class="fa-solid fa-arrow-left fa-lg" @click="$router.back()"></i>
            <i class="fa-solid fa-arrow-right fa-lg" @click="$router.forward()"></i>
        </div>
        <div id="menuBar">
            <router-link tag="div" to="/" @click="setTarget($event.target)"
                @mouseover="changeActiveStateLook('mouseover')" @mouseout="changeActiveStateLook('mouseout')" id="home"
                data-active="false">
                Home
            </router-link>
            <router-link tag="div" to="/album/aa" @click="setTarget($event.target)"
                @mouseover="changeActiveStateLook('mouseover')" id="albums"
                @mouseout="changeActiveStateLook('mouseout')" data-active="false">Albums</router-link>
            <router-link tag="div" to="/" @click="setTarget($event.target)"
                @mouseover="changeActiveStateLook('mouseover')" @mouseout="changeActiveStateLook('mouseout')"
                id="artists" data-active="false">Artists</router-link>
        </div>
        <router-link tag="div" id="settings" to="/settings"><i class="fa-solid fa-gear fa-lg"></i></router-link>
    </div>
</template>

<style scoped>
a {
    color: white;
}

i:hover {
    filter: brightness(85%);
    cursor: pointer;
}

#settings {
    position: absolute;
    right: 25px;
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

#historyArrows {
    position: absolute;
    left: 25px;
}

#historyArrows i {
    margin: 0 10px;
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

#menuBar a {
    text-decoration: none;
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

#menuBar a:hover {
    background: white;
    color: #282828;
    border-radius: 500px;
}

#menuBar a[data-active="true"] {
    background: white;
    color: #282828;
    border-radius: 500px;
}

#menuBar a[data-active="semiactive"] {
    background: #222222;
    color: white;
    border-radius: 500px;
}
</style>
