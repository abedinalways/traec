
"use client"
import { NetIcon } from "../../../icons";
import HistoryCard from "../../card/HistoryCard";
import PageBreadcrumb from "../../common/PageBreadCrumb";
import { Button } from "../../ui/button";
import { Wallet } from "lucide-react";
import WalletTableSection from "./WalletTableSection";
import WalletTabs from "./WalletTabs";

const WalletContainer = () => {
    return (
        <div className="space-y-6 w-full">
            <div className="flex justify-between items-center gap-6">
                <div>
                    <PageBreadcrumb
                        pageTitle="My Wallet"
                        pageDescription="Manage your crypto assets, deposits, and view transaction history."
                        breadcrumbs={[
                            { label: "Dashboard", href: "/user/dashboard" },
                            { label: "Wallet" },
                        ]}
                    />
                </div>
                <Button onClick={() => console.log('clicked')} variant="ghost">
                    <Wallet/> Withdraw
                </Button>
                

            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[4fr_4fr_4fr] gap-4">
                <div>
                    <HistoryCard
                        title="TOTAL BALANCE (USD)"
                        value="$1,240.50"
                        change="+12%"
                        subtitle="From last month"
                        rightIcon={<NetIcon />}
                    />
                </div>
                <div>
                    <HistoryCard
                        title="TOTAL DEPOSIT (USD)"
                        value="$20.50"
                        change="+12%"
                        subtitle="From last month"
                        rightIcon={<NetIcon />}
                    />
                </div>
                <div>
                    <HistoryCard
                        title="TOTAL WITHDRAW (USD)"
                        value="$240.50"
                        change="+12%"
                        subtitle="From last month"
                        rightIcon={<NetIcon />}
                    />
                </div>


            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-4 items-start">
                <div className="w-full min-w-0">
                    <WalletTableSection />
                </div>

                <div className="w-full min-w-0 lg:sticky lg:top-4">
                    <WalletTabs />
                </div>
            </div>



        </div>
    )
}
export default WalletContainer;