import { useState, useEffect } from 'react';
import blankImage from './resources/generic.JPG';
import { compressImage } from './utilFunctions/imageConversion';
import { readableSize } from './utilFunctions/readableFileSize';
import './style/index.scss';
import Navbar from './components/Navbar';

function App() {

    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode'));

    const [image, setImage] = useState(undefined);
    let imageOptions = {
        height : undefined,
        size : undefined
    };

    let imageFile = undefined;
    useEffect(() => { }, [image, darkMode]);

    const getImageHandler = async (event) => {
        imageFile = event.target.files[0];
        setImage({ file: imageFile });
    }

    const convertHandler = async () => {

        if (!image)
            alert('Please choose an image');
        else {
            const imageFile = await compressImage(image, imageOptions);
            setImage(imageFile);
        }
    }

    const imageOptionsHandler = (event) => {
        const eventName = event.target.name;
        const eventValue = event.target.value;

        if( eventValue !== '' && isNaN(eventValue )) {
            alert('Please enter a valid number');
            return;
        }

        imageOptions[eventName] = eventValue;
    }
    const imageHeightInputElement = (image && !image.oldSize) ? (<>
                                                                    <label htmlFor='imageHeightInput'>Final height(px) :</label>
                                                                    <input name='height' className='imageHeightInput' onChange={imageOptionsHandler}></input>
                                                                    <label htmlFor='imageHeightInput'>Final size(MB) :</label>
                                                                    <input name='size' className='imageHeightInput' onChange={imageOptionsHandler}></input>
                                                                </>) : undefined;
    const chooseFileLabelElement = !(image) ? (<label htmlFor='chooseFileInput' className='chooseFileInputLabel'>
                                                    <i className="fa fa-cloud-upload"></i>Choose File
                                                </label>) : undefined;
    
    const sizeComparisonElement = (image && image.oldSize) ? (<div className='sizeComparison'>
                                                                <div className='sizeDescription'>Old Size :</div>
                                                                <div className='sizeValue'>{readableSize(image.oldSize)}</div>
                                                                <div className='sizeDescription'>New Size :</div>
                                                                <div className='sizeValue'>{readableSize(image.newSize)}</div>
                                                                <div className='sizeDescription'>{(imageOptions.height) ? 'Max Height/Width : '+imageOptions.height : undefined}</div>
                                                            </div>) : undefined;

    const convertDownloadButtonElement = (image && image.oldSize) ? (<a className='downloadButton' href={URL.createObjectURL(image.file)}>Download</a>) : (<button onClick={convertHandler}>Convert</button>);                                                        
    
    const theme = (darkMode === "true") ? "dark" : "light";

    return (
        <>
            {document.documentElement.setAttribute("data-theme", theme)}
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
            <h2>Upload your picture here</h2>
            <div className="container">

                <img src={(image) ? URL.createObjectURL(image.file) : blankImage} className='imageContainer' alt='Upload here'></img>
                
                {sizeComparisonElement}
                
                <div className='buttonDock'>
                    
                    {convertDownloadButtonElement}
                    {imageHeightInputElement}
                    {chooseFileLabelElement}
                </div>

                <input className='chooseFileInput' type='file' id='chooseFileInput' onChange={getImageHandler} />
            </div>
        </>
    );
}

export default App;
