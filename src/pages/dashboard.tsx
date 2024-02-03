import { UIEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AnimatedPage } from "@/components/animated/page";
import { PayslipCard } from "@/components/payslip/payslip-card";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayslips } from "@/data/queries";
import { OrderDirection } from "@/lib/types";
import { handleDownload } from "@/lib/utils";

type DashboardProps = {
  setIsTop: (isTop: boolean) => void;
};

export const Dashboard = ({ setIsTop }: DashboardProps) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>("desc");
  const {
    data: payslips,
    isLoading,
    hasNext,
  } = usePayslips(page, orderDirection);

  const handleScroll = (event: UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
    if ((event.target as HTMLDivElement).scrollTop < 100) {
      // radix types are a bit scuffed it would seem
      setIsTop(true);
    } else {
      setIsTop(false);
    }
  };

  const handleNavigateDetails = (id: string) => {
    navigate(`/payroll/${id}`);
  };

  return (
    <AnimatedPage forward>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mt-2 flex flex-col items-center gap-4 self-center pr-6 sm:flex-row sm:self-end">
          <Label htmlFor="sort-by-select">Sort By Date</Label>
          <Select
            value={orderDirection}
            onValueChange={(value: OrderDirection) => setOrderDirection(value)}>
            <SelectTrigger className="w-[180px]" id="sort-by-select">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ScrollArea
          className="h-[80vh] px-5 py-5"
          onScrollCapture={(e) => handleScroll(e)}>
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <div className="flex flex-col justify-between gap-4">
                    <Skeleton className="h-4 w-[240px]" />
                    <Skeleton className="h-2 w-[250px]" />
                  </div>
                  <Skeleton className="h-[420px] w-[350px] rounded-xl" />
                </div>
              ))}
            {payslips &&
              payslips.map((payslip) => (
                <PayslipCard
                  key={payslip.id}
                  payslip={payslip}
                  onNavigateClick={() => handleNavigateDetails(payslip.id)}
                  onDownloadClick={() =>
                    handleDownload(
                      payslips?.find((item) => payslip.id === item.id)
                    )
                  }
                />
              ))}
          </div>
        </ScrollArea>
        <Pagination>
          <PaginationContent>
            <PaginationItem
              className="cursor-pointer select-none"
              onClick={() => setPage(Math.max(page - 1, 0))}>
              <PaginationPrevious />
            </PaginationItem>
            {Array.from({ length: 3 }).map((_, i) => (
              <PaginationItem key={i} onClick={() => setPage(i)}>
                <PaginationLink isActive={i === page}>{i + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem className={hasNext ? "" : "hidden"}>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem onClick={() => hasNext && setPage(page + 1)}>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </AnimatedPage>
  );
};
