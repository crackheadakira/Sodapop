import { defineStore } from 'pinia';

export const usePlayerStore = defineStore({
    id: 'player',
    state: () => ({
        isPlaying: false,
        isShuffling: false,
        isRepeating: false,
    }),
    actions: {
        toggleShuffle() {
            this.isShuffling = !this.isShuffling;
        },
        toggleRepeat() {
            this.isRepeating = !this.isRepeating;
        },
        togglePlay() {
            this.isPlaying = !this.isPlaying;
        },
    },
});