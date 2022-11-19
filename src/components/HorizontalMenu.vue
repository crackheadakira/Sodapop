<script setup>
import { onMounted } from 'vue';
import { useHorizontalMenuStore } from '../stores/horizontalmenu';

let horizontalMenuStore = useHorizontalMenuStore();

function setTarget(target) {
    if (horizontalMenuStore.activeID.length > 0) {
        document.getElementById(horizontalMenuStore.activeID).dataset.active = "false";
    }
    horizontalMenuStore.setActiveID(target.id)
    target.dataset.active = "true";
}

function changeActiveStateLook(type) {
    let enabledMenu = document.getElementById(horizontalMenuStore.activeID)
    if (type === "mouseover") {
        enabledMenu.dataset.active = "semiactive";
    } else if (type === "mouseout") {
        enabledMenu.dataset.active = "true";
    }
}

onMounted(() => {
    document.getElementById(horizontalMenuStore.activeID).dataset.active = "true";
});

</script>

<template>
    <div id="main">
        <div id="menuBar">
            <div @click="setTarget($event.target)" @mouseover="changeActiveStateLook('mouseover')"
                @mouseout="changeActiveStateLook('mouseout')" id="songs" data-active="false">
                Songs
            </div>
            <div @click="setTarget($event.target)" @mouseover="changeActiveStateLook('mouseover')" id="songInfo"
                @mouseout="changeActiveStateLook('mouseout')" data-active="false">Song Info</div>
            <div @click="setTarget($event.target)" @mouseover="changeActiveStateLook('mouseover')"
                @mouseout="changeActiveStateLook('mouseout')" id="moreByArtist" data-active="false">More by Joji</div>
        </div>
    </div>
</template>

<style scoped>
#main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

#menuBar {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #282828;
    font-weight: 600;
    font-size: 0.9rem;
    width: fit-content;
    padding: 2px;
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
