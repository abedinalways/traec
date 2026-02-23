import * as React from "react";
type LeftIconProps = React.SVGProps<SVGSVGElement>;
const LeftIcon = (props: LeftIconProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.99997 12C9.99997 12 6 9.05407 6 8C6 6.94587 10 4 10 4"
      stroke="#4A4C56"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default LeftIcon;
