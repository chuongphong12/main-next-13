import * as React from 'react';
const CheckRoundFilledIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect
      width={19}
      height={19}
      x={0.5}
      y={0.5}
      fill={props.background || '#2D68FE'}
      rx={9.5}
    />
    <path
      stroke={'#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.666 6.5 8.25 12.917 5.333 10"
    />
    <rect
      width={19}
      height={19}
      x={0.5}
      y={0.5}
      stroke={props.background || '#2D68FE'}
      rx={9.5}
    />
  </svg>
);
export default CheckRoundFilledIcon;
