import React from 'react';

const ChevronLeftSmIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      fill="none"
      {...props}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m5.5 9-3-3 3-3"
      />
    </svg>
  );
};

export default ChevronLeftSmIcon;
