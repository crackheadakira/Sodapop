import { defineStore } from 'pinia';

export const useRecentlyPlayedStore = defineStore({
    id: 'recentlyplayed',
    state: () => ({
        recentTracks: [],
        recentAlbums: [],
        recentArtists: [],
    }),
    actions: {
        addTrack(track) {
            if (this.recentTracks.length < 30) {
                this.recentTracks.unshift(track);
            } else if (this.recentTracks.length >= 30) {
                this.recentTracks.shift();
                this.recentTracks.unshift(track);
            }
        },
        addAlbum(album) {
            let doesIncludeAlbum = this.recentAlbums.filter(albumArray => albumArray.album === album.album).length > 0;
            let albumIndex = this.recentAlbums.findIndex(albumArray => albumArray.album === album.album);

            if (!doesIncludeAlbum && this.recentAlbums.length < 30) {
                this.recentAlbums.unshift(album);

            } else if (this.recentAlbums.length >= 30 && !doesIncludeAlbum) {
                this.recentAlbums.shift();
                this.recentAlbums.unshift(album);

            } else if (this.recentAlbums.length >= 30 && doesIncludeAlbum) {
                this.recentAlbums.splice(albumIndex, 1);
                this.recentAlbums.unshift(album);

            } else if (doesIncludeAlbum && this.recentAlbums.length < 30) {
                this.recentAlbums.splice(albumIndex, 1);
                this.recentAlbums.unshift(album);
            }
        },
        addArtist(artist) {
            let doesIncludeAlbum = this.recentArtists.filter(artistArray => artistArray.artist === artist.artist).length > 0;
            let albumIndex = this.recentArtists.findIndex(artistArray => artistArray.artist === artist.artist);

            if (!doesIncludeAlbum && this.recentArtists.length < 30) {
                this.recentArtists.unshift(artist);

            } else if (this.recentArtists.length >= 30 && !doesIncludeAlbum) {
                this.recentArtists.shift();
                this.recentArtists.unshift(artist);

            } else if (this.recentArtists.length >= 30 && doesIncludeAlbum) {
                this.recentArtists.splice(albumIndex, 1);
                this.recentArtists.unshift(artist);

            } else if (doesIncludeAlbum && this.recentArtists.length < 30) {
                this.recentArtists.splice(albumIndex, 1);
                this.recentArtists.unshift(artist);
            }
        }
    },
    persist: {
        enabled: true,
        strategies: [
            { storage: sessionStorage, paths: ['recentTracks', 'recentAlbums', 'recentArtists'] },
        ],
    }
});