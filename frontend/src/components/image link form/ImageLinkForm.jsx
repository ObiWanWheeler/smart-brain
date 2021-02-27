import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <React.Fragment>
            <p className='f3 fw7'>
                {'Spot faces in your images. Give it a try!'}
            </p>
            <div className='center'>
                <div className='center image-form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type="text" placeholder="Enter image url..." onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pa3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>{'detect'}</button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ImageLinkForm;