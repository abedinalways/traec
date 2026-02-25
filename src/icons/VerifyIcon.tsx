import * as React from "react";
type VerifyIconProps = React.SVGProps<SVGSVGElement>;
const VerifyIcon = (props: VerifyIconProps) => (
  <svg
    width={10}
    height={10}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM7.29601 3.73025C7.42316 3.56676 7.39371 3.33116 7.23023 3.20401C7.06675 3.07686 6.83115 3.10631 6.704 3.26979L4.7005 5.84572C4.65594 5.903 4.57214 5.91043 4.51821 5.86189L3.25086 4.72128C3.09692 4.58274 2.85982 4.59521 2.72127 4.74916C2.58272 4.9031 2.5952 5.14021 2.74914 5.27875L4.01648 6.41936C4.39405 6.75917 4.98065 6.70713 5.29251 6.30617L7.29601 3.73025Z"
      fill="#37C366"
    />
  </svg>
);
export default VerifyIcon;
