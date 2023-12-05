import * as React from 'react';
import { SVGProps } from 'react';
const CloseSmIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#F2F2F2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12 4-8 8m0-8 8 8"
    />
  </svg>
);
export default CloseSmIcon;
