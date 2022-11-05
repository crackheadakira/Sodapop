<script setup>

</script>

<template>
    <div id="main">
        <div id="menuBar">
            <div id="trackList">Track List</div>
            <div id="trackInfo">Track Info</div>
            <div id="lyrics">Lyrics</div>
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
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #282828;
    font-weight: 500;
    font-size: 0.9rem;
    border-radius: 500px;
    width: fit-content;
    padding: 2px;
}

#menuBar div {
    padding-left: 10px;
    padding-right: 10px;
    transition: 250ms ease;
}

#menuBar div:hover {
    background-color: white;
    color: #282828;
    border-radius: 500px;
    cursor: pointer;
}
</style>
