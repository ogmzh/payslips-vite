import { render, screen } from "@testing-library/react";
import { endOfMonth, format, startOfMonth } from "date-fns";

import type { Payslip } from "@/lib/types";

import { PayslipCard } from "./payslip-card";

const renderComponent = (payslip: Payslip) =>
  render(<PayslipCard payslip={payslip} />);

describe("PayslipCard", () => {
  it("should render with dates", () => {
    const payslip: Payslip = {
      id: "1",
      file: "file1.pdf",
      fromDate: startOfMonth(new Date()),
      toDate: endOfMonth(new Date()),
    }

    renderComponent(payslip);

    const title = screen.getByText(format(payslip.fromDate, "MMMM yyyy"));
    expect(title).toBeVisible();
    const description = screen.getByText(`${payslip.fromDate.toLocaleDateString()} - ${payslip.toDate.toLocaleDateString()}`);
    expect(description).toBeVisible();
  });
});
