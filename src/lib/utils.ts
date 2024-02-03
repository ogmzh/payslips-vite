import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

import { Payslip } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleDownload = (payslip?: Payslip) => {
  if (!payslip) return;

  const { file, fromDate } = payslip;

  const link = document.createElement("a");
  link.href = `${file}`;
  link.download = format(fromDate, "MM-yyyy") + ".jpeg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
