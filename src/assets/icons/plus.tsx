import * as React from 'react';
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      strokeMiterlimit={10}
      d="M6.343 11.657h11.314M12 17.314V6"
    />
  </svg>
);
export default PlusIcon;
