import React from 'react';

const Close = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <g clipPath="url(#alnes)">
        <path
          stroke={props.stroke || '#101014'}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 6 6 18M6 6l12 12"
        />
      </g>
      <defs>
        <clipPath id="alnes">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Close;
