import { format } from "date-fns";
import { Download } from "lucide-react";
import { useParams } from "react-router-dom";

import { AnimatedPage } from "@/components/animated/page";
import { NotFound } from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayslipById } from "@/data/queries";
import { handleDownload } from "@/lib/utils";

export const PayslipDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: payslip, isLoading } = usePayslipById(id);

  return (
    <AnimatedPage>
      {!payslip && !isLoading && <NotFound />}
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-4 w-[400px]" />
          <Skeleton className="h-[400px] w-[300px] sm:w-[600px]" />
          <div className="flex justify-between gap-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      )}

      {payslip && (
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-4xl font-bold">
            {format(payslip.fromDate, "MMMM yyyy")}
          </h1>
          <div className="flex h-64 w-64 items-center justify-center overflow-hidden sm:h-80 sm:w-80 ">
            <img
              src={`${payslip.file}`}
              alt={`Payslip for ${payslip.fromDate.toLocaleDateString()}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex justify-between px-10 text-xl">
            {payslip.fromDate.toLocaleDateString()} -{" "}
            {payslip.toDate.toLocaleDateString()}
          </div>
          <Button
            className="flex gap-2"
            onClick={() => handleDownload(payslip)}>
            <Download className="h-5 w-5" /> Download
          </Button>
        </div>
      )}
    </AnimatedPage>
  );
};
