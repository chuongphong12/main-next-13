import * as React from 'react';
const ChevronRightSmIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke={props.stroke || '#7E7E86'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m3.5 9 3-3-3-3"
    />
  </svg>
);
export default ChevronRightSmIcon;
