import React from "react";

const CartStar = ({size=20, color="#000000", handleToggleFavorite, fill='none'}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    onClick={handleToggleFavorite}
    className='star-box'
    width={size}
    height={size}
    viewBox="0 0 24 24"
    // fill="#FFDF00" yellow for when added
    fill={fill}
    stroke={color}
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export default CartStar;