import AdminRolesCard from "./AdminRolesCard";


const rolesData = [
  { id: 1, name: "Super Admin",    sub: "Permissions: 2 Users" },
  { id: 2, name: "Manager",        sub: "Permissions: 2 Users" },
  { id: 3, name: "Support Agent",  sub: "Permissions: 2 Users" },
  { id: 4, name: "Content Editor", sub: "Permissions: 2 Users" },
];

function AdminRolesSection() {
  return (
    <section className="mt-6">
      <h2 className="text-[18px] font-bold text-[#030914] mb-4">Admin Roles &amp; Permissions</h2>
      <div className="grid grid-cols-2 gap-3">
        {rolesData.map((r) => (
          <AdminRolesCard key={r.id} name={r.name} sub={r.sub} />
        ))}
      </div>
    </section>
  );
}
export default AdminRolesSection;