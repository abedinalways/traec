"use client";
import AccountSettingsForm from "../../_components/account-setting/AccountSettingForm";

export default function page() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <AccountSettingsForm
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
