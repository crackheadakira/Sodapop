import { fs, path } from '@empathize/framework';

export async function getMetadata() {
    try {
        let audioFiles = [];
        let musicDir = await Neutralino.os.showFolderDialog('Select your music folder');
        let timeStart = performance.now();
        let files = await recursiveListDir(musicDir);
        for (let i = 0, n = files.length; i < n; i++) {
            // TODO: Fetch metadata from songs first, then fetch album covers.
            audioFiles.push(await Neutralino.custom.metadata(files[i].path, files[i].albumCover, (files[i]?.coverPath || '')));
            if (i % 20 === 0) {
                console.log(`${Math.floor(performance.now() - timeStart)}ms - ${i}/${n}`);
            }
        }
        console.log(`Metadata took ${Math.ceil(performance.now() - timeStart)}ms`);
        return { audioFiles, musicDir };
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function recursiveListDir(dir, isDisc = false, coverDir = "") {
    let acceptedFormats = /mp3|flac/;
    try {
        let files = await fs.files(dir);
        let imageFiles = files.filter(file => file.type === 'file' && file.name.toLowerCase().endsWith('jpg' || 'png')).map(file => dir + '/' + file.name);

        let directories = files.filter((file) => file.type === 'directory').map((file) => file.name);

        if (imageFiles.length >= 1) coverDir = imageFiles;
        directories.map((folder => {
            if (folder && coverDir.length >= 1) {
                isDisc = true
            }
        }))
        directories = directories.map(folder => path.join(dir, folder));

        let allFiles = files.filter(file => file.type === 'file' && acceptedFormats.test(file.name.toLowerCase())).map((file, index) => {
            let fileObject = { path: path.join(dir, file.name), albumCover: false };
            if (coverDir.length >= 1) fileObject.coverPath = coverDir[index % coverDir.length];
            if (index === 0 && coverDir.length <= 0 && isDisc === false) fileObject.albumCover = true;
            return fileObject;
        });
        for (let i = 0, n = directories.length; i < n; i++) {
            allFiles = allFiles.concat(await recursiveListDir(directories[i], isDisc, coverDir));
        }
        return allFiles;
    } catch (err) {
        console.error(err);
        return null;
    }
}