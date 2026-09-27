import SidebarIcon from "../icons/SidebarIcon";

function SidebarBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[10px] px-4 py-[10px] text-left flex items-center gap-2 cursor-pointer text-sm transition ${
        active ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
     <SidebarIcon/> {label}
    </button>
  );
}

export default SidebarBtn;
