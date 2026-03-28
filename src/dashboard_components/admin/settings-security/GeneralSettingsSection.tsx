

import AdminRolesSection from "./AdminRolesSection";
import LoginHistoryTable from "./LoginHistorytable";
import PasswordPolicyCard from "./PasswordPolicyCard";
import TwoFactorCard from "./TwoFactorCard";

export default function SecuritySettingsPage() {
  return (
    <div className="min-h-screen font-[inter]  space-y-10">
      <AdminRolesSection />

      <div className="grid grid-cols-2 gap-4">
        <PasswordPolicyCard />
        <TwoFactorCard />
      </div>

      <LoginHistoryTable />
    </div>
  );
}