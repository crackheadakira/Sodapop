import { defineStore } from 'pinia';

export const useTopMenuBar = defineStore({
    id: 'menubar',
    state: () => ({
        activeID: "home",
    }),
    actions: {
        setActiveID(activeTarget) {
            this.activeID = activeTarget;
        },
    },
    persist: {
        enabled: true
    }
});