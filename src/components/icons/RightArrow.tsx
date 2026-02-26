import * as React from "react";
type RightArrowProps = React.SVGProps<SVGSVGElement>;
const RightArrow = (props: RightArrowProps) => (
  <svg
    width={7}
    height={12}
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.562541 10.5625C0.562541 10.5625 5.5625 6.88008 5.5625 5.5625C5.5625 4.24483 0.5625 0.5625 0.5625 0.5625"
      stroke="white"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default RightArrow;
