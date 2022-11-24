import { defineStore } from 'pinia';

export const useSettings = defineStore({
    id: 'settings',
    state: () => ({
        items: {
            musicFolder: "",
            resave: true,
            resaveQuality: 0.8,
            resaveSize: 300,
            theme: "dark",
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