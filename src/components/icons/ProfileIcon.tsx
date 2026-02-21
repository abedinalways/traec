import * as React from "react";
type ProfileIconProps = React.SVGProps<SVGSVGElement>;
const ProfileIcon = (props:ProfileIconProps) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.625 6C11.625 3.92894 9.94605 2.25 7.875 2.25C5.80394 2.25 4.125 3.92894 4.125 6C4.125 8.07105 5.80394 9.75 7.875 9.75C9.94605 9.75 11.625 8.07105 11.625 6Z"
      stroke="black"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.625 15C2.625 12.1005 4.97551 9.75 7.875 9.75C8.83125 9.75 9.7278 10.0057 10.5 10.4524"
      stroke="black"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.1415 11.2004L14.6746 10.7335C14.3632 10.4222 13.8585 10.4222 13.5472 10.7335L11.0356 13.2451C10.7017 13.5789 10.4742 14.0042 10.3816 14.4671L10.125 15.75L11.4079 15.4934C11.8708 15.4008 12.2961 15.1733 12.6299 14.8394L15.1415 12.3278C15.4528 12.0165 15.4528 11.5118 15.1415 11.2004Z"
      stroke="black"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ProfileIcon;
