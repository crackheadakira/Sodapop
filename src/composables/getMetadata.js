import { fs, path } from '@empathize/framework';
import * as process from 'process/browser';
import { Buffer } from 'buffer';

window.process = process;
window.Buffer = Buffer;

// As of now, it seemed to take 0.32s-0.44s per file.
// Meaning, 100 files would take 32s and 1000 files would take 5.3 minutes.
export async function returnMetadata() {
    let audioFiles = [];
    window.Neutralino.os.showFolderDialog('Select your music folder').then(async (musicDir) => {
        console.time("Metadata");
        recursiveListDir(musicDir).then(async (files) => {
            for (let i = 0, n = files.length; i < n; i++) {
                audioFiles.push(await window.Neutralino.custom.metadata(files[i]));
            }
            console.timeEnd("Metadata");
            console.log(audioFiles);
            return audioFiles;
        }).catch((err) => console.error(err));
    }).catch((err) => console.error(err));
}


async function recursiveListDir(dir) {
    let acceptedFormats = /mp3|wav|ogg|flac|m4a|aac|ape/;
    try {
        let files = await fs.files(dir);
        let allFiles = files.filter(file => file.type === 'file' && acceptedFormats.test(file.name.toLowerCase())).map(file => path.join(dir, file.name));

        let imageFiles = files.filter(file => file.type === 'file' && file.name.toLowerCase().endsWith('jpg' || '.png')).map(file => {
            return {
                path: path.join(dir, file.name),
                dir: dir.split('/').pop()
            };
        });
        let directories = files.filter((file) => file.type === 'directory').map(folder => path.join(dir, folder.name));
        for (let i = 0, n = directories.length; i < n; i++) {
            allFiles = allFiles.concat(await recursiveListDir(directories[i]));
        }
        return allFiles;
    } catch (err) {
        console.error(err);
        return null;
    }
}