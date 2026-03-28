import { ReactNode } from "react";
import ReusableTable from "./ReusableTableForAll";
import { Eye, Check, X } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import PendingWithdrawalDeleteModal from "../analytics/components/PendingWithdrawalDeleteModal";
import PendingWithdrawalEditModal from "../analytics/components/PendingWithdrawalEditModal";
import PendingWithdrawalViewModal from "../analytics/components/PendingWithdrawalViewModal";

interface PendingWithdrawalRow {
  id: number;
  userName: string;
  userId: string; // e.g. "8832"
  amount: string; // e.g. "220 USDT"
  wallet: string; // e.g. "0x7f3a...9c2d"
  date: string; // e.g. "Dec 12, 2025"
  time: string; // e.g. "12:30 PM"
}

const tableHeader = ["No", "User", "Amount", "Wallet", "Timestamp", "Action"];

const tableData: PendingWithdrawalRow[] = [
  {
    id: 1,
    userName: "Cryptoknight",
    userId: "8832",
    amount: "220 USDT",
    wallet: "0x7f3a...9c2d",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
  {
    id: 2,
    userName: "PlayerOne",
    userId: "8832",
    amount: "500 USDT",
    wallet: "0x7f3a...9c2d",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
  {
    id: 3,
    userName: "Player001",
    userId: "8832",
    amount: "140 USDT",
    wallet: "0x7f3a...9c2d",
    date: "Dec 12, 2025",
    time: "12:30 PM",
  },
];

const PendingWithdrawalTable = () => {
  const {
    isOpen: isViewModalOpen,
    openModal: openViewModal,
    closeModal: closeViewModal,
  } = useModal();
  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const rowRenderers: ((
    item: PendingWithdrawalRow,
    index: number,
  ) => ReactNode)[] = [
    // No
    (_, index) => (
      <span className="text-[#94a3b8] text-sm">
        {String(index + 1).padStart(2, "0")}
      </span>
    ),

    // User
    (item) => (
      <div className="min-w-0">
        <div className="text-white text-sm font-medium truncate">
          {item.userName}
        </div>
        <div className="text-[#94a3b8] text-xs">ID: #{item.userId}</div>
      </div>
    ),

    // Amount
    (item) => <span className="text-[#cbd5e1] text-sm">{item.amount}</span>,

    // Wallet (pill)
    (item) => (
      <span className="inline-flex max-w-full items-center rounded-md bg-[#1b2733] px-3 py-1 text-[#94a3b8] text-sm">
        <span className="truncate">{item.wallet}</span>
      </span>
    ),

    // Timestamp
    (item) => (
      <div className="text-sm text-[#cbd5e1]">
        <div>{item.date}</div>
        <div className="text-xs text-[#94a3b8]">{item.time}</div>
      </div>
    ),

    // Action
    () => (
      <div className="flex items-center gap-3">
        {/* View */}
        <button
          onClick={() => openViewModal()}
          type="button"
          className="
                    grid place-items-center
                    rounded-lg
                    bg-[#1b2733]
                    border border-[#26344b]
                    p-2
                    hover:bg-[#223142]
                    transition
                    "
          aria-label="View"
        >
          <Eye className="h-5 w-5 text-[#5b5cff]" />
        </button>

        {/* Approve */}
        <button
          onClick={() => openEditModal()}
          type="button"
          className="
                    grid place-items-center
                    rounded-lg
                    bg-[#1b2733]
                    border border-[#26344b]
                    p-2
                    hover:bg-[#223142]
                    transition
                    "
          aria-label="Approve"
        >
          <Check className="h-6 w-6 text-[#22c55e]" />
        </button>

        {/* Reject */}
        <button
          onClick={() => openDeleteModal()}
          type="button"
          className="
                grid place-items-center
                rounded-lg
                bg-[#1b2733]
                border border-[#26344b]
                p-2
                hover:bg-[#223142]
                transition
                "
          aria-label="Reject"
        >
          <X className="h-6 w-6 text-[#ef4444]" />
        </button>
      </div>
    ),
  ];
  return (
    <div
      className="
        w-full
        rounded-[12px]
        border border-[#26344b]
        bg-[#111b23]
        pt-1 pb-2
    "
    >
      {/* Top bar (Pending Withdrawals + View All) */}
      <div className="flex items-center justify-between gap-3 px-[16px] pt-[8px] pb-3 sm:px-5">
        <h3 className="text-[#cbd5e1] text-base sm:text-lg font-medium">
          Pending Withdrawals
        </h3>

        <button
          type="button"
          className="text-[#5b5cff] text-sm font-medium hover:opacity-80 transition"
        >
          View All
        </button>
      </div>

      {/* Table (responsive: horizontal scroll) */}
      <div className="w-full overflow-x-auto">
        {/* <ReusableTable<PendingWithdrawalRow>
          tableHeader={tableHeader}
          items={tableData}
          rowRenderers={rowRenderers}
          getRowKey={(row) => row.id}
          // responsive: only forces scroll when needed (no fixed width)
          minTableWidthPx={860}
          headerCellClassName="
                bg-[#0b151d]
                px-5 py-3
                font-medium
                text-[#94a3b8]
                text-start
                text-xs
                uppercase
                tracking-wide
                border-b border-[#26344b]
            "
          bodyCellClassName="
                px-5 py-4
                text-start
                border-b border-[#26344b]
            "
        /> */}
      </div>
      <PendingWithdrawalDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        status="Pending Review"
        userName="Cryptoknight"
        userId="#8832"
        isActive
        avatarSrc="/sidebar/profile_img.jpg"
        amount={220}
        currency="USDT"
        walletAddress="0x7f3a...9c2d"
        submittedAt="Oct 24, 2023 at 14:30"
        rejectAmount={500}
        rejectCurrency="TRX"
        onCancel={closeDeleteModal}
        onReject={() => console.log("reject request")}
      />

      <PendingWithdrawalEditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        status="Pending Review"
        userName="Cryptoknight"
        userId="#8832"
        isActive
        avatarSrc="/sidebar/profile_img.jpg"
        amount={220}
        currency="USDT"
        walletAddress="0x7f3a...9c2d"
        submittedAt="Oct 24, 2023 at 14:30"
        confirmAmount={500}
        confirmCurrency="TRX"
        onCancel={closeEditModal}
        onApprove={() => console.log("approve withdraw")}
      />

      <PendingWithdrawalViewModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        status="Pending Review"
        userName="Cryptoknight"
        userId="#8832"
        isActive
        avatarSrc="/sidebar/profile_img.jpg"
        amount={220}
        currency="USDT"
        walletAddress="0x7f3a...9c2d"
        submittedAt="Oct 24, 2023 at 14:30"
        onReject={() => console.log("reject", { id: 8832 })}
        onApprove={() => console.log("approve", { id: 8832 })}
      />
    </div>
  );
};

export default PendingWithdrawalTable;
