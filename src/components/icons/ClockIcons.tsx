import * as React from "react";
type ClockIconsProps = React.SVGProps<SVGSVGElement>;
const ClockIcons = (props: ClockIconsProps) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.59998 16.5996C13.0183 16.5996 16.6 13.0179 16.6 8.59961C16.6 4.18133 13.0183 0.599609 8.59998 0.599609C4.1817 0.599609 0.599976 4.18133 0.599976 8.59961C0.599976 13.0179 4.1817 16.5996 8.59998 16.5996Z"
      stroke="#777980"
      strokeWidth={1.2}
    />
    <path
      d="M8.5968 5.39844V8.59844L10.1968 10.1984"
      stroke="#777980"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ClockIcons;
