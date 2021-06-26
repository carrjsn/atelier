import React from 'react'
import CheckCircle from '../reviews/checkCircle.jsx';
// use checkCircle later for selected style

const StyleThumbnail = (props) => {

  let thumbnail;
  if (props.currentStyle.style_id === props.id) {
    thumbnail =
    <div className='style-thumbnail current-style-selection' onClick={props.updateStyle}>
      <img id={props.id} src={props.thumbnail}></img>
      <CheckCircle size={20}/>
    </div>
  } else {
    thumbnail =
    <div className='style-thumbnail non-current-style' onClick={props.updateStyle}>
      <img id={props.id} src={props.thumbnail}></img>
    </div>
  }

  return (
    <>
    {thumbnail}
    </>
  )
}


export default StyleThumbnail;