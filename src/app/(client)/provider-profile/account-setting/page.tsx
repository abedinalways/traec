"use client";
import AccountSettingsForm from "../../_components/profile/AccountSettingForm";
import ProviderAccountSettingsForm from "../../_components/profile/ProviderAccountSettingForm";

export default function page() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <ProviderAccountSettingsForm
        backUrl="/provider-profile"
        title="Account Settings"
        onSavePassword={() => {}}
        onDeactivate={() => {
          console.log("Client deactivated");
        }}
        onDelete={() => {
          console.log("Client deleted");
        }}
      />
    </div>
  );
}
