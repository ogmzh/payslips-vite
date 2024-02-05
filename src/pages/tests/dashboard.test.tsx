import { render, screen } from "@testing-library/react";
import { format } from "date-fns";
import { MemoryRouter } from "react-router-dom";

import * as payslipHooks from "@/data/queries";
import { Dashboard } from "../dashboard";

const renderComponent = () =>
  render(
    <MemoryRouter>
      <Dashboard setIsTop={() => {}} />
    </MemoryRouter>
  );

describe("Dashboard", () => {
  const usePayslipsSpy = vi.spyOn(payslipHooks, "usePayslips");

  it("should render with with spinners when loading", () => {
    usePayslipsSpy.mockReturnValue({
      data: [],
      isLoading: true,
      hasNext: false,
    });

    renderComponent();
    const title = screen.getAllByTestId("item-skeleton");
    expect(title).toHaveLength(6);
    title.forEach((t) => expect(t).toBeInTheDocument());
  });

  it("should not render any spinners when not loading", () => {
    usePayslipsSpy.mockReturnValue({
      data: [],
      isLoading: false,
      hasNext: false,
    });

    renderComponent();
    const title = screen.queryAllByTestId("item-skeleton");
    expect(title).toHaveLength(0);
    title.forEach((t) => expect(t).not.toBeInTheDocument());
  });

  it("should render all payslip cards", () => {
    usePayslipsSpy.mockReturnValue({
      data: [
        {
          id: "1",
          file: "file1.pdf",
          fromDate: new Date(),
          toDate: new Date(),
        },
        {
          id: "2",
          file: "file2.pdf",
          fromDate: new Date(),
          toDate: new Date(),
        },
        {
          id: "3",
          file: "file3.pdf",
          fromDate: new Date(),
          toDate: new Date(),
        },
      ],
      isLoading: false,
      hasNext: false,
    });

    renderComponent();
    const title = screen.getAllByText(format(new Date(), "MMMM yyyy"));
    expect(title).toHaveLength(3);
  });
});
