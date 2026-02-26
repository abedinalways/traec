import * as React from "react";
type ClockIconProps = React.SVGProps<SVGSVGElement>;
const ClockIcon = (props: ClockIconProps) => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.7998 20.8008C16.3227 20.8008 20.7998 16.3236 20.7998 10.8008C20.7998 5.27793 16.3227 0.800781 10.7998 0.800781C5.27696 0.800781 0.799805 5.27793 0.799805 10.8008C0.799805 16.3236 5.27696 20.8008 10.7998 20.8008Z"
      fill="white"
      stroke="#777980"
      strokeWidth={1.6}
    />
    <path d="M10.7959 6.80078V10.8008L12.7959 12.8008" fill="white" />
    <path
      d="M10.7959 6.80078V10.8008L12.7959 12.8008"
      stroke="#777980"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ClockIcon;
