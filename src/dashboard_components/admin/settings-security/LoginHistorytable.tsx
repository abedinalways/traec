import ReusableTableForAll from "@/dashboard_components/tables/ReusableTableForAll";



const loginHistory = [
  { id: 1, user: "admin@platform.com",   ip: "192.168.1.1", location: "New York, US", status: "Success" },
  { id: 2, user: "manager@platform.com", ip: "192.168.1.1", location: "New York, US", status: "Success" },
  { id: 3, user: "admin@platform.com",   ip: "192.168.1.1", location: "New York, US", status: "Success" },
  { id: 4, user: "admin@platform.com",   ip: "192.168.1.1", location: "New York, US", status: "Failed"  },
  { id: 5, user: "support@platform.com", ip: "192.168.1.1", location: "New York, US", status: "Success" },
];

const loginColumns = [
  { header: "User",       render: (r:any) => <span className="text-sm text-gray-700">{r.user}</span> },
  { header: "IP Address", render: (r:any) => <span className="text-sm text-gray-500">{r.ip}</span> },
  { header: "Location", render: (r:any) => <span className="text-sm text-gray-500">{r.location}</span> },
  {
    header: "Status",
    render: (r:any) => {
      const cls = r.status === "Success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500";
      return <span className={`inline-block rounded-md px-3 py-1 text-xs font-medium ${cls}`}>{r.status}</span>;
    },
  },
];

function LoginHistoryTable() {
  return (
    <section>
      <h2 className="text-[15px] font-bold text-[#030914] mb-4">Login History</h2>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
        <ReusableTableForAll
          columns={loginColumns}
          data={loginHistory}
          rowKey={(row) => row.id}
        />
      </div>
    </section>
  );
}

export default LoginHistoryTable;