import imageCompression from 'browser-image-compression';

const compressImage = async (originalObj, imageOptions)=> {
    const file = originalObj.file;
    let compressed = undefined;
    const options = {
        maxSizeMB : (imageOptions.size) ? imageOptions.size : 1,
        maxWidthOrHeight : (imageOptions.height) ? imageOptions.height : undefined,
        useWebWorker : true,
        maxIteration: 2000
        
    }
    try {
        compressed = await imageCompression(file, options);
        compressed.fileName = file.fileName;
    }catch(e) {
        throw new Error(e);
    }
    console.log(compressed);
    return {
        file : compressed,
        oldSize : file.size,
        newSize : compressed.size};
}

export {compressImage};