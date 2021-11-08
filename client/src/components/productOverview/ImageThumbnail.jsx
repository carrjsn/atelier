import React from 'react';

const ImageThumbnail = (props) => {

  let imageTile;
  if (props.thumbnail === props.currentImage.thumbnail_url) {
    imageTile =
      <img className='image-thumbnail current-image-selection' alt={'image' + props.photoNumber} onClick={props.updateMainImage} src={props.thumbnail} onError={(e) => e.target.src = props.url}></img>
  } else {
    imageTile =
      <img className='image-thumbnail non-current-image' onClick={props.updateMainImage} src={props.thumbnail} onError={(e) => e.target.src = props.url}></img>
  }

  return (
    <>
    {imageTile}
    </>
  )
}


export default ImageThumbnail;