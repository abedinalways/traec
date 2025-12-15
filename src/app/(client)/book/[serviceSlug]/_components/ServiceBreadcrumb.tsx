import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface ServiceBreadcrumbProps {
  step: number;
}

const ServiceBreadcrumb = ({ step }: ServiceBreadcrumbProps) => {
  console.log("service breadcrumb step from layout:", step);
  const showBackButton = step === 1;
  const showBreadcrumb = step >= 2;
  return (
    <div className="mb-8">
      {showBackButton && (
        <Link href={`/browse/details/1`}>
          {" "}
          <Button className="capitalize font-inter font-normal text-base leading-6 tracking-[0.01em] text-[#4a4c56] bg-transparent py-1.5 px-3.5 border border-[#dfe1e7] rounded-[12px] hover:bg-white cursor-pointer">
            <ChevronLeft />
            back to service
          </Button>
        </Link>
      )}

      {showBreadcrumb && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/"
                  className="font-inter font-normal capitalize text-base leading-6 tracking-[0.01em] text-[#777980]"
                >
                  service
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/docs/components"
                  className="font-inter font-normal capitalize text-base leading-6 tracking-[0.01em] text-[#777980]"
                >
                  service details
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-inter capitalize font-normal text-base leading-6 tracking-[0.01em] text-black">
                booking process
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  );
};

export default ServiceBreadcrumb;
