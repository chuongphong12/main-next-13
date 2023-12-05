import React from 'react';

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
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
        d="M11.994 5.916c-1.8-2.097-4.8-2.661-7.055-.74-2.254 1.92-2.572 5.13-.801 7.401 1.472 1.888 5.927 5.87 7.387 7.16.163.144.245.216.34.245a.456.456 0 0 0 .258 0c.095-.029.176-.101.34-.245 1.46-1.29 5.915-5.272 7.387-7.16 1.77-2.27 1.492-5.502-.802-7.402-2.293-1.9-5.255-1.356-7.054.741Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default HeartIcon;
