import { defineStore } from 'pinia';

export const useSettings = defineStore({
    id: 'settings',
    state: () => ({
        items: {
            musicFolder: "/run/media/akira/2 TB/Piracy/music/",
            resave: true,
            resaveQuality: 0.8,
            resaveSize: 300,
            darkTheme: true,
        },
        tab: "General",
    }),
    actions: {
        setItem(name, data) {
            this.items[name] = data;
        }
    },
    persist: {
        enabled: true
    }
});