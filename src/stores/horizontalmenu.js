import { defineStore } from 'pinia';

export const useHorizontalMenuStore = defineStore({
    id: 'horizontalmenu',
    state: () => ({
        activeID: "songs",
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