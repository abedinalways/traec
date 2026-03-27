

import AdminRolesSection from "./AdminRolesSection";
import LoginHistoryTable from "./LoginHistorytable";
import PasswordPolicyCard from "./PasswordPolicyCard";
import TwoFactorCard from "./TwoFactorCard";

export default function SecuritySettingsPage() {
  return (
    <div className="min-h-screen  space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
      <AdminRolesSection />

      <div className="grid grid-cols-2 gap-4">
        <PasswordPolicyCard />
        <TwoFactorCard />
      </div>

      <LoginHistoryTable />
    </div>
  );
}