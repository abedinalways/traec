import * as React from "react";
type EditIconProps = React.SVGProps<SVGSVGElement>;
const EditIcon = (props: EditIconProps) => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.64924 1.85658C9.14603 1.31833 9.39442 1.04921 9.65837 0.892227C10.2953 0.513449 11.0795 0.50167 11.727 0.861157C11.9954 1.01014 12.2514 1.27169 12.7635 1.79478C13.2755 2.31788 13.5316 2.57942 13.6774 2.85356C14.0293 3.51502 14.0178 4.31614 13.647 4.96674C13.4933 5.23638 13.2299 5.49013 12.703 5.99762L6.43385 12.0358C5.43535 12.9975 4.9361 13.4784 4.31214 13.7221C3.68818 13.9658 3.00223 13.9479 1.63034 13.912L1.44368 13.9071C1.02603 13.8962 0.817211 13.8907 0.695822 13.753C0.574433 13.6152 0.591005 13.4025 0.624151 12.9771L0.642148 12.746C0.735437 11.5486 0.782081 10.9499 1.0159 10.4118C1.24972 9.87357 1.65305 9.43659 2.45972 8.56261L8.64924 1.85658Z"
      stroke="#4A4C56"
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
    <path
      d="M7.93311 1.93359L12.5998 6.60026"
      stroke="#4A4C56"
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
    <path
      d="M8.6001 13.9336L13.9334 13.9336"
      stroke="#4A4C56"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default EditIcon;
