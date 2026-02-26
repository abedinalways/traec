// "use client";

// import { useState, useRef } from "react";
// import { DateIcon, EmailIcon, ThreeDotsIcon } from "@/src/icons"
// import { Button } from "../ui/button"
// import ActivityTabs from "./ActivityTabs"
// import ProfileAvatar from "./ProfileAvatar"
// import { Dropdown } from "../ui/dropdown/Dropdown"
// import { DropdownItem } from "../ui/dropdown/DropdownItem"
// import SuspendUserModal from "./SuspendUserModal"
// import DisableUserModal from "./DisableUserModal"
// import { useModal } from "@/src/hooks/useModal"

// const UserDetails = () => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const dropdownToggleRef = useRef<HTMLButtonElement>(null);
//     const { isOpen: isSuspendModalOpen, openModal: openSuspendModal, closeModal: closeSuspendModal } = useModal();
//     const { isOpen: isDisableModalOpen, openModal: openDisableModal, closeModal: closeDisableModal } = useModal();

//     const handleSuspendClick = () => {
//         setIsDropdownOpen(false);
//         openSuspendModal();
//     };

//     const handleDisableClick = () => {
//         setIsDropdownOpen(false);
//         openDisableModal();
//     };

//     return (
//         <div className="w-full">
//             <div className="rounded-2xl  dark:border-white/10 dark:bg-[#111B23] bg-white p-4 space-y-4">
//                 {/* Header */}
//                 <div className="flex items-center justify-between">
//                     <h3 className="text-[1.25rem] font-medium text-[#C1C2C5]">User Details</h3>
//                 </div>
//                 <div className="flex items-center justify-between gap-3 ">
//                     <div className="flex space-x-2">
//                         <div className="h-12 w-12 rounded-full" >
//                             <ProfileAvatar
//                                 imageSrc="/sidebar/profile_img.jpg"
//                                 isOnline={true}
//                             />
//                         </div>
//                         <div>
//                             <p className="font-medium text-white">Cryptoknight</p>
//                             <p className="text-xs text-gray-400">ID: #8832</p>
//                         </div>

//                     </div>
//                     <div className="relative">
//                         <button
//                             ref={dropdownToggleRef}
//                             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                             className="dropdown-toggle w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                         >
//                             <ThreeDotsIcon />
//                         </button>
//                         <Dropdown
//                             isOpen={isDropdownOpen}
//                             onClose={() => setIsDropdownOpen(false)}
//                             className="min-w-[160px] dark:bg-[#5952FF] bg-[#5952FF] border-0 shadow-lg rounded-lg overflow-hidden"
//                         >
//                             <DropdownItem
//                                 onClick={handleSuspendClick}
//                                 baseClassName="block w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors"
//                             >
//                                 Suspend
//                             </DropdownItem>
//                             <div className="border-t border-white/10"></div>
//                             <DropdownItem
//                                 onClick={handleDisableClick}
//                                 baseClassName="block w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors"
//                             >
//                                 Disable
//                             </DropdownItem>
//                         </Dropdown>
//                     </div>
//                 </div>

//                 {/* Meta */}
//                 <div className="space-y-1 text-sm text-gray-400 flex justify-between items-center ">
//                     <div className="flex flex-col gap-3">
//                         <div className="flex space-x-3 items-center"> <span><EmailIcon /></span> <span>sameIfrank@gmail.com</span></div>
//                         <div className="flex space-x-2 items-center"> <span><DateIcon /> </span> <span>Joined Nov, 2025</span></div>
//                     </div>
//                     <div>
//                         <Button variant="active" size="pill">Active</Button>
//                     </div>
//                 </div>

//                 {/* Stats */}
//                 <div className=" bg-gray-200 dark:bg-[#0B151D] p-2 md:p-4 grid grid-cols-3 rounded-lg gap-2 text-center">
//                     <div>
//                         <p className="text-xs text-gray-400 dark:text-gray-300">Win Rate</p>
//                         <p className="text-gray-500 dark:text-white font-medium ">76.09%</p>
//                     </div>
//                     <div>
//                         <p className="text-xs text-gray-400 dark:text-gray-300">Spent</p>
//                         <p className="text-gray-500 dark:text-white font-medium ">1,232.34 TRX</p>
//                     </div>
//                     <div>
//                         <p className="text-xs text-gray-400 dark:text-gray-300">Withdraw</p>
//                         <p className="text-gray-500 dark:text-white font-medium ">8,232.34 TRX</p>
//                     </div>
//                 </div>
//                 <ActivityTabs />

//             </div>
//             <SuspendUserModal
//                 isOpen={isSuspendModalOpen}
//                 onClose={closeSuspendModal}
//                 userName="Cryptoknight"
//                 userId="#8832"
//                 userImage="/sidebar/profile_img.jpg"
//                 isActive={true}
//             />
//             <DisableUserModal
//                 isOpen={isDisableModalOpen}
//                 onClose={closeDisableModal}
//                 userName="Cryptoknight"
//                 userId="#8832"
//                 userImage="/sidebar/profile_img.jpg"
//                 isActive={true}
//             />
//         </div>
//     )
// }
// export default UserDetails