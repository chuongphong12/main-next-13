import * as React from 'react';
const RefreshIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#101014"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.5 10.222s-1.794-2.428-3.251-3.877A8.054 8.054 0 0 0 11.553 4C7.105 4 3.5 7.582 3.5 12s3.605 8 8.053 8a8.049 8.049 0 0 0 7.738-5.778m1.209-4V5.89m0 4.333h-4.368"
    />
  </svg>
);
export default RefreshIcon;
