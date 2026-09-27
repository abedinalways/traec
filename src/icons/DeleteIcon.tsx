import * as React from "react";
type DeleteIconProps = React.SVGProps<SVGSVGElement>;
const DeleteIcon = (props: DeleteIconProps) => (
  <svg
    width={14}
    height={15}
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.6001 2.93359L11.1869 9.61699C11.0814 11.3246 11.0286 12.1783 10.6006 12.7922C10.389 13.0957 10.1165 13.3518 9.80057 13.5443C9.16151 13.9336 8.30609 13.9336 6.59526 13.9336C4.88218 13.9336 4.02563 13.9336 3.38613 13.5435C3.06996 13.3507 2.79743 13.0941 2.58589 12.7902C2.15801 12.1753 2.1064 11.3203 2.00317 9.61036L1.6001 2.93359"
      stroke="#EB3D4D"
      strokeWidth={1.2}
      strokeLinecap="round"
    />
    <path
      d="M0.600098 2.93294H12.6001M9.30392 2.93294L8.8488 1.99409C8.54648 1.37045 8.39532 1.05862 8.13457 0.864147C8.07674 0.821009 8.01549 0.782638 7.95145 0.74941C7.66271 0.599609 7.31618 0.599609 6.62312 0.599609C5.91265 0.599609 5.55742 0.599609 5.26389 0.755689C5.19883 0.790281 5.13675 0.830207 5.07829 0.875055C4.81452 1.07741 4.66718 1.40064 4.3725 2.04711L3.96871 2.93294"
      stroke="#EB3D4D"
      strokeWidth={1.2}
      strokeLinecap="round"
    />
    <path
      d="M4.93359 10.2666L4.93359 6.2666"
      stroke="#EB3D4D"
      strokeWidth={1.2}
      strokeLinecap="round"
    />
    <path
      d="M8.2666 10.2666L8.2666 6.2666"
      stroke="#EB3D4D"
      strokeWidth={1.2}
      strokeLinecap="round"
    />
  </svg>
);
export default DeleteIcon;
