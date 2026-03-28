import PolicyCheckbox from "./PolicyCheckbox";

const passwordPolicies = [
  { label: "Require minimum 8 characters",            checked: true  },
  { label: "Require uppercase and lowercase letters", checked: false },
  { label: "Require at least one number",             checked: true  },
  { label: "Require special character",               checked: true  },
  { label: "Password expiry after 90 days",           checked: true  },
];

function PasswordPolicyCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm font-[inter]">
      <h3 className="text-[18px] font-bold text-[#030914] mb-4">Password Policy</h3>
      <div className="space-y-3 text-[14px]">
        {passwordPolicies.map((p, i) => (
          <PolicyCheckbox key={i} label={p.label} checked={p.checked} />
        ))}
      </div>
    </div>
  );
}

export default PasswordPolicyCard;