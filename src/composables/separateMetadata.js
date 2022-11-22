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
                albumCover: newAlbumCover,
                tracks: matchingTracks,
                genre: totalAlbums[j].genre,
                year: totalAlbums[j].year,
            })
        }
        finalResult.push({ artist: totalArtists[i].artist, albums: artistResult });
    }
    return finalResult;
}

async function optimizeImageForSaving(url) {
    try {
        const data = await fetch(url);
        const blob = await data.blob();
        const blobImg = new Image();
        const result = new Promise((resolve) => {
            blobImg.src = URL.createObjectURL(blob);
            blobImg.onload = async function () {
                const canvas = document.createElement('canvas');
                canvas.width = 500;
                canvas.height = 500;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(blobImg, 0, 0, 500, 500);
                const dataURL = canvas.toDataURL('image/jpeg', 0.5);
                let base64Blob = await fetch(dataURL).then(r => r.blob());
                resolve(await base64Blob.arrayBuffer());
            };
        });
        return result;
    } catch (err) {
        return null;
    }
}