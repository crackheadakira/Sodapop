<script setup>
import { onMounted } from 'vue';
const itemMaxWidth = $ref("110px");

const props = defineProps({
    menuItems: {
        type: Array,
        required: true
    },
})

onMounted(() => {
    let sideMenu = document.getElementById('sideMenu');
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.contentRect.width >= 170) {
                itemMaxWidth = (entry.contentRect.width - 55) + "px";
            } else {
                itemMaxWidth = "110px";
            }
        }
    });
    resizeObserver.observe(sideMenu);
})
</script>
<template>
    <div id="sideMenu">
        <h2>Settings</h2>
        <ul>
            <li v-for="item of menuItems" @click="$emit('itemClicked', item)">{{ item }}</li>
        </ul>
    </div>
</template>

<style scoped>
#sideMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 200px;
    max-width: 300px;
    height: 100%;
    background-color: #171717;
    border-right: 1px solid #272727;
    resize: horizontal;
    overflow: hidden;
    overflow-y: scroll;
    padding-bottom: 15px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: v-bind(itemMaxWidth);
}

li:hover {
    filter: brightness(85%);
}
</style>