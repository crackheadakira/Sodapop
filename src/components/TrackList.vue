<script setup>
defineProps({
    TrackList: {
        type: Array,
        required: true,
    },
})

</script>

<template>
    <div v-if="TrackList.length > 0">
        <ol id="tracks">
            <li v-for="Track in TrackList">
                {{ Track.trackName }}
                <span>{{ Track.length }}</span>
            </li>
        </ol>
    </div>
</template>

<style scoped>
#tracks {
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
}

ol {
    list-style: none;
    counter-reset: item;
    backface-visibility: hidden;
    margin-bottom: 0px;
}

li {
    counter-increment: item;
    width: 98%;
    border-radius: 6px;
    margin: 1px;
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 10px;
    transition: 150ms ease;
    border: 2px solid #404040;
    border-color: transparent;
    font-weight: 500;
    user-select: none;
}

li span {
    float: right;
}

li:hover {
    border: 2px solid #404040;
    background-color: #282828;
    cursor: pointer;
}

li:before {
    margin-right: 6px;
    content: counter(item);
    width: 1.2em;
    font-size: 0.9rem;
    font-weight: 400;
    text-align: center;
    display: inline-block;
}
</style>
