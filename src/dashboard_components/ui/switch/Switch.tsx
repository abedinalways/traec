// "use client";

// import React, { useEffect, useState } from "react";

// interface SwitchProps extends React.HTMLAttributes<HTMLButtonElement> {
//     checked?: boolean;
//     onCheckedChange?: (checked: boolean) => void;
// }

// const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, className, ...props }) => {
//     const [internalChecked, setInternalChecked] = useState<boolean>(!!checked);

//     // keep internal state in sync when `checked` prop is provided/changes
//     useEffect(() => {
//         if (typeof checked === "boolean") setInternalChecked(checked);
//     }, [checked]);

//     const isChecked = typeof checked === "boolean" ? checked : internalChecked;

//     const handleClick = () => {
//         const next = !isChecked;
//         // if uncontrolled, update internal state
//         if (typeof checked !== "boolean") setInternalChecked(next);
//         onCheckedChange?.(next);
//     };

//     return (
//         <button
//             type="button"
//             role="switch"
//             aria-checked={isChecked}
//             onClick={handleClick}
//             className={[
//                 "relative inline-flex items-center w-15 h-6 md:h-6 md:w-11 rounded-full transition-colors focus:outline-none",
//                 isChecked ? "bg-primary" : "bg-gray-300 dark:bg-gray-600",
//                 className || "",
//             ].join(" ")}
//             {...props}
//         >
//             <span
//                 className={[
//                     "inline-block md:h-5 h-4 w-4 md:w-5 transform rounded-full bg-white shadow transition-transform",
//                     isChecked ? "translate-x-5" : "translate-x-0",
//                 ].join(" ")}
//             />
//         </button>
//     );
// };

// export default Switch;
