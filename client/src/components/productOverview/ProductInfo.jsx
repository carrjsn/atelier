import React from 'react';
import Stars from '../stars/stars.jsx';
import FacebookSquare from './icons/Facebook.jsx';
import PinterestSquare from './icons/Pinterest.jsx';
import TwitterSquare from './icons/Twitter.jsx';

const ProductInfo = ({product, currentStyle, noOfReviews, avgRating}) => {

  // check for whether reviews exist

  let stars = <Stars size={18} rating={avgRating}/>
  let readReviews = <span className='read-reviews'><a href='#reviews'>Read all {noOfReviews} reviews</a></span>
  if (noOfReviews === 0) {
    stars = null;
    readReviews = null;
  } else if (noOfReviews === 1) {
    readReviews = <span className='read-reviews'><a href='#reviews'>Read {noOfReviews} review</a></span>
  }

  let overviewStars = noOfReviews ? <div><div className='overview-stars'>{stars}</div>{readReviews}</div> : null;

  let price;
  if (currentStyle.sale_price) {
    price = <div><span className='sale-price'>${currentStyle.sale_price}</span><span className='original-price'>${currentStyle.original_price}</span></div>
  } else {
    price = <div><span className='price'>${currentStyle.original_price}</span></div>
  }

  return (
    <div className='product-info'>
      {overviewStars}
      {/* {readReviews} */}
      <div className='product-category'>{product.category}</div>
      <div className='product-name'>{product.name}</div>
      {price}
      {/* <div className='product-slogan'>{product.slogan}</div>
      <div className='product-description'>{product.description}</div> */}
      {/* <img src={require('./images/facebook.svg')} className='social-media-icon'></img> */}
      {/* <img src='images/twitter.png' className='social-media-icon'></img>
      <img src='images/pinterest.png' className='social-media-icon'></img> */}
      <div>
        <FacebookSquare size={35}/>
        <TwitterSquare size={35}/>
        <PinterestSquare size={35}/>
      </div>
      {/* <FacebookSquare size={30}/>
      <TwitterSquare size={30}/>
      <PinterestSquare size={30}/> */}
    </div>
  )
};

export default ProductInfo;