/** Seperates the metadata into an array of objects for each artist for easier handling.
 * @param {object} metadata The object containing all the metadata.
 * @returns {array}
 */
export async function separateMetadata(metadata) {
    let totalArtists = [...new Map(metadata.map(track => [track.artist, track])).values()];
    let finalResult = [];

    for (let i = 0, n = totalArtists.length; i < n; i++) {
        let matchingAlbums = metadata.filter(res => (res.artist === totalArtists[i].artist));
        let totalAlbums = [...new Map(matchingAlbums.map(track => [track.album, track])).values()];
        let artistResult = [];
        for (let j = 0; j < totalAlbums.length; j++) {
            let matchingTracks = matchingAlbums.filter(res => (res.album === totalAlbums[j].album));
            artistResult.push({
                artist: totalArtists[i].artist,
                albumName: totalAlbums[j].album,
                albumCover: totalAlbums[j].cover,
                tracks: matchingTracks,
                genre: totalAlbums[j].genre,
                year: totalAlbums[j].year,
            })
        }
        finalResult.push({ artist: totalArtists[i].artist, albums: artistResult });
    }
    return finalResult;
}