import { fs } from '@empathize/framework';

/** Fetches one cover per album and then gives it to the rest of the songs in the album
 * @param {object} data The object containing all the metadata.
 * @returns {array} Returns an array where all the songs have their respective cover.
 * @async
 */
export async function uniqueAlbumCover(data, toBlob = true) {
    let fixedData = [];
    // Gets one track per album
    let unique = [...new Map(data.map(song => [song.album, song])).values()];

    // Then fetches one album cover per album
    for (let i = 0; i < unique.length; i++) {
        // Finds the album the track should be in
        let matching = data.filter(res => (res.album == unique[i].album) && (res.artist == unique[i].artist));
        // Checks if the album has a cover image in the folder
        if (matching[0]?.coverPath) {
            matching[0].cover = await makeAlbumImage(matching[0], true, toBlob);
        } else {
            matching[0].cover = await makeAlbumImage(matching[0], false, toBlob);
        }
        for (let j = 0; j < matching.length; j++) {
            matching[j].cover = matching[0].cover;
        }
        fixedData.push(matching);
    }
    return fixedData.flat();
}

async function makeAlbumImage(track, artExists, toBlob) {
    if (artExists) {
        let albumImage = new Uint8Array(await fs.read(track.coverPath, true));
        let blob = new Blob([albumImage], { type: "image/jpeg" });
        if (toBlob) {
            return URL.createObjectURL(blob);
        } else {
            return `data:image/jpeg;base64,${await blobToBase64(blob)}`;
        }
    } else if (!artExists) {
        return `data:image/jpeg;base64,${track.albumCover}`
    }
}

function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}