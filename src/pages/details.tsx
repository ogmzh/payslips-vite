import { format } from "date-fns";
import { Check, Download, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { AnimatedPage } from "@/components/animated/page";
import { NotFound } from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayslipById } from "@/data/queries";
import { handleDownload } from "@/lib/utils";

export const PayslipDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isDownloading, setIsDownloading] = useState(false);

  const { data: payslip, isLoading } = usePayslipById(id);

  const handleDownloadClick = async () => {
    setIsDownloading(true);
    setTimeout( // simulate a real world download
      async () => {
        try {
          await handleDownload(payslip);
          toast("Payslip downloaded successfully.", {
            icon: <Check className="h-6 w-6" color="green" />,
          });
        } catch (error) {
          toast("Oops! Failed to download the payslip.", {
            icon: <X className="h-6 w-6" color="red" />,
          });
          console.error(error);
        } finally {
          setIsDownloading(false);
        }
      },
      Math.random() * 2000 + 500
    );
  };

  return (
    <AnimatedPage className="flex flex-col items-center overflow-auto py-5">
      {!payslip && !isLoading && <NotFound />}
      {isLoading && (
        <div className="flex flex-col items-center gap-4" data-testid="payslip-details-skeleton">
          <Skeleton className="h-4 w-[300px] sm:w-[400px]" />
          <Skeleton className="h-[450px] w-[250px] sm:w-[600px]" />
          <div className="flex flex-col justify-between gap-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      )}

      {payslip && (
        <div className="bg-muted flex max-w-xs flex-col items-center gap-2 rounded-lg p-10 sm:max-w-2xl sm:gap-10">
          <h1 className="text-4xl font-bold">
            {format(payslip.fromDate, "MMMM yyyy")}
          </h1>
          <div className="flex h-64 w-64 items-center justify-center overflow-hidden sm:h-96 sm:w-96 ">
            <img
              src={`${payslip.file}`}
              alt={`Payslip for ${payslip.fromDate.toLocaleDateString()}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 self-start">
            <div className="flex flex-col">
              <p className="text-muted-foreground text-sm">ID</p>
              <p className="text-lg font-bold">{payslip.id}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-muted-foreground text-sm">From Date</p>
              <p className="text-lg font-bold">
                {format(payslip.fromDate, "dd MMMM yyyy")}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-muted-foreground text-sm">To Date</p>
              <p className="text-lg font-bold">
                {format(payslip.toDate, "dd MMMM yyyy")}
              </p>
            </div>
          </div>
          <Button
            className="flex w-full gap-2"
            onClick={handleDownloadClick}
            disabled={isDownloading}>
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-5 w-5" />
            )}
            Download
          </Button>
        </div>
      )}
    </AnimatedPage>
  );
};
