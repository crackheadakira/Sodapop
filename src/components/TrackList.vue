<script setup>
import { track } from '@vue/reactivity';

defineProps({
    TrackList: {
        type: Array,
        required: true,
    },
})

</script>

<template>
    <div id="main" :v-if="TrackList">
        <ol id="tracks">
            <li v-for="Track in TrackList">
                {{ Track }}
            </li>
        </ol>
    </div>
</template>

<style scoped>
#main {
    width: 100%;
    height: 100%;
}

#tracks {
    max-height: 500px;
    width: 90vw;
    overflow-y: scroll;
    overflow-x: hidden;
}

ol {
    list-style: none;
    counter-reset: item;
}

li {
    counter-increment: item;
    width: 97%;
    border-radius: 6px;
    margin: 1px;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 10px;
    transition: 150ms ease;
    border: 0px solid #404040;
    will-change: transform;
    font-weight: 600;
}

li:hover {
    border: 2px solid #404040;
    background-color: #282828;
    transform: translateY(-3px);
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
