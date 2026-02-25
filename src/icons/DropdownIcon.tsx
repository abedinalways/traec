import * as React from "react";
type DropdownIconProps = React.SVGProps<SVGSVGElement>;
const DropdownIcon = (props: DropdownIconProps) => (
  <svg
    width={9}
    height={5}
    viewBox="0 0 9 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.5 0.500031C8.5 0.500031 5.55404 4.49999 4.49997 4.5C3.44589 4.50001 0.5 0.5 0.5 0.5"
      stroke="#4A4C56"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default DropdownIcon;
