import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { PayslipDetails } from "../details";
import * as payslipHooks from "@/data/queries";
import { MemoryRouter } from "react-router-dom";
import { format } from "date-fns";

const renderComponent = () => {
  render(
    <MemoryRouter>
      <PayslipDetails />
    </MemoryRouter>
  );
};

describe("PayslipDetails", () => {
  const usePayslipSpy = vi.spyOn(payslipHooks, "usePayslipById");

  it("should render loading skeleton when loading", () => {
    usePayslipSpy.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    renderComponent();
    const skeleton = screen.getByTestId("payslip-details-skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("should not render loading skeleton when not loading", () => {
    usePayslipSpy.mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    renderComponent();
    const skeleton = screen.queryByTestId("payslip-details-skeleton");
    expect(skeleton).not.toBeInTheDocument();
  });

  it("should render not found when payslip is not found", () => {
    usePayslipSpy.mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    renderComponent();
    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });

  it("should render data when loaded", () => {
    usePayslipSpy.mockReturnValue({
      data: {
        id: "1",
        file: "file1.pdf",
        fromDate: new Date(),
        toDate: new Date(),
      },
      isLoading: false,
    });

    renderComponent();
    const title = screen.getByText(format(new Date(), "MMMM yyyy"));
    expect(title).toBeInTheDocument();
  });

  it("should disable button when clicking download", async () => {
    usePayslipSpy.mockReturnValue({
      data: {
        id: "1",
        file: "file1.pdf",
        fromDate: new Date(),
        toDate: new Date(),
      },
      isLoading: false,
    });

    renderComponent();
    const button = screen.getByRole("button", { name: /download/i });
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    expect(button).toBeDisabled();
  });

});
