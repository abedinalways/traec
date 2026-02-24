"use client"
import HistoryCard from "../../card/HistoryCard";
import PageBreadcrumb from "../../common/PageBreadCrumb";
import { CupIocn, IPodIcon, NetIcon } from "@/src/icons";
import HistoryContainerTableSection from "./HistoryContainerTableSection";
import { Button } from "../../ui/button";
import { Download } from "lucide-react";

const HistoryMainContainer = () => {
    return (
        <div className="space-y-6 w-full">
            <div className="flex justify-between items-center gap-4">
                <div>
                    <PageBreadcrumb
                        pageTitle="Match History"
                        pageDescription="View your past game performance and earnings."
                        breadcrumbs={[
                            { label: "Dashboard", href: "/user/dashboard" },
                            { label: "Match History" },
                        ]}
                    />

                </div>

                <Button onClick={() => console.log('clicked')} variant="default">
                    <Download /> Export CSV
                </Button>
                
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[4fr_4fr_4fr] gap-4">
                <div>
                    <HistoryCard
                        title="Total Matches"
                        value="142"
                        change="+12%"
                        subtitle="From last month"
                        rightIcon={<IPodIcon/>}
                    />
                </div>
                <div>
                    <HistoryCard
                        title="Win Rate"
                        value="58%"
                        change="+12%"
                        subtitle="From last month"
                        rightIcon={<CupIocn />}
                    />
                </div>
                <div>
                    <HistoryCard
                        title="Net Profit"
                        value="1.05 TRX"
                        change="+12%"
                        subtitle="From last month"
                        rightIcon={<NetIcon />}
                    />
                </div>


            </div>
            <div>
                <HistoryContainerTableSection/>
            </div>
        </div>
    )
}
export default HistoryMainContainer;