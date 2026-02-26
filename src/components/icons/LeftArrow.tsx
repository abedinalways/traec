import * as React from "react";
type LeftArrowProps = React.SVGProps<SVGSVGElement>;
const LeftArrow = (props:LeftArrowProps) => (
  <svg
    width={6}
    height={10}
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.56247 8.5625C4.56247 8.5625 0.5625 5.61657 0.5625 4.5625C0.5625 3.50837 4.5625 0.5625 4.5625 0.5625"
      stroke="#4A4C56"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default LeftArrow;
