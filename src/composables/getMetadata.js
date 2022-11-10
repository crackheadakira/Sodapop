import * as musicMetadata from 'music-metadata-browser';
import { directoryOpen } from 'browser-fs-access';
import * as process from 'process/browser';
import { Buffer } from 'buffer';
window.Buffer = Buffer;
window.process = process;

export async function returnMetadata() {
    const folder = await directoryOpen({
        recursive: true,
    });
    let audioFiles = [];
    for (let i = 0; i < folder.length; i++) {
        const file = folder[i];
        if (file.type.startsWith("audio")) {
            audioFiles.push(await musicMetadata.parseBlob(file));
        }
    }
    return console.log(audioFiles);
}