/** Seperates the metadata into an array of objects for each artist for easier handling.
 * @param {object} metadata The object containing all the metadata.
 * @returns {array}
 */
export function separateMetadata(metadata) {
    let alteredData = metadata
    let totalArtists = [...new Map(alteredData.map(track => [track.artist, track])).values()];
    let finalResult = [];

    for (let i = 0, n = totalArtists.length; i < n; i++) {
        let matchingAlbums = alteredData.filter(res => (res.artist === totalArtists[i].artist));
        let totalAlbums = [...new Map(matchingAlbums.map(track => [track.album, track])).values()];
        let artistResult = [];
        for (let j = 0; j < totalAlbums.length; j++) {
            let cover;
            if (totalAlbums[j]?.coverPath) {
                cover = totalAlbums[0].coverPath;
            } else {
                cover = totalAlbums[0].cover;
            }
            let matchingTracks = matchingAlbums.filter(res => (res.album === totalAlbums[j].album));
            for (let k = 0; k < matchingTracks.length; k++) {
                delete matchingTracks[k].cover;
                delete matchingTracks[k].albumCover;
            }
            artistResult.push({
                artist: totalArtists[i].artist,
                albumName: totalAlbums[j].album,
                albumCover: cover,
                tracks: matchingTracks,
                genre: totalAlbums[j].genre,
                year: totalAlbums[j].year,
            })
        }
        finalResult.push({ artist: totalArtists[i].artist, albums: artistResult });
    }
    return finalResult;
}