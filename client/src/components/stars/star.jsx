import React from 'react';

const Star = ({ size, gradient, starNumber }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={`url(#${gradient})`}
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      data-starnumber={starNumber}
    >
      <svg width="0" height="0">
        <defs>
            <linearGradient id="zeroGradient">
              <stop offset={"0%"}  stopColor="gold" />
              <stop stopColor="white" />
            </linearGradient>
          </defs>
      </svg>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="quarterGradient">
            <stop offset={"25%"}  stopColor="gold" />
            <stop stopColor="white" />
          </linearGradient>
        </defs>
      </svg>

      <svg width="0" height="0">
        <defs>
            <linearGradient id="halfGradient">
              <stop offset={"50%"}  stopColor="gold" />
              <stop stopColor="white" />
            </linearGradient>
          </defs>
      </svg>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="threeQuarterGradient">
            <stop offset={"75%"}  stopColor="gold" />
            <stop stopColor="white" />
          </linearGradient>
        </defs>
      </svg>

      <svg width="0" height="0">
        <defs>
            <linearGradient id="fullGradient">
              <stop offset={"100%"}  stopColor="gold" />
              <stop stopColor="white" />
            </linearGradient>
          </defs>
      </svg>

      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-starnumber={starNumber}/>
    </svg>
  );
}

export default Star;