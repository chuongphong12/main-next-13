import * as React from 'react';
import { SVGProps } from 'react';
const CloseCircleSmIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke="#9F9EA4"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12.5 8.001-5 5m0-5 5 5m5.834-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0Z"
    />
  </svg>
);
export default CloseCircleSmIcon;
