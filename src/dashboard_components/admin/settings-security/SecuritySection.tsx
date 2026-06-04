import GeneralInfoForm from "./GeneralInforForm";
import NotificationSettings from "./NotificationSettings";

export default function SecuritySection() {
  return (
    <div className="p-8 min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="mb-6">
        <h2 className="text-[16px] font-bold text-[#030914]">
          General Settings
        </h2>
      </div>

      {/* <GeneralInfoForm /> */}
      <NotificationSettings />

      <button className="bg-[#030914] text-white px-8 py-3 rounded-lg font-medium text-[15px] hover:bg-black transition-all cursor-pointer">
        Save Changes
      </button>
    </div>
  )
};