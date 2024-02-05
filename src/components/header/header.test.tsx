import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { Header } from ".";

const renderComponent = (isTop: boolean) =>
  render(<Header isTop={isTop} />, { wrapper: BrowserRouter });

describe("Header", () => {
  it("should render with default props", () => {
    renderComponent(false);
    const title = screen.getByText("Payslips");
    expect(title).toBeVisible();
  });

  it("should not have border bottom", () => {
    renderComponent(false);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("border-b-2");
    expect(header).not.toHaveClass("border-transparent");
  });

  it("should have border bottom", () => {
    renderComponent(true);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("border-b-2");
    expect(header).toHaveClass("border-transparent");
  });
});
