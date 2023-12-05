import * as React from 'react';
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke={props.stroke || '#7E7E86'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.667 7 8.25 13.417 5.333 10.5"
    />
  </svg>
);
export default CheckIcon;
