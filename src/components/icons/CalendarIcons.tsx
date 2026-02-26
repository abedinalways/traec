import { CalendarIcon } from "lucide-react";
type CalendarIconsProps = React.SVGProps<SVGSVGElement>;
import * as React from "react";
const CalendarIcons = (props: CalendarIconsProps) => (
  <svg
    width={19}
    height={19}
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.0179 1.51236L12.0147 4.51235ZM6.01794 1.50586L6.0147 4.50586Z"
      fill="#3D4566"
    />
    <path
      d="M12.0179 1.51236L12.0147 4.51235M6.01794 1.50586L6.0147 4.50586"
      stroke="#777980"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.76623 3.01007L8.26623 3.00845C5.4378 3.00539 4.0236 3.00386 3.14396 3.88158C2.26433 4.75931 2.2628 6.17352 2.25974 9.00195L2.25812 10.5019C2.25505 13.3303 2.25352 14.7446 3.13125 15.6242C4.00898 16.5038 5.42319 16.5054 8.25162 16.5084L9.75161 16.5101C12.58 16.5131 13.9943 16.5147 14.8739 15.6369C15.7535 14.7592 15.755 13.345 15.7581 10.5166L15.7597 9.01657C15.7628 6.18814 15.7643 4.77393 14.8866 3.8943C14.0089 3.01467 12.5946 3.01314 9.76623 3.01007Z"
      stroke="#777980"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.26135 7.50195L15.7613 7.51657"
      stroke="#777980"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.0048 10.5091L9.01155 10.5091M9.00155 13.5091L9.0083 13.5091M12.0014 10.5123L12.0082 10.5124M6.00818 10.5059L6.01491 10.5059M6.00493 13.5059L6.01166 13.5059"
      stroke="#777980"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default CalendarIcons;
