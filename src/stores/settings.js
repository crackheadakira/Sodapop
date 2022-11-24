import { defineStore } from 'pinia';

export const useSettings = defineStore({
    id: 'settings',
    state: () => ({
        items: {
            musicFolder: "/run/media/akira/2 TB/Piracy/music/",
            resave: true,
        }
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