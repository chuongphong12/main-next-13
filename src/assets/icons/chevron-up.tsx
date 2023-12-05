import * as React from 'react';
const ChevronUp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke={props.stroke || '#101014'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m18 15-6-6-6 6"
    />
  </svg>
);
export default ChevronUp;
