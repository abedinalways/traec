import * as React from "react";
import { SVGProps } from "react";
const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.99957 10L6 6M6.00043 10L10 6"
      stroke="#EB3D4D"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.6667 8.00033C14.6667 4.31843 11.6819 1.33366 8.00004 1.33366C4.31814 1.33366 1.33337 4.31843 1.33337 8.00033C1.33337 11.6822 4.31814 14.667 8.00004 14.667C11.6819 14.667 14.6667 11.6822 14.6667 8.00033Z"
      stroke="#EB3D4D"
      strokeWidth={1.2}
    />
  </svg>
);
export default CloseIcon;
