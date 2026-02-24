"use client";

import { useState, Suspense } from "react";
import { SelectOption } from "../ui/input/searchInput/SelectField";
import UserManagementLayout from "./UserManagementLayout";

const UserManagementMainContainer = () => {
    const options: SelectOption[] = [
        { value: "active", label: "Active" },
        { value: "suspended", label: "Suspended" },
        { value: "disabled", label: "Disabled" },
    ];

    const [selected, setSelected] = useState("");
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserManagementLayout
                selectOptions={options}
                selectedValue={selected}
                onSelectChange={setSelected}
            />
        </Suspense>
    );
};

export default UserManagementMainContainer;