import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ButtonProps {
    onConnect: () => void
}

export default function ConnectWalletButton({ onConnect }: ButtonProps) {
    return (
        <Button
            size="lg"
            onClick={onConnect}
            className={cn(
                "h-12 px-8 rounded-xl",
                "bg-[#5952FF] hover:bg-[#4F4EEA]",
                "text-white font-semibold text-base",
                "shadow-md hover:shadow-lg transition-all"
            )}
        >
            <Wallet className="size-5" />
            Connect Wallet
        </Button>
    )
}
