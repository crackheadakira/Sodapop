<script setup>

</script>

<template>
    <div id="main">
        <div id="menuBar">
            <div id="songs" data-active="true">Songs</div>
            <div id="songInfo" data-active="false">Song Info</div>
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
}

#menuBar div:hover {
    background-color: white;
    color: #282828;
    cursor: pointer;
}

#menuBar div[data-active="true"] {
    background-color: white;
    color: #282828;
}
</style>
