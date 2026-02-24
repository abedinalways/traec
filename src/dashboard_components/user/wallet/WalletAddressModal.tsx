"use client";

import { Modal } from "../../ui/modal";
import DepositContent from "./DepositContent";

interface WalletAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    walletAddress: string;
}

export default function WalletAddressModal({ isOpen, onClose, walletAddress }: WalletAddressModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-[584px] rounded-xl border border-[#26344B] bg-[#111B23] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 border-b border-white/10">
                <div className="flex flex-col">
                    <h3 className="text-sm sm:text-base font-semibold text-white">Deposit Address</h3>
                    <p className="text-xs text-white/50">Use this address to deposit TRX</p>
                </div>
            </div>

            {/* Body */}
            <div className="px-4 py-4 sm:px-6 sm:py-6">
                <DepositContent walletAddress={walletAddress} />
            </div>
        </Modal>
    );
}
