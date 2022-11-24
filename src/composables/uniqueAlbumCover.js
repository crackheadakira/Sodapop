import { fs, path } from '@empathize/framework';

/** Fetches one cover per album and then gives it to the rest of the songs in the album
 * @param {object} data The object containing all the metadata.
 * @returns {array} Returns an array where all the songs have their respective cover.
 * @async
 */
export async function uniqueAlbumCover(data) {
    await checkArtistsFolder();
    let fixedData = [];
    // Gets one track per album
    let unique = [...new Map(data.map(song => [song.album, song])).values()];

    // Then fetches one album cover per album
    for (let i = 0; i < unique.length; i++) {
        // Finds the album the track should be in
        let matching = data.filter(res => (res.album == unique[i].album) && (res.artist == unique[i].artist));
        // Checks if the album has a cover image in the folder
        if (matching[0]?.coverPath) {
            matching[0].cover = await makeAlbumImage(matching[0], true);
        } else {
            matching[0].cover = await makeAlbumImage(matching[0], false);
        }
        for (let j = 0; j < matching.length; j++) {
            matching[j].cover = matching[0].cover;
        }
        fixedData.push(matching);
    }
    return fixedData.flat();
}

async function makeAlbumImage(track, coverExists) {
    let newAlbumCover = path.join('artists', 'covers', `${track.artist.replaceAll(/([^A-Za-z0-9\s]+)/gm, '')} - ${track.album.replaceAll(/([^A-Za-z0-9\s]+)/gm, '')}.jpg`);
    let fileExists = await fs.exists(newAlbumCover);
    if (coverExists) {
        if (!fileExists) {
            let albumImage = new Uint8Array(await fs.read(track.coverPath, true));
            let blob = new Blob([albumImage], { type: "image/jpeg" });
            optimizeImageForSaving(blob).then(async (response) => {
                await Neutralino.filesystem.writeBinaryFile(newAlbumCover, await response.arrayBuffer());
            }).catch(err => console.log(err));
        }
        return "/" + newAlbumCover;
    } else if (!coverExists) {
        if (!fileExists) {
            let base64Blob = await fetch(`data:image/jpeg;base64,${track.albumCover}`).then(r => r.blob());
            optimizeImageForSaving(base64Blob).then(async (response) => {
                await Neutralino.filesystem.writeBinaryFile(newAlbumCover, await response.arrayBuffer());
            }).catch(err => console.log(err));
        }
        return "/" + newAlbumCover;
    }
}

function optimizeImageForSaving(blob) {
    try {
        const blobImg = new Image();
        const result = new Promise((resolve) => {
            blobImg.src = URL.createObjectURL(blob);
            blobImg.onload = async function () {
                const canvas = document.createElement('canvas');
                const ratio = 300 / blobImg.height;
                canvas.width = blobImg.width * ratio;
                canvas.height = blobImg.height * ratio;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(blobImg, 0, 0, 300, 300);
                const dataURL = canvas.toDataURL('image/jpeg', 0.8);
                let base64Blob = await fetch(dataURL).then(r => r.blob());
                resolve(base64Blob);
            };
        });
        return result;
    } catch (err) {
        return null;
    }
}

async function checkArtistsFolder() {
    let coverFolder = path.join('artists', 'covers');
    let jsonFolder = path.join('artists', 'json');
    let coverExists = await fs.exists(coverFolder);
    let jsonExists = await fs.exists(jsonFolder);
    if (!coverExists) {
        await fs.mkdir(coverFolder);
    } else if (!jsonExists) {
        await fs.mkdir(jsonFolder);
    }
}