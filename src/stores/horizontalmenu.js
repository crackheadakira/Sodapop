import { defineStore } from 'pinia';

export const useHorizontalMenuStore = defineStore({
    id: 'horizontalmenu',
    state: () => ({
        activeID: "TrackList",
        album: { album: "", artist: "", cover: "", artistPath: "" },
    }),
    actions: {
        setActiveID(activeTarget) {
            this.activeID = activeTarget;
        },
        setAlbum(album) {
            this.album = album;
        },
    },
    persist: {
        enabled: true
    }
});