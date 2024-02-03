import { format } from "date-fns";
import { ChevronRight, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Payslip } from "@/lib/types";

type PayslipCardProps = {
  payslip: Payslip;
  onNavigateClick: () => void;
  onDownloadClick: () => void;
};

export const PayslipCard = ({
  payslip,
  onDownloadClick,
  onNavigateClick,
}: PayslipCardProps) => {
  const { fromDate, toDate, file } = payslip;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{format(fromDate, "MMMM yyyy")}</CardTitle>
        <CardDescription>
          {fromDate.toLocaleDateString()} - {toDate.toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="flex h-64 w-64 items-center justify-center overflow-hidden sm:h-80 sm:w-80 ">
          <img
            src={`${file}`}
            alt={`Payslip for ${fromDate.toLocaleDateString()}`}
            className="h-full w-full object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="flex gap-2" onClick={onDownloadClick}>
          <Download className="h-5 w-5" /> Download
        </Button>
        <Button
          className="flex gap-2"
          variant="secondary"
          onClick={onNavigateClick}>
          Details <ChevronRight className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
