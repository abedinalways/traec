import { PencilIcon } from "@/icons";
import { ShieldCheckIcon } from "lucide-react";

interface admin{
  name: string;
  sub: string;
}

function AdminRolesCard({ name, sub }:admin) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl px-4 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-500">
          <ShieldCheckIcon/>
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#1D2433]">{name}</p>
          <p className="text-[11px] text-gray-400">{sub}</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600 transition-colors">
        <PencilIcon/>
      </button>
    </div>
  );
}
export default AdminRolesCard;