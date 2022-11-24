<script setup>
import SideMenuBar from '../components/SideMenuBar.vue';
import SettingOptions from '../components/SettingOptions.vue';
const menuItems = ["General", "Music", "Appearance", "About", "Setting to test wrapping because this has an extended length"];
const selectedMenuItem = $ref("General");
function itemClicked(item) {
    selectedMenuItem = item;
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