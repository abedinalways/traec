"use client";

import { useMemo, useState } from "react";
import PasswordField from "../../ui/input/PassWordInput";


export default function ChangePasswordSection() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{ old?: string; next?: string; confirm?: string }>({});

    const canSave = useMemo(() => {
        return oldPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0 && newPassword === confirmPassword;
    }, [oldPassword, newPassword, confirmPassword]);

    const handleSave = () => {
        const nextErrors: typeof errors = {};

        if (!oldPassword) nextErrors.old = "Old password is required.";
        if (!newPassword) nextErrors.next = "New password is required.";
        if (newPassword && newPassword.length < 6) nextErrors.next = "Password must be at least 6 characters.";
        if (!confirmPassword) nextErrors.confirm = "Confirm password is required.";
        if (newPassword && confirmPassword && newPassword !== confirmPassword) nextErrors.confirm = "Passwords do not match.";

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) return;

        // 🔜 API call here
        // await updatePassword({ oldPassword, newPassword })
    };

    return (
        <section className="w-full rounded-[12px] border border-[#26344B] bg-[#18222A] p-6 sm:px-10 sm:pb-10">
            <div className="w-full flex items-start justify-between gap-4">
                <h2 className="text-base font-semibold text-white">Change Password</h2>

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={!canSave}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${canSave
                        ? "bg-[#2A2E46] text-white hover:opacity-90"
                        : "bg-white/5 text-white/30 cursor-not-allowed"
                        }`}
                >
                    Save Change
                </button>
            </div>

            <div className="mt-5 w-full flex flex-col gap-4">
                <PasswordField
                    label="Old Password"
                    required
                    value={oldPassword}
                    onChange={(v) => {
                        setOldPassword(v);
                        if (errors.old) setErrors((p) => ({ ...p, old: "" }));
                    }}
                    placeholder="Type old password here..."
                    error={errors.old}
                />

                <PasswordField
                    label="New Password"
                    required
                    value={newPassword}
                    onChange={(v) => {
                        setNewPassword(v);
                        if (errors.next) setErrors((p) => ({ ...p, next: "" }));
                    }}
                    placeholder="Type new password here..."
                    error={errors.next}
                />

                <PasswordField
                    label="Confirm New Password"
                    required
                    value={confirmPassword}
                    onChange={(v) => {
                        setConfirmPassword(v);
                        if (errors.confirm) setErrors((p) => ({ ...p, confirm: "" }));
                    }}
                    placeholder="Type new password here..."
                    error={errors.confirm}
                />
            </div>
        </section>
    );
}
