<script setup>
import SettingOptions from '../components/SettingOptions.vue';
import SideMenuBar from '../components/SideMenuBar.vue';
import { useSettings } from '../stores/settings';

const settingsStore = useSettings();
const menuItems = ["General", "Music", "About"];
const selectedMenuItem = $ref(settingsStore.tab);

function itemClicked(item) {
    selectedMenuItem = item;
    settingsStore.tab = item;
}
</script>

<template>
    <div id="settingsBody">
        <SideMenuBar @itemClicked="itemClicked" :menuItems="menuItems" />
        <SettingOptions :menuType="selectedMenuItem" />
    </div>
</template>

<style scoped>
#settingsBody {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>