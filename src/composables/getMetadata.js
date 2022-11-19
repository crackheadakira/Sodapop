import { fs, path } from '@empathize/framework';

export async function getMetadata() {
    try {
        let audioFiles = [];
        let musicDir = await window.Neutralino.os.showFolderDialog('Select your music folder');
        let timeStart = performance.now();
        let files = await recursiveListDir(musicDir);
        for (let i = 0, n = files.length; i < n; i++) {
            audioFiles.push(await Neutralino.custom.metadata(files[i].path, files[i].albumCover, (files[i]?.coverPath || '')));
            if (i % 20 === 0) {
                console.log(`${Math.floor(performance.now() - timeStart)}ms - ${i}/${n}`);
            }
        }
        console.log(`Metadata took ${Math.ceil(performance.now() - timeStart)}ms`);
        return audioFiles;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function recursiveListDir(dir) {
    let acceptedFormats = /mp3|flac/;
    try {
        let files = await fs.files(dir);
        let imageFiles = files.filter(file => file.type === 'file' && file.name.toLowerCase().endsWith('jpg' || '.png')).map(file => dir + '/' + file.name);
        let allFiles = files.filter(file => file.type === 'file' && acceptedFormats.test(file.name.toLowerCase())).map((file, index) => {
            let fileObject = { path: path.join(dir, file.name), albumCover: false };
            if (imageFiles.length > 0) fileObject.coverPath = imageFiles[index % imageFiles.length];
            if (index === 0 && imageFiles.length <= 0) fileObject.albumCover = true;
            return fileObject;
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