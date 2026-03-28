import PolicyCheckbox from "./PolicyCheckbox";

const twoFAPolicies = [
  { label: "Require 2FA for all admin accounts", checked: true  },
  { label: "Require 2FA for seller accounts",    checked: false },
  { label: "Optional 2FA for customers",         checked: true  },
];

function TwoFactorCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm font-[inter]">
      <h3 className="text-[18px] font-bold text-[#030914] mb-4">Two-Factor Authentication</h3>
      <div className="rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 mb-4">
        <p className="text-[13px] font-semibold text-gray-600">2FA is enabled</p>
        <p className="text-[11px] text-gray-600 mt-0.5">
          All admin accounts are required to use two-factor authentication
        </p>
      </div>
      <div className="space-y-3">
        {twoFAPolicies.map((p, i) => (
          <PolicyCheckbox key={i} label={p.label} checked={p.checked} />
        ))}
      </div>
    </div>
  );
}

export default TwoFactorCard;