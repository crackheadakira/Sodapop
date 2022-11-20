import { defineStore } from 'pinia';

export const usePlayerStore = defineStore({
    id: 'player',
    state: () => ({
        isPlaying: false,
        isShuffling: false,
        isRepeating: false,
        currentTime: 0,
        currentTrackLength: 0,
        currentVolume: 25,
        currentTrack: { cover: '', title: '', artist: '' },
    }),
    actions: {
        replaceTrack(track) {
            this.currentTrack = track;
        },
        toggleShuffle() {
            this.isShuffling = !this.isShuffling;
        },
        toggleRepeat() {
            this.isRepeating = !this.isRepeating;
        },
        togglePlay() {
            this.isPlaying = !this.isPlaying;
        },
        updateTime(time) {
            this.currentTime = time;
        },
        updateTrackLength(length) {
            this.currentTrackLength = length;
        },
        updateSoundVolume(volume) {
            this.currentVolume = volume;
        },
    },
    persist: {
        enabled: true,
        strategies: [
            { storage: sessionStorage, paths: ['isShuffling', 'isRepeating', 'currentTime', 'currentTrackLength', 'currentVolume', 'currentTrack'] },
        ],
    }
});