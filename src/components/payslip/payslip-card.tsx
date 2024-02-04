import { format } from "date-fns";
import { HTMLAttributes } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Payslip } from "@/lib/types";

interface PayslipCardProps extends HTMLAttributes<HTMLDivElement> {
  payslip: Payslip;
}

export const PayslipCard = ({ payslip, ...rest }: PayslipCardProps) => {
  const { fromDate, toDate, file } = payslip;

  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle>{format(fromDate, "MMMM yyyy")}</CardTitle>
        <CardDescription>
          {fromDate.toLocaleDateString()} - {toDate.toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="flex h-60 w-60 items-center justify-center overflow-hidden sm:h-80 sm:w-80 ">
          <img
            src={`${file}`}
            alt={`Payslip for ${fromDate.toLocaleDateString()}`}
            className="h-full w-full object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
};
