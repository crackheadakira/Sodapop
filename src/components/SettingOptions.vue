<script setup>
import { useSettings } from '../stores/settings';
const props = defineProps({
    menuType: {
        type: String,
        required: true
    },
});

const settingsStore = useSettings();
const settingOptions = $ref(settingsStore.items);

</script>

<template>
    <div>
        <h1>{{ menuType }}</h1>
        <ul>
            <li>
                <div class="settingTitle">Music Folder</div>
                <div class="settingDescription">Select the path to your Music folder</div>
                <div class="settingOptions">
                    <button><i class="fa-regular fa-folder-open"></i></button>
                    <div class="path">{{ settingOptions.musicFolder }}</div>
                </div>
            </li>
            <li>
                <div class="settingTitle">Resave album covers</div>
                <div class="settingDescription">Let Sodapop resave your album covers for faster loading times. ( They
                    will be compressed for smaller file sizes )</div>
                <div class="settingOptions">
                    <input type="checkbox" id="resaveFiles"
                        @change="settingsStore.setItem('resave', $event.target.checked)"
                        v-model="settingOptions.resave">
                    <label></label>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
body div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
}

button {
    width: 60px;
    height: 30px;
    background-color: #171717;
    border: 1px solid #272727;
    cursor: pointer;
}

button:hover i {
    filter: brightness(85%);
}

.settingOptions {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.settingTitle {
    font-size: 1.1rem;
    font-weight: 500;
}

.settingDescription {
    font-size: 0.9rem;
    font-weight: 400;
    color: #808080;
    margin-bottom: 5px;
}

.path {
    width: 600px;
    height: 30px;
    background-color: #171717;
    border: 1px solid #272727;
    overflow: hidden;
    margin-left: -1px;
    padding-left: 10px;
    padding-right: 10px;
}

h1 {
    border-radius: 1px;
    width: fit-content;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    margin-bottom: 20px;
    max-width: 660px;
}

input[type="checkbox"] {
    opacity: 0;
    height: 20px;
    width: 40px;
    position: absolute;
    cursor: pointer;
}

input[type="checkbox"]+label {
    height: 20px;
    width: 40px;
    border-radius: 60px;
    background-color: #171717;
    border: 2px solid #272727;
    transition: 300ms ease;
}

input[type="checkbox"]:checked+label {
    background-color: #3b82f6;
    border: 2px solid #3b82f6;
}

input[type="checkbox"]+label::before {
    pointer-events: none;
    content: "";
    position: absolute;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: white;
    left: 0;
    top: -2px;
    transition: 200ms ease;
}

input[type="checkbox"]:checked+label::before {
    left: 16px;
}
</style>