import { ReactNode } from "react";
import ReusableTable from "./ReusableTable";
import { Trophy, ArrowDown, ArrowUp } from "lucide-react";

interface FinancialRow {
    id: number;
    userName: string;
    userAvatar?: string;
    type: "Prize Payout" | "Deposit" | "Entry Fee" | "Withdraw";
    amount: number;
    status: "Completed" | "Pending" | "Failed";
    transactionId: string;
    timestamp: string;
    time: string;
}

const tableHeader = ["No", "USER", "TYPE", "AMOUNT", "STATUS", "TRANSACTION ID", "TIMESTAMP"];

const rowRenderers: ((item: FinancialRow, index: number) => ReactNode)[] = [
    // No
    (_, index) => (
        <span className="text-gray-500 text-sm">
            {String(index + 1).padStart(2, "0")}
        </span>
    ),
    // User
    (item) => (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                <span className="text-xs text-gray-400 font-medium">
                    {item.userName.charAt(0).toUpperCase()}
                </span>
            </div>
            <span className="text-white text-sm font-medium">{item.userName}</span>
        </div>
    ),
    // Type
    (item) => {
        const getTypeIcon = () => {
            switch (item.type) {
                case "Prize Payout":
                    return <Trophy className="w-4 h-4 text-yellow-400" />;
                case "Deposit":
                    return <ArrowDown className="w-4 h-4 text-green-400" />;
                case "Entry Fee":
                case "Withdraw":
                    return <ArrowUp className="w-4 h-4 text-red-400" />;
                default:
                    return null;
            }
        };

        return (
            <div className="flex items-center gap-2">
                {getTypeIcon()}
                <span className="text-gray-300 text-sm">{item.type}</span>
            </div>
        );
    },
    // Amount
    (item) => {
        const isPositive = item.amount >= 0;
        const sign = isPositive ? "+" : "";
        return (
            <span
                className={`text-sm font-medium ${
                    isPositive ? "text-green-400" : "text-red-400"
                }`}
            >
                {sign}{item.amount.toFixed(2)}
            </span>
        );
    },
    // Status
    (item) => {
        const statusStyles = {
            Completed: "bg-green-500/20 border-green-500/30 text-white",
            Pending: "bg-yellow-500/20 border-yellow-500/30 text-white",
            Failed: "bg-red-500/20 border-red-500/30 text-white",
        };

        return (
            <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[item.status]}`}
            >
                {item.status}
            </span>
        );
    },
    // Transaction ID
    (item) => (
        <span className="text-gray-400 text-sm font-mono">
            {item.transactionId}
        </span>
    ),
    // Timestamp
    (item) => (
        <div className="text-sm text-gray-400">
            <div>{item.timestamp}</div>
            <div className="text-xs">{item.time}</div>
        </div>
    ),
];

const tableData: FinancialRow[] = [
    {
        id: 1,
        userName: "Wade Warren",
        type: "Prize Payout",
        amount: 125.0,
        status: "Completed",
        transactionId: "0x7f3a...9c2d",
        timestamp: "Dec 12, 2025",
        time: "12:30 PM",
    },
    {
        id: 2,
        userName: "Brooklyn Simmons",
        type: "Deposit",
        amount: 500.0,
        status: "Completed",
        transactionId: "0x8a4b...1d3e",
        timestamp: "Dec 12, 2025",
        time: "11:45 AM",
    },
    {
        id: 3,
        userName: "Robert Fox",
        type: "Entry Fee",
        amount: -200.0,
        status: "Completed",
        transactionId: "0x9c5d...2f4a",
        timestamp: "Dec 12, 2025",
        time: "10:20 AM",
    },
    {
        id: 4,
        userName: "Jane Cooper",
        type: "Prize Payout",
        amount: 75.5,
        status: "Pending",
        transactionId: "0x3e6f...7a8b",
        timestamp: "Dec 11, 2025",
        time: "09:15 PM",
    },
    {
        id: 5,
        userName: "Cameron Williamson",
        type: "Withdraw",
        amount: -300.0,
        status: "Pending",
        transactionId: "0x2d5c...9e1f",
        timestamp: "Dec 11, 2025",
        time: "08:30 AM",
    },
    {
        id: 6,
        userName: "Leslie Alexander",
        type: "Deposit",
        amount: 150.0,
        status: "Completed",
        transactionId: "0x1a4b...3c5d",
        timestamp: "Dec 10, 2025",
        time: "07:45 PM",
    },
    {
        id: 7,
        userName: "Guy Hawkins",
        type: "Entry Fee",
        amount: -20.0,
        status: "Failed",
        transactionId: "0x4e7f...8a9b",
        timestamp: "Dec 10, 2025",
        time: "06:20 PM",
    },
    {
        id: 8,
        userName: "Darlene Robertson",
        type: "Prize Payout",
        amount: 250.0,
        status: "Completed",
        transactionId: "0x5f8a...9b0c",
        timestamp: "Dec 9, 2025",
        time: "05:10 PM",
    },
    {
        id: 9,
        userName: "Floyd Miles",
        type: "Deposit",
        amount: 100.0,
        status: "Completed",
        transactionId: "0x6b9c...0d1e",
        timestamp: "Dec 9, 2025",
        time: "04:30 PM",
    },
    {
        id: 10,
        userName: "Jerome Bell",
        type: "Withdraw",
        amount: -450.0,
        status: "Pending",
        transactionId: "0x7c0d...1e2f",
        timestamp: "Dec 8, 2025",
        time: "03:45 PM",
    },
];

const FinancialTable = () => {
    return (
        <ReusableTable<FinancialRow>
            tableHeader={tableHeader}
            items={tableData}
            rowRenderers={rowRenderers}
            getRowKey={(row) => row.id}
            minTableWidthPx={1200}
            headerCellClassName="px-5 py-3 font-medium text-gray-400 text-start text-xs uppercase tracking-wide"
            bodyCellClassName="px-5 py-4 text-start"
        />
    );
};

export default FinancialTable;