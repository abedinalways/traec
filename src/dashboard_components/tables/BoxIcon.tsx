import * as React from "react";
type BoxIconProps = React.SVGProps<SVGSVGElement>;
const BoxIcon = (props: BoxIconProps) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.6668 4.08301L7.00016 6.41634L2.3335 4.08301"
      stroke="#63A6FF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.8643 2.7231L7.94766 1.37598C7.34434 1.09733 6.65566 1.09733 6.05234 1.37598L3.13568 2.7231C2.29305 3.11229 1.75 3.98067 1.75 4.93893V9.06173C1.75 10.02 2.29305 10.8884 3.13568 11.2776L6.05234 12.6247C6.65566 12.9033 7.34434 12.9033 7.94766 12.6247L10.8643 11.2775C11.707 10.8884 12.25 10.02 12.25 9.06173V4.93893C12.25 3.98067 11.707 3.11229 10.8643 2.7231Z"
      stroke="#63A6FF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 6.41699V12.8337"
      stroke="#63A6FF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default BoxIcon;
