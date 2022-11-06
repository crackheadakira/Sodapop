import { defineStore } from 'pinia';

export const usePlayerStore = defineStore({
    id: 'player',
    state: () => ({
        isPlaying: false,
    }),
    actions: {
        togglePlay() {
            this.isPlaying = !this.isPlaying;
        },
    },
});