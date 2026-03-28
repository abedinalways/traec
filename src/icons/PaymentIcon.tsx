import * as React from "react";
import { SVGProps } from "react";
const PaymentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.66602 10C1.66602 6.92572 1.66602 5.38858 2.3442 4.29898C2.5951 3.89585 2.90677 3.54522 3.26511 3.26295C4.23365 2.5 5.59999 2.5 8.33268 2.5H11.666C14.3987 2.5 15.765 2.5 16.7336 3.26295C17.0919 3.54522 17.4036 3.89585 17.6545 4.29898C18.3327 5.38858 18.3327 6.92572 18.3327 10C18.3327 13.0742 18.3327 14.6114 17.6545 15.701C17.4036 16.1042 17.0919 16.4547 16.7336 16.7371C15.765 17.5 14.3987 17.5 11.666 17.5H8.33268C5.59999 17.5 4.23365 17.5 3.26511 16.7371C2.90677 16.4547 2.5951 16.1042 2.3442 15.701C1.66602 14.6114 1.66602 13.0742 1.66602 10Z"
      stroke="currentColor"
      strokeWidth={1.25}
    />
    <path
      d="M7.91602 2.5V17.5"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinejoin="round"
    />
    <path
      d="M4.16602 5.83398H4.99935M4.16602 8.33398H4.99935"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default PaymentIcon;
