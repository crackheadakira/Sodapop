import parseAudioMetadata from "parse-audio-metadata";
import { fs, path } from '@empathize/framework';
import * as process from 'process/browser';
import { Buffer } from 'buffer';
window.Buffer = Buffer;
window.process = process;

// As of now, it seemed to take 0.32s-0.44s per file.
// Meaning, 100 files would take 32s and 1000 files would take 5.3 minutes.
export async function returnMetadata() {
    /*let audioFiles = [];
    Neutralino.os.showFolderDialog('Select your music folder').then(async (musicDir) => {
        fs.files(musicDir).then(async (files) => {
            console.log(files);
            let parsable = [];
            for (let i = 0; i < files.length; i++) {
                let file = await fetch(path.join(musicDir, files[i].name));
                parsable.push(file);
            }
            console.time("Metadata");
            // const parsable = files.filter(f => f.type.includes('audio'));
            for (let i = 0, n = parsable.length; i < n; i++) {
                audioFiles.push(await parseAudioMetadata(parsable[i]));
            }
            console.timeEnd("Metadata");
            return console.log(audioFiles);
        }).catch((err) => console.error(err));
    }).catch((err) => console.error(err));*/
}
