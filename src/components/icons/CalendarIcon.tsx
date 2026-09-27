import * as React from "react";
type CalendarIconProps = React.SVGProps<SVGSVGElement>;
const CalendarIcon = (props:CalendarIconProps) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.25 5.625C2.25 3.96815 3.59315 2.625 5.25 2.625H12.75C14.4069 2.625 15.75 3.96815 15.75 5.625V13.5C15.75 15.1569 14.4069 16.5 12.75 16.5H5.25C3.59315 16.5 2.25 15.1569 2.25 13.5V5.625Z"
      stroke="#4A4C56"
      strokeWidth={1.125}
    />
    <path
      d="M2.25 6.75H15.75"
      stroke="#4A4C56"
      strokeWidth={1.125}
      strokeLinecap="round"
    />
    <path
      d="M6 1.5L6 3.75"
      stroke="#4A4C56"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 1.5V3.75"
      stroke="#4A4C56"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx={9} cy={11.25} r={0.75} fill="#4A4C56" />
    <circle cx={12} cy={11.25} r={0.75} fill="#4A4C56" />
    <circle cx={6} cy={11.25} r={0.75} fill="#4A4C56" />
  </svg>
);
export default CalendarIcon;
