import * as React from "react";
type ArrowIconProps = React.SVGProps<SVGSVGElement>;
const RightIcon = (props:ArrowIconProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_7198_1617)">
      <path
        d="M15.4306 2.17191C15.197 1.93786 14.8179 1.93745 14.5842 2.17091L7.40324 9.33292L4.81237 6.51899C4.5885 6.27597 4.20999 6.26021 3.96658 6.48406C3.72335 6.70793 3.70778 7.08662 3.93165 7.32985L6.94452 10.6019C6.9991 10.6612 7.06511 10.7089 7.13859 10.7421C7.21208 10.7752 7.2915 10.7932 7.3721 10.7948C7.37647 10.795 7.38069 10.795 7.38488 10.795C7.54328 10.795 7.69522 10.7322 7.80747 10.6204L15.4294 3.01848C15.6636 2.78505 15.6641 2.40595 15.4306 2.17191Z"
        fill="url(#paint0_linear_7198_1617)"
      />
      <path
        d="M15.2838 7.34258C14.9531 7.34258 14.6852 7.61053 14.6852 7.94118C14.6852 11.66 11.66 14.6852 7.94118 14.6852C4.2226 14.6852 1.19716 11.66 1.19716 7.94118C1.19716 4.2226 4.2226 1.19716 7.94118 1.19716C8.27179 1.19716 8.53977 0.929211 8.53977 0.598597C8.53977 0.267953 8.27179 0 7.94118 0C3.56236 0 0 3.56236 0 7.94118C0 12.3198 3.56236 15.8824 7.94118 15.8824C12.3198 15.8824 15.8824 12.3198 15.8824 7.94118C15.8824 7.61056 15.6144 7.34258 15.2838 7.34258Z"
        fill="url(#paint1_linear_7198_1617)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_7198_1617"
        x1={3.77344}
        y1={6.39556}
        x2={15.6054}
        y2={6.39556}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFAC47" />
        <stop offset={1} stopColor="#FF2A24" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_7198_1617"
        x1={0}
        y1={7.94118}
        x2={15.8824}
        y2={7.94118}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFAC47" />
        <stop offset={1} stopColor="#FF2A24" />
      </linearGradient>
      <clipPath id="clip0_7198_1617">
        <rect width={15.8824} height={15.8824} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default RightIcon;
